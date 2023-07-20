import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ResponseInterface} from '../../interfeces/response-interface';
import {AdminService} from '../../services/admin.service';
import {Response} from '../../classes/response';
import {PageInterface} from '../../interfeces/page-interface';
import {Page} from '../../classes/page';
import {Storage} from '../../classes/helpers/storage';

@Component({
    selector: 'app-admin-page-edit',
    templateUrl: './admin-page-edit.component.html',
    styleUrls: ['./admin-page-edit.component.css']
})
export class PageEditComponent implements OnInit {

    response: ResponseInterface = new Response();
    page: PageInterface = new Page();
    pageList = [];

    constructor(private adminService: AdminService, private route: ActivatedRoute) {
        this.adminService.checkAuth();
    }

    /**
     * returns a new instance of Storage
     * @returns {Storage}
     */
    private static getListStorage(): Storage {
        return new Storage(Storage.sessionStorage, 'pageList', 300);
    }

    /**
     * Returns a new onstans of storage by pageId
     * @param {string} pageId
     * @returns {Storage}
     */
    private static getPageStorage(pageId: string): Storage {
        return new Storage(Storage.sessionStorage, 'page' + pageId, 300);
    }

    ngOnInit() {
        this.getList();
        this.getPage();
    }

    /**
     * @param {NgForm} pageForm
     */
    onSubmit(pageForm: NgForm): void {
        if (pageForm.value.pageId) {
            PageEditComponent.getPageStorage(pageForm.value.pageId).removeFromStorage();
            PageEditComponent.getListStorage().removeFromStorage();
        }
        this
            .adminService
            .savePage(
                pageForm.value.pageId,
                pageForm.value.title,
                pageForm.value.content,
                pageForm.value.slug,
                pageForm.value.isDefault
            )
            .then(response => {
                    this.response.message = response.message;
                    this.response.success = response.success;
                }, error => {
                    this.response.success = error.success;
                    this.response.message = error.message;
            });
    }

    /**
     * get page list
     */
    private getList(): void {
        const storage = PageEditComponent.getListStorage();
        const pageList = storage.getFromStorage();
        if (pageList) {
            this.pageList = pageList;
            return;
        }
        this.adminService.getList().subscribe(list => {
            storage.data = list.data;
            storage.store();
            this.pageList = list.data.items;
        });
    }

    /**
     * get page
     */
    private getPage(): void {
        if (this.route.snapshot.params['pageId']) {
            const storage = PageEditComponent.getPageStorage(this.route.snapshot.params['pageId']);
            const page = storage.getFromStorage();
            if (page) {
                this.page = page;
                return;
            }
            this.adminService.getPage(this.route.snapshot.params['pageId']).subscribe(response => {
                this.page = new Page(response.data);
                storage.data = this.page;
                storage.store();
            }, error => {
                this.response.success = error.success;
                this.response.message = error.message;
            });
        }
    }
}
