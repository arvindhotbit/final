import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthserviceService} from '../authservice.service';
import {Auth} from '../auth';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  logotitle = "Trustling - Real Time Screening";
  constructor(public _authservice:AuthserviceService, private toastr: ToastrService) { }

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


  this._authservice.createuser(formdata.value).subscribe((res)=>{
    console.log(formdata.value);
    this.resetForm(formdata);
    this.toastr.success('successfully', 'Create Add User');
  
  });
 


}
}
