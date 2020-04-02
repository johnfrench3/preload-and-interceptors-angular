import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class TransformResponseInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          if (event.body.data) {
            console.group(`HTTP: Response transformed`);
            const body = event.body.data;
            console.table(body);
            console.groupEnd();
            return event.clone({ body });
          }
          return event.clone(); // undefined means dont change it
        }
      })
    );
  }
}
