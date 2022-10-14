import { TokenService } from 'src/app/services/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http: HttpClient,
    private tokenService : TokenService
   ) { }

  getAll(){
    const headers = new HttpHeaders().set('Authorization' , `Bearer ${this.tokenService.getToken()}`)
    return this.http.get(`${environment.apiUrl}product`,{headers})
  }
}
