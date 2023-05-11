import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddressData, AddressReq, District, Province, Ward } from 'src/app/commons/dto/address';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-address-update',
  templateUrl: './address-update.component.html',
  styleUrls: ['./address-update.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AddressUpdateComponent implements OnInit {

  addressRes!: AddressData;
  addressId!: number;
  module: string = 'CREATE';

  provinces!: Province[];
  districts!: District[];
  wards!: Ward[];

  addressReq: AddressReq = {
    fullName: "",
    phoneNumber: "",
    province: "",
    district: "",
    ward: "",
    content: "",
    defaultAddress: false
  };

  constructor(
    private addressService: AddressService,
    private router: Router,
    public toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    const currentUrl = this.router.url;
    if (currentUrl != '/address/create') {
      this.module = "UPDATE";
      const urlSplit = currentUrl.split("/");
      this.addressId = Number(urlSplit[urlSplit.length - 1]);
      this.getAddressById();
    }
    this.getAllProvinces();
  }

  getAddressById() {
    this.addressService.getAddressById(this.addressId).subscribe(data => {
      this.addressRes = data.data;

      this.addressReq.fullName = this.addressRes.fullName;
      this.addressReq.phoneNumber = this.addressRes.phoneNumber;
      this.addressReq.province = this.addressRes.province;
      this.addressReq.district = this.addressRes.district;
      this.addressReq.ward = this.addressRes.ward;
      this.addressReq.content = this.addressRes.content;
      this.addressReq.defaultAddress = this.addressRes.defaultAddress;
    }, error => {
      this.toastrService.error('Có lỗi xảy ra. Vui lòng thử lại sau');
    })
  }

  getAllProvinces() {
    this.addressService.getAllProvince().subscribe(data => {
      this.provinces = data;
      if (this.module == 'UPDATE') {
        const province = this.provinces.filter(e => e.name == this.addressReq.province)[0];

        this.addressService.getDistrictsOfProvince(province.code).subscribe(data => {
          this.districts = data.districts;
          const district = this.districts.filter(e => e.name == this.addressReq.district)[0];
          this.addressService.getWardsOfDistrict(district.code).subscribe(data => {
            this.wards = data.wards;
          })
        })
      }
    })
  }

  onChangeProvince(event: EventTarget | null) {
    const input = event as HTMLInputElement;
    if (input.value == '') {
      this.addressReq.province = '';
      this.addressReq.district = '';
      this.addressReq.ward = '';
    }
    else {
      this.districts = [];
      this.wards = [];
      this.addressReq.province = this.provinces.filter(e => e.code == Number(input.value))[0].name;
      this.addressService.getDistrictsOfProvince(Number(input.value)).subscribe(data => {
        this.districts = data.districts;
      })
    }
  }

  onChangeDistrict(event: EventTarget | null) {
    const input = event as HTMLInputElement;
    if (input.value == '') {
      this.addressReq.district = '';
      this.addressReq.ward = '';
    }
    else {
      this.addressReq.district = this.districts.filter(e => e.code == Number(input.value))[0].name;
      this.addressService.getWardsOfDistrict(Number(input.value)).subscribe(data => {
        this.wards = data.wards;
      })
    }
  }

  onChangeWard(event: EventTarget | null) {
    const input = event as HTMLInputElement;
    this.addressReq.ward = input.value == '' ? '' : this.wards.filter(e => e.code == Number(input.value))[0].name;
  }

  checkToDefault(event: EventTarget | null) {
    const input = event as HTMLInputElement;
    if (input.checked) this.addressReq.defaultAddress = true;
    else this.addressReq.defaultAddress = false;
  }

  checkValidatedValue() {
    return this.addressReq.fullName != '' && this.addressReq.phoneNumber != ''
      && this.addressReq.province != '' && this.addressReq.district != ''
      && this.addressReq.ward != '' && this.addressReq.content;
  }

  saveAddress() {
    if (this.checkValidatedValue()) {
      this.addressService.createAddress(this.addressReq).subscribe(data => {
        console.log(data);
        this.router.navigate(['/address']);
        this.toastrService.success('Thêm địa chỉ thành công')
      }, error => {
        console.log(error);
        this.toastrService.error('Có lỗi xảy ra. Vui lòng thử lại sau')
      })
    }
    else this.toastrService.error('Hãy nhập đầy đủ thông tin');
  }

  updateAddress() {
    if (this.checkValidatedValue()) {
      this.addressService.updateAddress(this.addressId, this.addressReq).subscribe(data => {
        console.log(data);
        this.router.navigate(['/address']);
        this.toastrService.success('Cập nhật địa chỉ thành công')
      }, error => {
        console.log(error);
        this.toastrService.error('Có lỗi xảy ra. Vui lòng thử lại sau')
      })
    }
    else this.toastrService.error('Hãy nhập đầy đủ thông tin');
  }
}
