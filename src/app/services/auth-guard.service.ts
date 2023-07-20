import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public auth: AuthService, public router: Router) {}

    canActivate(): boolean {
        let check = false;
        this.auth.isAuth.subscribe(data => {
           check = data;
        });
        if (!check) {
            this.router.navigate(['auth/login']);
            return false;
        }
        return true;
    }
}
