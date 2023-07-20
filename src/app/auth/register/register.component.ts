import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    /**
     * error message, if exists
     * @type {string}
     */
    errorMessage = '';

    constructor(private authService: AuthService, private router: Router) {}

    /**
     * init
     */
    ngOnInit() { }

    /**
     * handle form
     * @param {NgForm} registerForm
     */
    onSubmit(registerForm: NgForm): void {
        console.log(registerForm);
        this.authService.register(registerForm.value).subscribe(data => {
            console.log(data);
        });
    }

}
