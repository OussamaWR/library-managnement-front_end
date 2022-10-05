import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url=environment.apiUrl;
  constructor( private httpClient:HttpClient) { }


  signup(user:User):Observable<User>{
    console.log("vers server , =>")
    return this.httpClient.post<User>(this.url+"user/signup",user)
  }

  forgotPassword(data:any){
    return this.httpClient.post(this.url+"user/forgotPassword",data)
  }
}
