import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressData } from 'src/app/commons/dto/address';
import { ListProductCartRes, ProductCartData } from 'src/app/commons/dto/cart';
import { AddressService } from 'src/app/services/address.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { BillReq } from '../../commons/dto/order';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  billReq: BillReq = new BillReq;

  listProductCartRes!: ListProductCartRes;
  listProductToPayment: ProductCartData[] = new Array;
  addressDefault!: AddressData;

  discount: number = 0;
  totalAmount: number = 0;
  shippingAmount: number = 20000;

  constructor(
    private router: Router,
    private cartService: CartService,
    private addressService: AddressService,
    private orderService: OrderService,
    public toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getProductInCart();
    this.getAddressDefault();
  }

  getProductInCart() {
    this.cartService.getProductInCart().subscribe(data => {
      this.listProductCartRes = data;
      this.calculateAmount();
    }, error => {
      console.log(error);
    })
  }

  getAddressDefault() {
    this.addressService.getDefaultAddress().subscribe(data => {
      this.addressDefault = data.data;
      console.log(data)
      console.log(this.addressDefault)
    }, error => {
      console.log(error);
    })
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

  defaultShipping() {
    this.shippingAmount = 20000;
    this.calculateAmount();
  }

  fastShipping() {
    this.shippingAmount = 40000;
    this.calculateAmount();
  }

  processOrder() {
    this.billReq.addressId = this.addressDefault.id;
    this.billReq.paymentMethod = 'POD';
    this.billReq.totalAmount = this.totalAmount;
    this.billReq.shippingServiceId = this.shippingAmount == 20000 ? 1 : 2;
    this.billReq.descriptionPay = 'None';

    this.orderService.createBill(this.billReq).subscribe(data => {
      console.log(data);
      this.toastrService.success('Đặt hàng thành công');
      this.router.navigate(['/order']);
    }, error => {
      this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau');
      console.log(error);
    })
  }

  linkToAddress() {
    this.router.navigate(['/shipping']);
  }
}
