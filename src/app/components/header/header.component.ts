import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryListRes } from 'src/app/commons/dto/category';
import { CategoryService } from 'src/app/services/category.service';
import { AuthService } from 'src/app/services/auth.service';
import { SearchReq } from 'src/app/commons/dto/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  categoryRes!: CategoryListRes;
  searchReq: SearchReq = {
    keyWord: ''
  };

  constructor(
    public authService: AuthService,
    private modalService: NgbModal,
    private categoryService: CategoryService,
    private productService: ProductService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getDataCategory();
    this.searchReq.keyWord = '';
  }

  getDataCategory() {
    this.categoryService.getDataCategory().subscribe(data => {
      this.categoryRes = data;
      console.log(this.categoryRes.data)
    }, error => {
      console.log(error);
    });
  }

  openLoginModal() {
    const modalRef = this.modalService.open(LoginComponent, {
      backdrop: false,
      size: 'lg'
    });
  }

  openRegisterModal() {
    const modalRef = this.modalService.open(RegisterComponent, {
      backdrop: false,
      size: 'lg'
    });
  }

  onLogout() {
    sessionStorage.removeItem("jwtToken");
    this.router.navigate(['/']);
  }

  convertToSlug(text: string) {
    return text.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }
}
