import { Injectable } from '@angular/core';
import axios from 'axios';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class AuthService {
    jwtHelper = new JwtHelperService();

    constructor() { }

    public async isAuthenticated(): Promise<boolean> {
        const token = localStorage.getItem('token');

        console.log(me());

        if (!token) {
            return false;
        }
        else {
            return !this.jwtHelper.isTokenExpired(token);
        }
    }
}

function me() {
    axios.get('http://localhost:5000/api/auth/me', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(response => {
        return response.data.success;
    }).catch(error => {
        console.log(error);
    });
    return false;
}