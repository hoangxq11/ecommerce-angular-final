import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AddressData, AddressReq, District, Province, Ward } from 'src/app/commons/dto/address';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss'],
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class ShippingComponent implements OnInit {

  addressListData!: AddressData[];
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
    this.getAllAddress();
    this.getAllProvinces();
  }

  getAllAddress() {
    this.addressService.getAllAddress().subscribe(data => {
      this.addressListData = data.data;
    }, error => {
      console.log(error)
    })
  }

  getAllProvinces() {
    this.addressService.getAllProvince().subscribe(data => {
      this.provinces = data;
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

  onChangeAddressDefault(addressId: number) {
    this.addressReq = this.addressListData.filter(e => e.id == addressId)[0];
    this.addressReq.defaultAddress = true;
    this.addressService.updateAddress(addressId, this.addressReq).subscribe(data => {
      console.log(data);
      this.toastrService.success('Cập nhật địa chỉ thành công', '', {
        timeOut: 1500
      });
      this.router.navigate(['/payment']);
    }, error => {
      console.log(error);
    })
  }

  checkValidatedValue() {
    return this.addressReq.fullName != '' && this.addressReq.phoneNumber != ''
      && this.addressReq.province != '' && this.addressReq.district != ''
      && this.addressReq.ward != '' && this.addressReq.content;
  }

  saveAddress() {
    if (this.checkValidatedValue()) {
      this.addressReq.defaultAddress = true;
      this.addressService.createAddress(this.addressReq).subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      })
      this.router.navigate(['/payment']);
    }
    else console.log("Not validate");
  }
}
