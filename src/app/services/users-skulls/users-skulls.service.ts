import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

const baseUrl = `http://localhost:3000/users-skulls`;
@Injectable({
  providedIn: 'root'
})
export class UsersSkullsService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { 

  }

  voteSkull(dataUser: any, dataSkull: any) {
    console.log('dataUser', dataUser)
    console.log('dataSkull', dataSkull)
    const formData = new FormData();
    for (let key of Object.keys(dataUser)){
      formData.append(key, dataUser[key])
    }
    for (let key of Object.keys(dataSkull)){
      formData.append(key, dataSkull[key])
    }
    console.log('FormData en el servicio: ', formData);
    return this.http.post(`${baseUrl}/createUserSkull`, formData)
  }

}
