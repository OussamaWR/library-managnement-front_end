import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

constructor(private tokenService : TokenService) { }

  private loggedIn = new BehaviorSubject<boolean>( this.tokenService.loggeIn());



  authStatus= this.loggedIn.asObservable();

   changeStatus(value:boolean){
     this.loggedIn.next(value);
   }


}
