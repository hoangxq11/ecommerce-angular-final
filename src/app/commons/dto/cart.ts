import { ProductDetailData } from "./product";
import { BaseResponse } from "./response";

export class CartReq {
    productId!: number;
    colorId!: number;
    sizeId!: number;
    quantity!: number;
}

export class ListProductCartRes implements BaseResponse {
    message!: string;
    data!: ProductCartData[];
}

export class ProductCartData {
    productDetailDto!: ProductDetailData;
    quantity!: number;
    checked!: boolean;
}

export class ProductCartUpdateReq {
    productDetailId!: number;
    quantity!: number;
    checked!: boolean;
}

export class ProductCartRes implements BaseResponse{
    message!: string;
    data!: ProductCartData;
}