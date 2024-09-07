import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const baseUrl = `http://localhost:3000/skulls`;
@Injectable({
  providedIn: 'root'
})
export class SkullsService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  getAllSkulls(){
    return this.http.get(`${baseUrl}/getAllSkulls`);
    //return this.http.get(`${baseURL}/getAllOrder`);
  }

  createSkulls(data: any){
    console.log('El valor de data', data)
    const formData = new FormData()
    for (let key of Object.keys(data)){
      formData.append(key, data[key])
    }
    return this.http.post(`${baseUrl}/createSkulls`, formData)
  }

  getSkullById(idSkull: any){
    return this.http.get(`${baseUrl}/getSkullById/${idSkull}` )
  }
}
