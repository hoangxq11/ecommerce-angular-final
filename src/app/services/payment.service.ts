import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from '../commons/dto/response';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private baseURL = "http://localhost:8081/api/payment";
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    createPayment(amount: number): Observable<any> {
        return this.httpClient.get<any>(`${this.baseURL}/create-payment/${amount}`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

}
