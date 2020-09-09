import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthserviceService } from '../authservice.service';
import { TableDataService } from '../../shared/table-data.service';
import { Auth } from '../auth';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  logotitle = "Trustling - Real Time Screening";
  showdata: any;
  loading = false;
  constructor(public _authservice: AuthserviceService, private toastr: ToastrService, private _tablelist: TableDataService) { }

  ngOnInit(): void {
    this.resetForm();
    this.roleslist();
  }
  resetForm(formdata?: NgForm) {
    if (formdata)
      formdata.reset();
    this._authservice.authscheme = {
      id: "",
      role: "",
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


  submitform(formdata: NgForm) {

    this.loading = true;
    this._authservice.createuser(formdata.value).subscribe((res) => {
      console.log(formdata.value);
      this.resetForm(formdata);
      this.toastr.success(res.message, 'Create Add User');

    });



  }

  roleslist() {
    this._tablelist.rolelistviewpage().subscribe((res) => {
      this.showdata = res.result;
      console.log(this.showdata);

    })
  }

}
