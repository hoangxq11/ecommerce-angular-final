import { CartReq, ListProductCartRes, ProductCartRes, ProductCartUpdateReq } from '../commons/dto/cart';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from '../commons/dto/response';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private baseURL = "http://localhost:8081/api/me/cart";
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    addToCart(cartReq: CartReq): Observable<BaseResponse> {
        return this.httpClient.post<BaseResponse>(`${this.baseURL}`, cartReq, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

    getProductInCart(): Observable<ListProductCartRes> {
        return this.httpClient.get<ListProductCartRes>(`${this.baseURL}`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

    updateProductCart(productCartUpdateReq: ProductCartUpdateReq): Observable<ProductCartRes> {
        return this.httpClient.put<ProductCartRes>(`${this.baseURL}`, productCartUpdateReq, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

    updateCheckToPayment(productDetailId: number): Observable<ProductCartRes> {
        return this.httpClient.post<ProductCartRes>(`${this.baseURL}/check-to-payment/${productDetailId}`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

    removeProductCart(productDetailId: number): Observable<BaseResponse> {
        return this.httpClient.delete<BaseResponse>(`${this.baseURL}/${productDetailId}`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

}
