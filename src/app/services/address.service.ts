import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressListRes, AddressReq, AddressRes, District, Province } from '../commons/dto/address';
import { AuthService } from './auth.service';
import { BaseResponse } from '../commons/dto/response';

@Injectable({
    providedIn: 'root'
})
export class AddressService {
    private baseURL = "http://localhost:8081/api/me/address";
    private provinceApi = 'https://provinces.open-api.vn/api/';
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    getDefaultAddress(): Observable<AddressRes> {
        return this.httpClient.get<AddressRes>(`${this.baseURL}/default`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

    getAddressById(addressId: number): Observable<AddressRes> {
        return this.httpClient.get<AddressRes>(`${this.baseURL}/${addressId}`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

    getAllAddress(): Observable<AddressListRes> {
        return this.httpClient.get<AddressListRes>(`${this.baseURL}`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

    createAddress(addressReq: AddressReq) {
        return this.httpClient.post<BaseResponse>(`${this.baseURL}`, addressReq, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

    updateAddress(addressId: number, addressReq: AddressReq) {
        return this.httpClient.put<BaseResponse>(`${this.baseURL}/${addressId}`, addressReq, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

    deleteAddress(addressId: number) {
        return this.httpClient.delete<BaseResponse>(`${this.baseURL}/${addressId}`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

    getAllProvince(): Observable<Province[]> {
        return this.httpClient.get<Province[]>(`${this.provinceApi}`);
    }

    getDistrictsOfProvince(provinceCode: number): Observable<Province> {
        return this.httpClient.get<Province>(`${this.provinceApi}p/${provinceCode}/?depth=2`);
    }

    getWardsOfDistrict(districtCode: number): Observable<District> {
        return this.httpClient.get<District>(`${this.provinceApi}d/${districtCode}/?depth=2`);
    }

}
