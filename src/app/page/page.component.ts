import {Component, OnInit} from '@angular/core';
import {MainService} from '../services/main.service';
import {ActivatedRoute} from '@angular/router';
import {Page} from '../classes/page';
import {PageInterface} from '../interfeces/page-interface';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

    page: PageInterface = new Page();
    isError = false;
    errorMessage = 'Произошла ошибка';

    constructor(private mainService: MainService, private route: ActivatedRoute) {}

    ngOnInit() {
        return this.mainService.getPage(this.route.snapshot.params['slug']).subscribe(response => {
            this.page = new Page(response.data);
        }, error => {
            console.log(error);
                this.isError = true;
                this.errorMessage = error.error.message;
        });

    }

}
