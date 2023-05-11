import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssessmentReq } from '../commons/dto/assessment';
import { BaseResponse } from '../commons/dto/response';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AssessmentService {
    private baseURL = "http://localhost:8081/api/assessment";
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    createAssessment(assessmentReq: AssessmentReq) {
        return this.httpClient.post<BaseResponse>(`${this.baseURL}`, assessmentReq, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

    checkExistAssessment(productBillId: number) {
        return this.httpClient.get<BaseResponse>(`${this.baseURL}/check-exist/${productBillId}`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

}
