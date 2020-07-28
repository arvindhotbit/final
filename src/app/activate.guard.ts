import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {AuthserviceService} from './auth/authservice.service';
@Injectable({
  providedIn: 'root'
})
export class ActivateGuard implements CanActivate {
  constructor(public _authservice:AuthserviceService, private toastr: ToastrService,private router: Router) { }
  canActivate(): boolean {

  if(this._authservice.loggenIn())
  {
   
    return true
   
  }
else
{
  this.router.navigate(['/login'])
  return false;
}
  }

  
}
