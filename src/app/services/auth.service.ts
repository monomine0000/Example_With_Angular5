import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserInterface} from '../interfeces/user-interface';
import {environment} from '../../environments/environment';
import {ResponseInterface} from '../interfeces/response-interface';
import {User} from '../classes/user';
import {Storage} from '../classes/helpers/storage';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable()
export class AuthService {

    /**
     * @type {string}
     */
    tokenName = '_token';

    /**
     * message when error
     * @type {string}
     */
    errorMessage = '';

    /**
     * @type {boolean}
     */
    private _isAuth = new BehaviorSubject(false);

    /**
     * @type {string}
     */
    private _token = '';

    /**
     * current user
     */
    private _user: UserInterface;

    /**
     * @type {boolean}
     * @private
     */
    private _isAdmin = false;

    /**
     * environment
     */
    private environment;

    /**
     * @type {Storage}
     */
    private storage;

    /**
     * @param {HttpClient} httpClient
     */
    constructor(private httpClient: HttpClient) {
        this.storage = new Storage(Storage.sessionStorage, this.tokenName, 300);
        this.environment = environment;
        this._isAuth.next(!!this.storage.getFromStorage());
        if (this._isAuth) {
            this._token = this.storage.getFromStorage();
        }
    }

    /**
     * @returns {Observable}
     */
    get isAuth(): Observable<any> {
        return this._isAuth;
    }

    /**
     * current token
     * @returns {string}
     */
    get token(): string {
        return this._token;
    }

    /**
     * @param {string} email
     * @param {string} password
     * @returns {Observable}
     */
    login(email: string, password: string): Subject<AuthService> {
        const ret = new Subject<AuthService>();
        if (this.storage.getFromStorage()) {
            this._isAuth.next(true);
            this._token = this.storage.getFromStorage();
            ret.next(this);
            return;
        }
        this.httpClient
            .post<ResponseInterface>(this.environment.apiSchema + this.environment.apiHost + '/auth/login', {
                email: email,
                password: password
            })
            .subscribe(response => {
                this._isAuth.next(true);
                this._user = new User(response.data);
                this._token = this._user.apiToken.key;
                this._isAdmin = this._user.roles === 'admin';
                this.storage.data = this._token;
                this.storage.store();
                ret.next(this);
            }, error => {
                if (error && error.error) {
                    this.errorMessage = error.error.message;
                } else {
                    this.errorMessage = 'Ошибка приложения';
                    console.log(error);
                }
            });
        return ret;
    }

    /**
     * logout
     */
    logout(): void {
        const hasToken = this.storage.getFromStorage();
        if (hasToken) {
            this.httpClient.post<ResponseInterface>(
                this.environment.apiSchema + this.environment.apiHost + '/auth/logout', {token: this.storage.getFromStorage()}
            ).subscribe(data => {
                if (data.success) {
                    this._isAuth.next(false);
                    this._token = '';
                    this._user = new User();
                    this._isAdmin = false;
                }
            });
            this.storage.removeFromStorage();
        }
    }

    register(form): Observable<ResponseInterface> {
      return this.httpClient.post<ResponseInterface>(this.environment.apiSchema + this.environment.apiHost + '/auth/register', form);
    }
}
