import { BaseResponse } from "./response";

export class SearchSpecRes implements BaseResponse {
    message!: string;
    data!: SearchData[];
}

export class SearchData {
    id!: number;
    title!: string;
    numOfProduct!: number;
}