import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Observable } from "rxjs";
import {AuthserviceService} from './auth/authservice.service';
@Injectable({
  providedIn: 'root'
})
export class ActivateGuard implements CanActivate {
  constructor(public _authservice:AuthserviceService, private toastr: ToastrService,private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._authservice.canActivateLogin || confirm("Do you really want to go back to login?");
  }

  
}
