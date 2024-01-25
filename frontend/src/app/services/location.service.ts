import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LatLngLiteral } from "leaflet";
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }


  getCurrentLocation(): Observable<LatLngLiteral>{
    return new Observable( (observer) => {
      if(!navigator.geolocation) return;

      return navigator.geolocation.getCurrentPosition(
        (pos) => {
          observer.next({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          })
        },
        (error) => {
          observer.error(error);
        }
      )
    })
  }

  
}
