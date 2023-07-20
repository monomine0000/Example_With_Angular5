import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../services/admin.service';

@Component({
    selector: 'app-admin-page-list',
    templateUrl: './admin-page-list.component.html',
    styleUrls: ['./admin-page-list.component.css']
})
export class PageListComponent implements OnInit {

    pageList = [];
    message = '';

    constructor(private adminService: AdminService) {
    }

    ngOnInit() {
        this.getList();
    }

    /**
     * page delete method
     * @param {string} pageId
     */
    deletePage(pageId: string) {
        console.log(pageId);
        this.adminService.deletePage(pageId).subscribe(data => {
            if (data.success) {
                this.message = data.message;
                this.getList();
            }
        }, error => {
            this.message = error.message;
        });
    }

    /**
     * get the list of pages
     */
    getList() {
        this.adminService.getList().subscribe(list => {
            this.pageList = list.data.items;
        });
    }
}
