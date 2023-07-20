import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

    @Input() title: string;
    @Input() description: string;

    constructor() {
    }

    ngOnInit() {
        if (!this.title && !this.description) {
            this.title = 'Ошибка';
            this.description = 'Произошла ошибка';
        }
    }

}
