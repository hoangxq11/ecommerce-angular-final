import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BillData } from 'src/app/commons/dto/order';
import { AssessmentService } from 'src/app/services/assessment.service';
import { OrderService } from 'src/app/services/order.service';
import { AssessmentModalComponent } from '../assessment-modal/assessment-modal.component';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  billId!: number;
  billData!: BillData;
  receiveDate!: Date;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private modalService: NgbModal,
    private assessmentService: AssessmentService,
    public toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    const currentUrl = this.router.url.split("/");
    const billId = currentUrl[currentUrl.length - 1];
    this.billId = Number(billId);
    this.getBillById();
  }

  getBillById() {
    this.orderService.getBillById(this.billId).subscribe(data => {
      this.billData = data.data;
      this.calculateReceiveDate();
    }, error => {
      this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau');
      console.log(error);
    })
  }

  calculateReceiveDate() {
    const paymentTime = new Date(this.billData.paymentTime);
    this.receiveDate = paymentTime;
    this.receiveDate.setDate(paymentTime.getDate() + this.billData.shippingService.time);
  }

  onAssessment(productBillId: number) {
    let status;
    this.assessmentService.checkExistAssessment(productBillId).subscribe(data => {
      status = data.data as boolean;
      console.log(data);
      if (status == true) this.toastrService.info('Bạn đã đánh giá sản phẩm này trước đó')
      else {
        const modalRef = this.modalService.open(AssessmentModalComponent, {
          backdrop: false,
          size: 'lg',
          windowClass: 'modal-custom-lg'
        });

        const productBill = this.billData.productBills.filter(e => e.id == productBillId)[0];
        modalRef.componentInstance.productBill = productBill;
      }
    }, error => {
      this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau')
    });
  }

  convertToSlug(text: string) {
    return text.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

}
