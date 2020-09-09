import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormArray, FormControl,FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import {TableDataService} from '../shared/table-data.service';
import {AuthserviceService} from '../auth/authservice.service';
import {Paymentscreenadk} from '../shared/tabular';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { data, parseJSON } from 'jquery';
import { Observable } from 'rxjs';
import {Location} from '@angular/common';
import * as $ from 'jquery';

@Component({
  selector: 'app-payment-screening-for-adk',
  templateUrl: './payment-screening-for-adk.component.html',
  styleUrls: ['./payment-screening-for-adk.component.css']
})
export class PaymentScreeningForAdkComponent implements OnInit {

  public pageSize: number = 10;
  public myData:string;
  public UserId:string;
  public UserName:string;
  selectedAllclone: any;
  public showdatapart:any = [];
  _InsertButtonAccess:boolean;
  _DeleteButtonAccess:boolean;
  _updateButtonAccess:boolean;
  p:number =1;
  nsn = true;
  zoneid = true;
  zonefilters:string ="";
  IS_DELETE= false;
  IS_UPDATE= false;
  ref_keys= false;
  DELETE_FLG= false;
  selectedpsadkRow : Paymentscreenadk;
  public selectedAll = "";
  public SelectedIDs:any = [];
  checkbox: boolean;
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
  mtxxxtypecol:boolean=true;
  fieldlabelcol:boolean=true;
  scancol:boolean=true;
  tagacol:boolean=false;
  tagcol:boolean=false;
  oldmtxxxtypecol:boolean=true;
  oldfieldlabelcol:boolean=true;
  oldscancol:boolean=true;
  oldtagacol:boolean=false;
  oldtagcol:boolean=false;
  changetypecol:boolean=true;
  xbunch: string;
  ybunch: string;
  formact: string = "Add Record";
  masterSelected: boolean;
  checkedList: any;
  histmasterSelected: boolean;
  histcheckedList: any;
  _page_authority: any;
  orig_value: any;
  mtx:string;fieldlabelterm:string;scan:string;tag:string;taga:string;oldmtx:string;oldfldl:string;scanold:string;tagold:string;tagaold:string;changetype:string;
  constructor(public _tableservice:TableDataService,public _authservice:AuthserviceService, private toastr: ToastrService,private _location: Location) {
    this.userzone = "QA";
    this.masterSelected = false;
    this.histmasterSelected = false;
    this.myData = localStorage.getItem('Role');
    this.UserId = localStorage.getItem('Id');
    this.UserName = localStorage.getItem('Username');
    this.getCheckedItemList();
    this.getCheckedItemhistList();
     }

  ngOnInit(): void {
    
    this.resetForm();
    this.refreshEmployeeList();
    this.unseen();
  }



  checkUncheckAll() {
    for (var i = 0; i < this.showdatapart.length; i++) {
      this.showdatapart[i].isSelected = this.masterSelected;
      console.log("master", this.masterSelected);
    }
    this.getCheckedItemList();
  }
  isAllSelected() {
    this.masterSelected = this.showdatapart.every(function (item: any) {
      return item.isSelected == true;
    })
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.showdatapart.length; i++) {
      if (this.showdatapart[i].isSelected)
        this.checkedList.push(this.showdatapart[i].REF_KEY);
    }

    this.xbunch = this.checkedList.toString();
    this.isdelete_button = false;
  }





  histcheckUncheckAll() {
    for (var i = 0; i < this.showdatapart.length; i++) {
      this.showdatapart[i].isSelected = this.histmasterSelected;
      console.log(this.histmasterSelected);
    }
    this.getCheckedItemhistList();
  }
  histisAllSelected() {
    this.histmasterSelected = this.showdatapart.every(function (item: any) {
      return item.isSelected == true;
    })
    this.getCheckedItemhistList();
  }

  getCheckedItemhistList() {
    this.histcheckedList = [];
    for (var i = 0; i < this.showdatapart.length; i++) {
      if (this.showdatapart[i].isSelected)
        this.histcheckedList.push(this.showdatapart[i].HIST_ID);
    }
 
    this.ybunch = this.histcheckedList.toString();
  
  }


 resetForm(form?: NgForm) {
   if (form)
  form.reset();
     this._tableservice.selectpsadk = {
              REF_KEY : "",
              USER_ID : "",
              USER_NAME : "",
              USER_ZONE : "",
              ROLE : "",
              ZONE_ID : "",
              MTXXX_TYPE : "",
              FIELD_LABEL : "",
              SCAN : "",
              TAG_A : "",
              TAG : "",
              HIST_ID : "",
              APPROVE_STATUS : "",
              CHANGE_TYPE : ""
 
   }
  }


  
  refreshEmployeeList() {
    this._tableservice.getassignaccesslist().subscribe((res) => {
      this.orig_value = res.result;
      this._page_authority = parseJSON(this.orig_value);
      console.log("arvind", this._page_authority);
      if (this._page_authority.paymentscreenadk.approval == false) {
        this.valuedelete = "1";
        this._isaccess = false;
        this.updatemark = "1";
      }
      if (this._page_authority.paymentscreenadk.approval == true) {
        this.valuedelete = "y";
        this._isaccess = true;
        this.updatemark = "y";
      }
      if(this._page_authority.paymentscreenadk.add == false)
      {
        this._InsertButtonAccess = false;
      }
      if(this._page_authority.paymentscreenadk.add == true)
      {
        this._InsertButtonAccess = true;
      }
      if(this._page_authority.paymentscreenadk.delete == false)
      {
        this._DeleteButtonAccess = false;
      }
      if(this._page_authority.paymentscreenadk.delete == true)
      {
        this._DeleteButtonAccess = true;
      }
      if(this._page_authority.paymentscreenadk.update == false)
      {
        this._updateButtonAccess = false;
      }
      if(this._page_authority.paymentscreenadk.update == true)
      {
        this._updateButtonAccess = true;
      }


    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');
     

      //throw error;   //You can also throw the error to a global error handler
    });
  }

  addform = () =>{
    this.toggle = !this.toggle;
    $("#addForm").toggle();
  }

  
 unseen()
 {
        this._tableservice.fetchpsadk().subscribe((res)=>{
        this.showdatapart = res.result;

        console.log("data" , this.showdatapart);
      },(error) => {                              //Error callback
        console.error('error caught in component')
        this.toastr.error(error, 'Neutral - Words');
       
  
        //throw error;   //You can also throw the error to a global error handler
      })
 }

  submitform(form: NgForm){

   
    if (form.value.REF_KEY == "") {
      this.toggle = !this.toggle;
      $("#addForm").toggle();
  this._tableservice.postpsadk(form.value).subscribe((res)=>{
    //  this.resetForm(form);
   this.refreshEmployeeList();
    this.toastr.success(res.message, 'Neutral Words');

  },(error) => {                              //Error callback
    console.error('error caught in component')
    this.toastr.error(error, 'Neutral - Words');
   

    //throw error;   //You can also throw the error to a global error handler
  });
}
else
{
  console.log(form.value);
this._tableservice.putpsadk(form.value).subscribe((res) => {
  this.toggle = !this.toggle;
  $("#addForm").toggle();
    // this.resetForm(form);
    this.refreshEmployeeList();
    this.toastr.info(res.message, 'Neutral Words');

  },(error) => {                              //Error callback
    console.error('error caught in component')
    this.toastr.error(error, 'Neutral - Words');
   

    //throw error;   //You can also throw the error to a global error handler
  });
}
}

postChangetype(change_type) {
  this._tableservice.psadk_Change_Type(change_type).subscribe((res) => {
    this.showdatapart = res.result;
    // this.unseen();
  },(error) => {                              //Error callback
    console.error('error caught in component')
    this.toastr.error(error, 'Neutral - Words');
   

    //throw error;   //You can also throw the error to a global error handler
  })
}



onEdit(psadk: Paymentscreenadk,bt:string) {
  this.btn_name = "Update";
  this._tableservice.selectpsadk = psadk;
  this.selectedpsadkRow = psadk;
}


deleteSelected(form: NgForm) {
  this.delete_toggle = !this.delete_toggle; 
    this._tableservice.deletepsadk(this.xbunch).subscribe((res) => {
      this.refreshEmployeeList();
      this.resetForm(form);
      this.toastr.warning(res.message, 'Payment Screen ADK');
    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');
     

      //throw error;   //You can also throw the error to a global error handler
    });

}

ChkdeleteSelected(status, form: NgForm) {
  var value1 = {"APPROVE_STATUS":status}
  this._tableservice.psadkapproved({...form.value,...value1}).subscribe((res) => {
    this.refreshEmployeeList();
    this.unseen();
    this.toastr.success(res.message, status);

  },(error) => {                              //Error callback
    console.error('error caught in component')
    this.toastr.error(error, 'Neutral - Words');
   

    //throw error;   //You can also throw the error to a global error handler
  });
}


}


