import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BillListRes, BillReq, BillRes } from '../commons/dto/order';
import { BaseResponse } from '../commons/dto/response';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private baseURL = "http://localhost:8081/api/sales/order";
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    createBill(billReq: BillReq): Observable<BaseResponse> {
        return this.httpClient.post<BaseResponse>(`${this.baseURL}`, billReq, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

    getBills(): Observable<BillListRes> {
        return this.httpClient.get<BillListRes>(`${this.baseURL}`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

    getBillById(billId: number): Observable<BillRes> {
        return this.httpClient.get<BillRes>(`${this.baseURL}/${billId}`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

}
