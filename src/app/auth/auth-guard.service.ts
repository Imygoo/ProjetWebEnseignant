import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public auth: AuthService, public router: Router) { }
    canActivate(): boolean {
        let success = this.auth.isAuthenticated();
        if (!success) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}