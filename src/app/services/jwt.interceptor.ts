import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private tokenService : TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //mecanisme li kay dir override y9dar ybdal f header dyal n'import quel requete http kharja  mn angular
    // bach  n9ad ndir les executer  les  api rest dyali khas  darori ykon 3ndi token fl header Bearer ....
   request= request.clone({
      setHeaders:{

        Authorization:`Bearer ${this.tokenService.getToken()}`

    }
  })
    console.log("request is  ==> ", request)
    return next.handle(request);
  }
}
