import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormArray, FormControl,FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import {TableDataService} from '../shared/table-data.service';
import {AuthserviceService} from '../auth/authservice.service';
import {sensitivescheme} from '../shared/tabular';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { element } from 'protractor';
import { data, parseJSON } from 'jquery';
import { Observable } from 'rxjs';
import {Location} from '@angular/common';

@Component({
  selector: 'app-sensitive-word',
  templateUrl: './sensitive-word.component.html',
  styleUrls: ['./sensitive-word.component.css']
})
export class SensitiveWordComponent implements OnInit {

  public pageSize: number = 10;
  public myData:string;
  public UserId:string;
  public UserName:string;
  selectedAllclone: any;
  public showdatapart:any = [];
  p:number =1;
  nsn = true;
  zoneid = true;
  SENSITIVEWORDS = true;
  sensitivefilters:string ="";
  zonefilters:string ="";
  IS_DELETE= false;
  IS_UPDATE= false;
  ref_keys= false;
  DELETE_FLG= false;
  selectedsensitiveRow : sensitivescheme;
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
  clone : any;
  zone: string = "";
  noise: string = "";
  apstatus:string = "";
  btn_name :string = "Submit";
  isdelete_button:boolean = true;
  tbl_header:any = [];
  userzone :string;
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
      this._tableservice.getsensitive().subscribe((res)=>{
        this.showdatapart = res.result;
        this.tbl_header = res.metadata;
        console.log("data" , this.showdatapart);
      })
 
    
    
      this.valuedelete = "1";
      this._isaccess = false;
      this.updatemark = "1";
  
    }
    else if(myData === "checkers")
    {
      this._tableservice.getsensitive().subscribe((res)=>{
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
     this._tableservice.selectsensitive = {
        REF_KEY: "" ,
        ROLE : this.myData,
        USER_ID : this.UserId,
        USER_NAME : this.UserName,
        USER_ZONE : this.userzone,
        SENSITIVE_WORDS : "",
        ZONE_ID : "",
        HIST_ID :"",
        APPROVE_STATUS : this.apstatus,
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
  this._tableservice.postsensitive(form.value).subscribe((res)=>{
    //  this.resetForm(form);
   this.refreshEmployeeList();
    this.toastr.success(res.message, 'Neutral Words');

  });
}
else
{
  console.log(form.value);
this._tableservice.putsensitive(form.value).subscribe((res) => {
  this.toggle = !this.toggle;
  $("#addForm").toggle();
    // this.resetForm(form);
    this.refreshEmployeeList();
    this.toastr.info(res.message, 'Neutral Words');

  });
}
}





onEdit(senstive: sensitivescheme,bt:string) {
  this.btn_name = "Update";
  console.log('update'+ senstive.USER_NAME);
  this._tableservice.selectsensitive = senstive;
  this.selectedsensitiveRow = senstive;
}




deleteSelected(form: NgForm){
  this.delete_toggle = !this.delete_toggle;
  var myData = localStorage.getItem('Role');
    console.log(myData);
    if(myData === "makers")
    {
  
      this.SelectedIDs.forEach( (obj) => {
        this._tableservice.deletesensitive(obj).subscribe((res) => {
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
ChkdeleteSelected(form:NgForm,senstive:sensitivescheme)
{

    this._tableservice.selectsensitive = senstive;
    this.selectedsensitiveRow = senstive;
    console.log(form.value,senstive);

      this._tableservice.sensapproved({...form.value,...senstive}).subscribe((res) => {
         this.refreshEmployeeList();
        this.toastr.success(res.message, 'Approved');
     
      });
  


}
ChkNotdeleteSelected(form:NgForm,senstive:sensitivescheme)
{


  this._tableservice.selectsensitive = senstive;
  this.selectedsensitiveRow = senstive;
  console.log(form.value,senstive);
    this._tableservice.sensdisapproved({...form.value,...senstive}).subscribe((res) => {
     this.refreshEmployeeList();

      this.toastr.info(res.message, 'Disapproved');
    });

}

}
