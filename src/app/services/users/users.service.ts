import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/User';
const baseUrl = `http://localhost:3000/users`;
//const baseUrl = `http://198.71.57.99:3000/users`;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public currentUserSubject: BehaviorSubject<any>;
	public currentUser: Observable<User>;

  constructor(
    private router: Router,
		private http: HttpClient,
    ) 
    { 
      this.currentUserSubject = new BehaviorSubject<User>(
        JSON.parse(localStorage.getItem('currentUser') || '{}') as any
      );
      this.currentUser = this.currentUserSubject.asObservable();
    }
    
    createUser(data: any) {
      console.log('Valor de data: ', data);
      const formData = new FormData();
      //formData.append('UrlOrderFile', file, file.name);
      for (let key of Object.keys(data)) {
        formData.append(key, data[key]);
      }
      return this.http.post(`${baseUrl}/createUser`, formData);
    }

    loginUser(data: any){
      console.log('Valor de data: ', data);
      const formData = new FormData();
      for(let key of Object.keys(data)){
        formData.append(key, data[key]);
      }
      return this.http.post(`${baseUrl}/loginUser`, formData);
    }
}
