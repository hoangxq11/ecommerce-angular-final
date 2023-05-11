import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartReq } from 'src/app/commons/dto/cart';
import { ColorData, ListProductDetailRes, SizeData } from 'src/app/commons/dto/product';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { LoginComponent } from '../login/login.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productId!: number;
  listProductDetailRes: ListProductDetailRes = new ListProductDetailRes();
  sizes: SizeData[] = new Array();
  colors: ColorData[] = new Array();

  color !: ColorData;
  size !: SizeData;

  quantity: number = 1;

  constructor(
    private productService: ProductService,
    private router: Router,
    public authService: AuthService,
    private modalService: NgbModal,
    private cartService: CartService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const productId = this.router.url.split("-").at(-1)?.replace("p", "");
    this.productId = Number(productId);
    this.getDataProductDetailByProductId(Number(productId));
  }

  getDataProductDetailByProductId(productId: number) {
    this.productService.getDataProductDetailByProductId(productId).subscribe(data => {
      this.listProductDetailRes = data;
      console.log(this.listProductDetailRes)

      this.listProductDetailRes.data.forEach(e => {
        if (e.color != null)
          this.colors.push(e.color);
        if (e.size != null)
          this.sizes.push(e.size);
      });

      this.colors = [...new Map(this.colors.map(item => [item["name"], item])).values()];
      this.sizes = [...new Map(this.sizes.map(item => [item["name"], item])).values()];

      if (this.colors.length > 0)
        this.color = this.colors[0];

      if (this.sizes.length > 0)
        this.size = this.sizes[0];
    }, error => {
      console.log(error);
    });
  }

  addToCart() {
    var cartReq = new CartReq();
    cartReq.productId = this.productId;
    cartReq.quantity = this.quantity;
    if (this.color != undefined)
      cartReq.colorId = this.color.id;
    if (this.size != undefined)
      cartReq.sizeId = this.size.id;
      
    this.cartService.addToCart(cartReq).subscribe(data => {
      console.log(data);
    }, error => {
      this.toastr.error('Có lỗi xảy ra xin vui lòng thử lại sau')
      console.log(error);
    })
    
    this.toastr.success('Đã thêm vào giỏ hàng')
  }

  onChangeColor(colorId: number) {
    this.color = this.colors.find(e => e.id == colorId)!;
  }

  onChangeSize(sizeId: number) {
    this.size = this.sizes.find(e => e.id == sizeId)!;
  }

  decrementValue() {
    if (this.quantity > 1)
      this.quantity--;
  }

  incrementValue() {
    this.quantity++;
  }

  openLoginModal() {
    const modalRef = this.modalService.open(LoginComponent, {
      backdrop: false,
      size: 'lg'
    });
  }

  convertToSlug(text: string) {
    return text.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

}

