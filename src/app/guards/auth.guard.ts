import { AccountService } from './../services/account.service';
import { TokenService } from './../services/token.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


constructor(private tokenService:TokenService,
  private accountService:AccountService,
  private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,

    state: RouterStateSnapshot): boolean  {

      if(!this.tokenService.loggeIn()){
        this.router.navigateByUrl('/');
        this.tokenService.remove();
        this.accountService.changeStatus(false)

        return false;
      }
   console.warn('ok')
   return true ;
  }

}
