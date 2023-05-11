import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AccountLogin } from 'src/app/commons/account-login';
import { JwtResponse } from 'src/app/commons/dto/jwt-response';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  accountLogin: AccountLogin = new AccountLogin();
  jwtResponse: JwtResponse = new JwtResponse();
  staticAlertClosed!: boolean;
  error!: string;

  constructor(
    public activeModal: NgbActiveModal,
    private authService: AuthService,
    private accountService: AccountService,
    private router: Router,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.staticAlertClosed = true;
    if (this.authService.isLoggedIn()) this.router.navigate([""]);
  }

  async authentication() {
    this.accountService.authentication(this.accountLogin).subscribe(
      (data) => {
        console.log(data)
        this.jwtResponse = data;
        sessionStorage.setItem("jwtToken", JSON.stringify(this.jwtResponse.data));
        this.activeModal.close();
        this.toastr.success('Đăng nhập thành công', '', {
          timeOut: 3000,
        });
        location.reload();
      },
      (error) => {
        this.toastr.error('Tên đăng nhập hoặc mật khẩu không chính xác', '', {
          timeOut: 3000,
        });
        this.error = error.error.message;
        this.staticAlertClosed = false;
        console.log(this.error);
      }
    );
  }

  onSubmit() {
    this.authentication();
  }

  validate() {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
    }
    form.classList.add('was-validated');
  }
}