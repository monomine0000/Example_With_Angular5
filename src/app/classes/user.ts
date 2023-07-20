import {UserInterface} from '../interfeces/user-interface';

export class User implements UserInterface {
    private _apiToken: { key: string };
    private _email: string;
    private _roles: string;
    private _userId: string;
    private _username: string;

    constructor(values: Object = {}) {
        if (values) {
            Object.assign(this, values);
        }
    }


    set apiToken(value: { key: string }) {
        this._apiToken = value;
    }

    set email(value: string) {
        this._email = value;
    }

    set roles(value: string) {
        this._roles = value;
    }

    set userId(value: string) {
        this._userId = value;
    }

    set username(value: string) {
        this._username = value;
    }

    get apiToken(): { key: string } {
        return this._apiToken;
    }

    get email(): string {
        return this._email;
    }

    get roles(): string {
        return this._roles;
    }

    get userId(): string {
        return this._userId;
    }

    get username(): string {
        return this._username;
    }
}
