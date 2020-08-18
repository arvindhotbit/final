import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Subject, Observable  } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import {Auth} from './auth';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  authscheme:  Auth;
  isloggedin():boolean{
    return true;
    }
    private userLoggedIn = new Subject<boolean>();
  constructor(private http : HttpClient,private router: Router) {
    this.userLoggedIn.next(false);
   }
  // readonly _base_url:string = "http://192.168.1.208:8900/api";


  setUserLoggedIn(userLoggedIn: boolean) {
    this.userLoggedIn.next(userLoggedIn);
  }

  getUserLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }
createuser(auth:Auth)
{ 
  return this.http.post<any>(`${environment.apiUrl}/addUsers`,auth)

};
loginuser(auth:Auth)
{ 
  return this.http.post<any>(`${environment.apiUrl}/login`,auth)

};
loggenIn(){
  return  !!localStorage.getItem('token')
}
loggedOut()
{
  localStorage.removeItem("token");
  localStorage.removeItem("Role");
  localStorage.removeItem("id");
  this.router.navigate(['/login']);

}
}
