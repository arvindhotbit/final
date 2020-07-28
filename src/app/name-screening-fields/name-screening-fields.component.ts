

import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormArray, FormControl,FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import {TableDataService} from '../shared/table-data.service';
import {AuthserviceService} from '../auth/authservice.service';
import {namescreen} from '../shared/tabular';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { data, parseJSON } from 'jquery';
import { Observable } from 'rxjs';
import {Location} from '@angular/common';
import * as $ from 'jquery';


@Component({
  selector: 'app-name-screening-fields',
  templateUrl: './name-screening-fields.component.html',
  styleUrls: ['./name-screening-fields.component.css']
})
export class NameScreeningFieldsComponent implements OnInit {
  public pageSize: number = 10;
  public myData:string;
  public UserId:string;
  public UserName:string;
  selectedAllclone: any;
  public showdatapart:any = [];
  p:number =1;
  nsn = true;
  zoneid = true;
  zonefilters:string ="";
  IS_DELETE= false;
  IS_UPDATE= false;
  ref_keys= false;
  DELETE_FLG= false;
  selectednsRow : namescreen;
  public selectedAll = "";
  public SelectedIDs:any = [];
  checkbox: boolean;
  filteredArray : any = [];
  is_edit : boolean = true;
  isButtonClass : boolean;
  valuedelete : string="" ;
  _isaccess : boolean;
  updatemark : string;
  status_alph : string = "";
  flag : string= "";
  toggle = true;
  delete_toggle = true;
  apstatus:string = "";
  btn_name :string = "Submit";
  isdelete_button:boolean = true;
  tbl_header:any = [];
  userzone :string;
  fieldlblcol: boolean = true;
  scannmcol: boolean = true;
  oldfieldlblcol: boolean = true;
  oldscannmcol: boolean = true;
  ctnm: boolean = true;
  flnm:string;
  scannm:string;
  oldflnm:string;
  oldscannm:string;
  ctnmf:string;
  constructor(public _tableservice:TableDataService,public _authservice:AuthserviceService, private toastr: ToastrService,private _location: Location) {
    this.userzone = "QA";
    this.myData = localStorage.getItem('Role');
    this.UserId = localStorage.getItem('Id');
    this.UserName = localStorage.getItem('Username');
     }

  ngOnInit(): void {
    
    this.resetForm();
    this.refreshEmployeeList();
   
  }


  backClicked() {
    this._location.back();
  }
 
  refreshEmployeeList()
  {
    var myData = localStorage.getItem('Role');
    console.log(myData);
    if(myData === "makers")
    {
      this._tableservice.fetchns().subscribe((res)=>{
        this.showdatapart = res.result;
        // this.tbl_header = res.metadata.name;
        console.log("data" , this.showdatapart);
      })
 
    
    
      this.valuedelete = "1";
      this._isaccess = false;
      this.updatemark = "1";
  
    }
    else if(myData === "checkers")
    {
      this._tableservice.fetchns().subscribe((res)=>{
        this.showdatapart = res.result;
        this.tbl_header = res.metadata;
        console.log(this.showdatapart);
      })
      this.valuedelete = "y";
      this._isaccess = true;
      this.updatemark = "y";
      
     
    }
  }
  
 

  addform = () =>{
    this.toggle = !this.toggle;
    $("#addForm").toggle();
  }

  
  selectAll() {
    for (var i = 0; i < this.showdatapart.length; i++) {
      this.showdatapart.result[i].isSelected = this.selectedAllclone;
      console.log(this.showdatapart.result[i].isSelected)
    }
  }


  

 
  


 resetForm(form?: NgForm) {
   if (form)
  form.reset();
     this._tableservice.selectns = {
              REF_KEY : "",
              USER_ID : "",
              USER_NAME : "",
              USER_ZONE : "",
              ROLE : "",
              ZONE_ID : "",
              FIELD_LABEL : "",
              SCAN : "",
              HIST_ID : "",
              APPROVE_STATUS : "",
              CHANGE_TYPE : ""
 
   }
  }

   selectID(id, isSelected){  
    
    if(isSelected === true)
  {
    this.SelectedIDs.push(id);
    this.isdelete_button = false;
  }

    else
    {
      this.SelectedIDs.pop(id);
      this.isdelete_button = true;
    }
    console.log("true" + this.SelectedIDs);
    console.log("false" + this.filteredArray);
 

  }
  
  
 



  submitform(form: NgForm){

   
    if (form.value.REF_KEY == "") {
      this.toggle = !this.toggle;
      $("#addForm").toggle();
  this._tableservice.postns(form.value).subscribe((res)=>{
    //  this.resetForm(form);
   this.refreshEmployeeList();
    this.toastr.success(res.message, 'Neutral Words');

  });
}
else
{
  console.log(form.value);
this._tableservice.putns(form.value).subscribe((res) => {
  this.toggle = !this.toggle;
  $("#addForm").toggle();
    // this.resetForm(form);
    this.refreshEmployeeList();
    this.toastr.info(res.message, 'Neutral Words');

  });
}
}





onEdit(ns: namescreen,bt:string) {
  this.btn_name = "Update";
  this._tableservice.selectns = ns;
  this.selectednsRow = ns;
}




deleteSelected(form: NgForm){
  this.delete_toggle = !this.delete_toggle;
  var myData = localStorage.getItem('Role');
    console.log(myData);
    if(myData === "makers")
    {
  
      this.SelectedIDs.forEach( (obj) => {
        this._tableservice.deletems(obj).subscribe((res) => {
          this.refreshEmployeeList();
          this.resetForm(form);
          this.toastr.warning(res.message, 'Neutral Words');
        });
      });
    }
  
}
changetext(status:string,form:NgForm)
{
  this.apstatus = status;
  this.myData = localStorage.getItem('Role');
  this.UserId = localStorage.getItem('Id');
  this.UserName = localStorage.getItem('Username');
  console.log(this.apstatus);
}
changetextr(status:string,form:NgForm)
{
  this.apstatus = status;
  this.myData = localStorage.getItem('Role');
  this.UserId = localStorage.getItem('Id');
  this.UserName = localStorage.getItem('Username');
  console.log(this.apstatus);
}
ChkdeleteSelected(form:NgForm,ns:namescreen)
{

    this._tableservice.selectns = ns;
    this.selectednsRow = ns;
    console.log(form.value,ns);

      this._tableservice.nsapproved({...form.value,...ns}).subscribe((res) => {
         this.refreshEmployeeList();
        this.toastr.success(res.message, 'Approved');
     
      });
  


}
ChkNotdeleteSelected(form:NgForm,ns:namescreen)
{


  this._tableservice.selectns = ns;
  this.selectednsRow = ns;
  console.log(form.value,ns);
    this._tableservice.msdisapproved({...form.value,...ns}).subscribe((res) => {
     this.refreshEmployeeList();

      this.toastr.info(res.message, 'Disapproved');
    });

}

}



