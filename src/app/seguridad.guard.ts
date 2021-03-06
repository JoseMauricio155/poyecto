import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree ,Router} from '@angular/router';
import { Observable } from 'rxjs';
import {DatosServiceService} from './datos-service.service'

@Injectable({
  providedIn: 'root'
})
export class SeguridadGuard implements CanActivate {
  constructor(private datos:DatosServiceService, private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.datos.getCuenta().user == ''){
        this.router.navigate(['']);
        return false;
      }
      return true;
  }
  
}
