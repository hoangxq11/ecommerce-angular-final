import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { BillData } from 'src/app/commons/dto/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  billListData!: BillData[];
  billListDataFilter!: BillData[];

  orderStatus: string = 'ALL'

  constructor(
    private orderService: OrderService,
    public toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getBills();
  }

  getBills() {
    this.orderService.getBills().subscribe(data => {
      this.billListData = data.data;
      this.billListDataFilter = data.data;
      console.log(this.billListData)
    }, error => {
      console.log(error);
      this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau');
    })
  }

  allOrder() {
    this.orderStatus = 'ALL';
    this.billListDataFilter = this.billListData;
  }

  pendingOrder(){
    this.orderStatus = 'PENDING';
    this.billListDataFilter = this.billListData.filter(e => e.status == 'PENDING')
  }

  shippingOrder(){
    this.orderStatus = 'SHIPPING';
    this.billListDataFilter = this.billListData.filter(e => e.status == 'SHIPPING')
  }

  canceledOrder(){
    this.orderStatus = 'CANCELED';
    this.billListDataFilter = this.billListData.filter(e => e.status == 'CANCELED')
  }

  doneOrder(){
    this.orderStatus = 'DONE';
    this.billListDataFilter = this.billListData.filter(e => e.status == 'DONE')
  }

}
