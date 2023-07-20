import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    @Input() cssClass: string;
    isAuth = false;

    constructor(private authService: AuthService) {
        console.log('menu');
    }

    ngOnInit() {
        this.authService.isAuth.subscribe(data => {
            console.log(data);
            this.isAuth = data;
        });
    }

}
