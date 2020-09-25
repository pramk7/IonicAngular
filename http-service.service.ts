import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { from, observable, Observable, of } from 'rxjs';
import { environment } from './../../environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private platform: Platform, private httpclient: HttpClient, private http: HTTP) {
  }

  HttpRequest(method: 'POST'|'GET', url: string, requestBody: any): any
  {

    url = environment.serverBaseUrl + url;

    const headers = {};

    if (this.platform.is('ios') || this.platform.is('android') || this.platform.is('mobile'))
    {
    if (method === 'POST')
    {
      console.log('Advance_HTTP_POST');
      return from(this.http.post(url, requestBody, headers)).pipe(map((data: any) => JSON.parse(data?.data)));
    } else if (method === 'GET')
    {
      console.log('Advance_HTTP_GET');
      return from(this.http.get(url, {}, headers)).pipe(map((data: any) => JSON.parse(data?.data)));
    }
  } else {
    if (method === 'POST')
    {
      console.log('HTTPClient_HTTP_POST');
      return this.httpclient.post(url, requestBody, {headers});
    } else if (method === 'GET')
    {
      console.log('HTTPClient_HTTP_GET');
      return this.httpclient.get(url, {headers});
    }
    }
  }
}
