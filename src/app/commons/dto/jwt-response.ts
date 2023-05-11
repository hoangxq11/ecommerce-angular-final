import { BaseResponse } from "./response";

export class JwtResponse implements BaseResponse{
    message!: string;
    data!:JwtData;
}

export class JwtData{
    token!: string;
    type!: string;
    id!: string;
    username!: string;
    email!: string;
    roles!: string[];
}