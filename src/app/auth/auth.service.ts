import { Injectable } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
import axios from "axios";

@Injectable()
export class AuthService {

    jwtHelper = new JwtHelperService();

    constructor() { }

    isAuth(){
        const token = localStorage.getItem('token') ?? '';
        return !this.jwtHelper.isTokenExpired(token);
    }
}