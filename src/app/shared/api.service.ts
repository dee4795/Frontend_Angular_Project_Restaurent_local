import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { RestaurentData } from '../restaurent-dash/restaurent.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  addRestaurent(restaurentModelObj: RestaurentData) {
    return this._http.post<any>(`${this.baseUrl}/posts`, restaurentModelObj).pipe(map((res:any)=> res));
  }

  postRestaurent(data:any) {
    return this._http.post<any>(`${this.baseUrl}/posts`, data).pipe(map((res:any)=> res));
  }

  getRestaurent() {
    return this._http.get<any>(`${this.baseUrl}/posts`).pipe(map((res:any)=> res));
  }

  deleteRestaurant(id:any) {
    return this._http.delete<any>(`${this.baseUrl}/posts/${id}`).pipe(map((res:any)=> res));
  }

  updateRestaurant(id: any,data: any) {
    return this._http.put<any>(`${this.baseUrl}/posts/${id}`, data).pipe(map((res:any)=> res));
  }
}