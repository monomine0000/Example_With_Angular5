import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';


export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = localStorage.getItem('_token');

        if (token) {
            req = req.clone({
                headers: req.headers.set('X-API-TOKEN', token)
            });

        }

        return next.handle(req);
    }

}
