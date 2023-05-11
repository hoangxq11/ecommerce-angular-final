import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AssessmentReq } from 'src/app/commons/dto/assessment';
import { ProductBillData } from 'src/app/commons/dto/order';
import { AssessmentService } from 'src/app/services/assessment.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-assessment-modal',
  templateUrl: './assessment-modal.component.html',
  styleUrls: ['./assessment-modal.component.scss']
})
export class AssessmentModalComponent implements OnInit {

  @Input() productBill: ProductBillData = new ProductBillData();

  assessmentReq: AssessmentReq = new AssessmentReq();

  currentRate: number = 5;
  ratingStrList: string[] = ['Tệ', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Tuyệt vời'];
  ratingStr = this.ratingStrList[4];

  constructor(
    public activeModal: NgbActiveModal,
    private authService: AuthService,
    private router: Router,
    private assessmentService: AssessmentService,
    public toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.assessmentReq.imageIds = [];
    console.log(this.productBill);
  }

  ratingChange() {
    this.ratingStr = this.ratingStrList[this.currentRate - 1]
  }

  onAssessment() {
    this.assessmentReq.star = this.currentRate;
    this.assessmentReq.productBillId = this.productBill.id;
    this.assessmentService.createAssessment(this.assessmentReq).subscribe(data => {
      this.toastrService.success('Cảm ơn bạn vì đã đóng ghóp ý kiến');
      this.activeModal.close();
    }, error => {
      this.toastrService.error('Có lỗi xảy ra vui lòng thử lại sau');
    })
  }

  convertToSlug(text: string) {
    return text.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }
}
