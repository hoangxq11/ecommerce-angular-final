import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProfileData } from 'src/app/commons/dto/profile';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AccountInfoComponent implements OnInit{

  profileData!: ProfileData;

  constructor(
    private profileService: ProfileService,
    public toastrService: ToastrService
  ){}

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile () {
    this.profileService.getProfile().subscribe(data => {
      this.profileData = data.data;
    }, error => {
      this.toastrService.error('Có lỗi xảy ra. Xin vui lòng thử lại');
    })
  }

}
