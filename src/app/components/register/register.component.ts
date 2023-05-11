import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountRegister } from 'src/app/commons/dto/account';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  accountRegister: AccountRegister = new AccountRegister();
  staticAlertClosed!: boolean;
  error!: string;

  constructor(
    public activeModal: NgbActiveModal,
    private authService: AuthService,
    private accountService: AccountService,
    private router: Router,
    public toastr: ToastrService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.staticAlertClosed = true;
    if (this.authService.isLoggedIn()) this.router.navigate([""]);
  }

  onSubmit() {
    this.accountRegister.authorities = ['ROLE_CUSTOMER']
    this.accountService.register(this.accountRegister).subscribe(data => {
      console.log(data);
      this.toastr.success('Đăng ký thành công');
      this.activeModal.close();
      const modalRef = this.modalService.open(LoginComponent, {
        backdrop: false,
        size: 'lg'
      });
    }, error => {
      console.log(error);
      this.toastr.error('Tên đăng nhập hoặc email đã tồn tại');
    })
  }

  validate() {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
    }
    form.classList.add('was-validated');
  }
}
