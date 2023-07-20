import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {AdminPageList} from '../interfeces/admin-page-list';
import {environment} from '../../environments/environment';
import {ResponseInterface} from '../interfeces/response-interface';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable()
export class AdminService {

    /**
     * env vars
     */
    private environment;

    constructor(private httpClient: HttpClient, private authService: AuthService, private router: Router) {
        this.checkAuth();
        this.environment = environment;
    }

    /**
     * @returns {Observable<AdminPageList>}
     */
    getList(): Observable<AdminPageList> {
        return this
            .httpClient
            .get<AdminPageList>(this.environment.apiSchema + this.environment.apiHost + '/admin/page/list', {headers: this.getHeaders()});
    }

    /**
     * @param {string} pageId
     * @returns {Observable<ResponseInterface>}
     */
    getPage(pageId: string = null): Observable<ResponseInterface> {
        if (!pageId) {
            throw new Error('pageId is required parameter');
        }
        return this
            .httpClient
            .get<ResponseInterface>(
                this.environment.apiSchema + this.environment.apiHost + '/admin/page/' + pageId,
                {headers: this.getHeaders()}
                );
    }

    /**
     * deletes a page by id
     * @param {string} pageId
     * @returns {Observable<ResponseInterface>}
     */
    deletePage(pageId: string): Observable<ResponseInterface> {
        return this.httpClient
            .delete<ResponseInterface>(
                this.environment.apiSchema + this.environment.apiHost + '/admin/page/' + pageId + '/delete',
                {headers: this.getHeaders()}
                );
    }

    /**
     *
     * @param {string} pageId
     * @param {string} title
     * @param {string} content
     * @param {string} slug
     * @param {boolean} isDefault
     * @returns {Promise<ResponseInterface>}
     */
    savePage(pageId: string = null, title: string, content: string, slug: string, isDefault: boolean): Promise<ResponseInterface> {
        return this
            .httpClient
            .post<ResponseInterface>(this.environment.apiSchema + this.environment.apiHost + '/admin/page/save', {
                pageId: pageId,
                title: title,
                content: content,
                slug: slug,
                isDefault: isDefault
            }, {headers: this.getHeaders()})
            .toPromise();
    }

    /**
     * @returns {boolean}
     */
    checkAuth(): boolean {
        let check = false;
        this.authService.isAuth.subscribe(data => {
            check = data;
        });
        if (!check) {
            this.router.navigate(['']);
            return;
        }
        return true;
    }

    /**
     * builds a header
     * @returns {Object}
     */
    private getHeaders() {
        return {
            'Content-Type': 'application/json',
            'X-API-TOKEN': this.authService.token
        };
    }

}
