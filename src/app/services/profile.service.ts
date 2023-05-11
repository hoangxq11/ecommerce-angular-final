import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BillListRes, BillReq, BillRes } from '../commons/dto/order';
import { BaseResponse } from '../commons/dto/response';
import { AuthService } from './auth.service';
import { ProfileRes } from '../commons/dto/profile';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private baseURL = "http://localhost:8081/api/me/profile";
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    getProfile(): Observable<ProfileRes> {
        return this.httpClient.get<ProfileRes>(`${this.baseURL}/customer-profile`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

}
