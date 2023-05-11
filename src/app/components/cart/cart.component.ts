import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ListProductCartRes, ProductCartData, ProductCartUpdateReq } from 'src/app/commons/dto/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CartComponent implements OnInit {

  listProductCartRes!: ListProductCartRes;
  listProductToPayment: ProductCartData[] = new Array;

  discount: number = 0;
  totalAmount: number = 0;

  constructor(
    private router: Router,
    private cartService: CartService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getProductInCart();
  }

  getProductInCart() {
    this.cartService.getProductInCart().subscribe(data => {
      this.listProductCartRes = data;
      this.calculateAmount();
    }, error => {
      console.log(error);
    })
  }

  decrementValue(productDetailId: number) {
    let productCartUpdateReq = new ProductCartUpdateReq();
    productCartUpdateReq.productDetailId = productDetailId;
    let currentQuantity: number | undefined = this.listProductCartRes.data
      .find(e => e.productDetailDto.id == productDetailId)?.quantity;
    if (currentQuantity != undefined)
      productCartUpdateReq.quantity = currentQuantity - 1;

    console.log(productCartUpdateReq)

    if (productCartUpdateReq.quantity >= 1) {
      this.cartService.updateProductCart(productCartUpdateReq).subscribe(data => {
        console.log(data);
        let index = this.listProductCartRes.data.findIndex(e => e.productDetailDto.id == productDetailId);
        this.listProductCartRes.data[index] = data.data;
        this.calculateAmount();
      }, error => {
        console.log(error);
      })
    } else this.onRemove(productDetailId);
  }

  incrementValue(productDetailId: number) {
    let productCartUpdateReq = new ProductCartUpdateReq();
    productCartUpdateReq.productDetailId = productDetailId;
    let currentQuantity: number | undefined = this.listProductCartRes.data
      .find(e => e.productDetailDto.id == productDetailId)?.quantity;
    if (currentQuantity != undefined)
      productCartUpdateReq.quantity = currentQuantity + 1;

    console.log(productCartUpdateReq)

    this.cartService.updateProductCart(productCartUpdateReq).subscribe(data => {
      console.log(data);
      let index = this.listProductCartRes.data.findIndex(e => e.productDetailDto.id == productDetailId);
      this.listProductCartRes.data[index] = data.data;
      this.calculateAmount();
    }, error => {
      console.log(error);
    })
  }

  public trackItem(index: number, item: ProductCartData) {
    return item;
  }

  public addToPayment(event: EventTarget | null) {
    const input = event as HTMLInputElement;
    const productDetailId = Number(input.id);
    const index = this.listProductCartRes.data.findIndex(e => e.productDetailDto.id === Number(input.id));
    // this.listProductToPayment.push(this.listProductCartRes.data[index]);
    const dataReq = this.listProductCartRes.data[index];

    if (input.checked) {

      let req: ProductCartUpdateReq = {
        productDetailId: dataReq.productDetailDto.id,
        quantity: dataReq.quantity,
        checked: true
      }
      this.listProductCartRes.data[index].checked = true;

      this.cartService.updateProductCart(req).subscribe(data => {

      }, error => {
        console.log(error)
      });
    } else {
      let req: ProductCartUpdateReq = {
        productDetailId: dataReq.productDetailDto.id,
        quantity: dataReq.quantity,
        checked: false
      }
      this.listProductCartRes.data[index].checked = false;

      this.cartService.updateProductCart(req).subscribe(data => {

      }, error => {
        console.log(error)
      });
    }
    this.calculateAmount();

    // if (input.checked) {
    //   const index = this.listProductCartRes.data.findIndex(e => e.productDetailDto.id === Number(input.id));
    //   this.listProductToPayment.push(this.listProductCartRes.data[index]);
    // } else {
    //   const index = this.listProductToPayment.findIndex(e => e.productDetailDto.id === Number(input.id));
    //   if (index >= 0 && index < this.listProductToPayment.length) {
    //     this.listProductToPayment = this.listProductToPayment.filter(e => e.productDetailDto.id != Number(input.id));
    //   }
    // }
    // this.calculateAmount();
  }

  calculateAmount() {
    this.discount = 0;
    this.totalAmount = 0;
    this.listProductToPayment = this.listProductCartRes.data.filter(e => e.checked == true);
    this.listProductToPayment.forEach(e => {
      this.discount += e.productDetailDto.discount.value * e.quantity;
      this.totalAmount += e.productDetailDto.price * e.quantity;
    })
  }

  onRemove(productDetailId: number) {
    if (confirm('Bạn muốn xóa sản phẩm này khỏi giỏ hàng ?')){
      this.cartService.removeProductCart(productDetailId).subscribe(data => {
        this.toastr.success('Xóa thành công');
        this.getProductInCart();
      }, error => {
        this.toastr.error('Có lõi xảy ra, vui lòng thử lại sau');
        console.log(error);
      })
    }
  } 

  convertToSlug(text: string) {
    return text.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }
}
