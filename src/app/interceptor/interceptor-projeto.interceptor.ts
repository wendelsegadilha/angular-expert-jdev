import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
}
from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class interceptorProjetoInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authorization = ''+localStorage.getItem('Authorization');

    if (authorization !== null && authorization !== '' && authorization != 'null'){
      console.log('Interceptor: Tem token -> enviando na requisição', authorization);
      const authReq = request.clone({
        headers: request.headers.set('Authorization', authorization)
      });
      return next.handle(authReq);
    }
    console.log('Interceptor: Não tem token');
    return next.handle(request);
  }

}