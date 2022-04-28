import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";


@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) { }

    async canActivate(){
        const token = localStorage.getItem('token') ?? '';

        let res = await fetch('http://localhost:5000/api/auth/me', {
            headers: new Headers({
                'Authorization': 'Basic ' + token,
            })
        }).then(async res => {
            let data = await res.json();
            let _id = data.teacher.teacher._id;
            let response = await fetch('http://localhost:5000/api/teachers/' + _id);
            let teacher = await response.json();
            if(teacher.status == 'admin'){
                return true;
            }
            else{
                return false;
            }
        });

        if(!res){
            window.history.back();
        }

        return res;
    }
}

