import { Injectable } from '@angular/core';

declare var FB: any;

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  constructor() { }

  // Inicializar el SDK de Facebook
  init() {
    FB.init({
      appId: '3146660332309085', // Reemplaza con el ID de tu aplicación
      autoLogAppEvents: true,
      xfbml: true,
      version: '0.3.3' // Reemplaza con la versión del SDK de Facebook
    });
  }
}
