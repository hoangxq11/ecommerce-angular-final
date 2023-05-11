import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddressData, Province, District, Ward, AddressReq } from 'src/app/commons/dto/address';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit{
  
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
  }

  getAllAddress() {
    this.addressService.getAllAddress().subscribe(data => {
      this.addressListData = data.data;
    }, error => {
      console.log(error)
    })
  }

  onDeleteAddress(addressId: number) {
    if (confirm('Bạn có thực sự muốn xóa ?')){
      this.addressService.deleteAddress(addressId).subscribe(data => {
        this.toastrService.success('Địa chỉ đã được xóa')
        this.getAllAddress();
      }, error => {
        this.toastrService.error('Có lỗi xảy ra. Vui lòng thử lại sau');
      })
    }
  }
}
