import { Component,Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AuthserviceService} from '../authservice.service';
import {Auth} from '../auth';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { parseJSON } from 'jquery';
import { stringify } from 'querystring';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   
  constructor(public _authservice:AuthserviceService, private toastr: ToastrService,private router: Router) { }
  message : string = "";
  Username :string = "";
  useridplaceholder = "Enter a UserId";
  passwordplaceholder = "Enter a Password";
  loading = false;
  ngOnInit(): void {
    this.resetForm();

  }
  resetForm(formdata?: NgForm) {
    if (formdata)
    formdata.reset();
      this._authservice.authscheme = {
        id : "",
        role : "",
        userid: "",
        cn: "",
        sn: "",
        email: "",
        password: "",
        empNo: "",
        department: "",
        roles: ""
    
    }
   }
 

submitform(formdata: NgForm){
  this.loading = true;
this._authservice.loginuser(formdata.value).subscribe(
(res) =>{
localStorage.setItem('token',res.token);
localStorage.setItem('Id',res.id);
localStorage.setItem('Role',res.role);
localStorage.setItem('UserZone',res.user_zone);
this.message = res.message,
this.Username = res.result[0].cn +" "+ res.result[0].sn,
localStorage.setItem('Username',this.Username);
this._authservice.setUserLoggedIn(true);
if(res.role === "makers")
{
this.router.navigate(['/home'])
}
else if(res.role === "checkers")
{
 this.router.navigate(['/home'])
 }

else if(res.role === "admin")
{
  this.router.navigate(['/home'])
}
else
{
this.router.navigate(['/login'])
}
},
(error)=>{

console.log(error),
this.message = "login failed";
});
 
}
}
