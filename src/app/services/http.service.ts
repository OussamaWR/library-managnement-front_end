import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/services/token.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private token : TokenService
    ) { }



    post(serviceName: string, data: any) {

      console.log("Sending post request ...")

      const headers = new HttpHeaders()
        .set('Accept', 'application/json');

      const options = {
        headers,
        withCredintials: false,
        observe: "response" as 'body' // to display the full response
      };
      const url = environment.apiUrl + serviceName;

      return this.http.post(url, data, options);
    }



    authPost(serviceName: string, data = null) {

      console.log("Sending auth post request ...");

      const token: any = this.token.getToken();
      const url = environment.apiUrl + serviceName;
      const headers = new HttpHeaders()
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      const options = {
        headers,
        withCredintials: false,
        observe: "response" as 'body'
      };
      return this.http.post(url, data, options);
  }


  authGet(serviceName: string, queryParams ?: HttpParams ) {

    console.log("Sending auth get request ...");

    const token: any = this.token.getToken();
    const url = environment.apiUrl + serviceName;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    const options = {
      headers,
      withCredintials: false,
      observe: "response" as 'body',
      params: queryParams
    };

    return this.http.get(url, options);
  }


  authPut(serviceName: string, data = null) {

    console.log("Sending auth put request ..")

    const token: any = this.token.getToken();
    const url = environment.apiUrl + serviceName;
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
      'Cross-Origin': 'true',
      "Access-Control-Allow-Headers": "*",
      'Access-Control-Request-Methods': '*',
    })

    const options = {
      headers,
      withCredintials: false,
      observe: "response" as 'body',
    };

    return this.http.put(url, data, options);
  }

authDelete(serviceName: string, queryParams ?: HttpParams) {

    console.log("Sending auth delete request ..")


    const token: any = this.token.getToken();
    const url = environment.apiUrl + serviceName;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    const options = {
      headers,
      withCredintials: false,
      observe: "response" as 'body',
      params: queryParams
    };

    return this.http.delete(url, options);
  }


}
