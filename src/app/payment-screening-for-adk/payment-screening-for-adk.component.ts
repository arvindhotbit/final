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
  nsncol:boolean = true;
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
  masterSelected:  string[];
  checkedList: any;
  histmasterSelected:  string[];
  histcheckedList: any;
  _page_authority: any;
  orig_value: any;
  mtx:string;fieldlabelterm:string;scan:string;tag:string;taga:string;oldmtx:string;oldfldl:string;scanold:string;tagold:string;tagaold:string;changetype:string;
  constructor(public _tableservice:TableDataService,public _authservice:AuthserviceService, private toastr: ToastrService,private _location: Location) {
    this.masterSelected = [];
    this.histmasterSelected = [];
    this.myData = localStorage.getItem('Role');
    this.UserId = localStorage.getItem('Id');
    this.UserName = localStorage.getItem('Username');
    this.userzone = localStorage.getItem('UserZone');
 
     }

  ngOnInit(): void {
    
    this.resetForm();
    this.refreshEmployeeList();
    this.unseen();
    this.sendButtonClick();
    this.viewmessage();
  }

  sendButtonClick() {
    this._tableservice.sendMessage(null)
  }
 
  viewmessage()
  {
    
    this._tableservice.onNewMessage().subscribe(msg => {
      console.log('got a msg: ' , msg.reload);
      if(msg.reload == true)
      {
        this.unseen();
      }
      else
      {
        console.log("don't call");
      }
    });
  }



  isItemChecked(id) {
    return this.masterSelected.includes(id)
  }


  checkUncheckAll() {
    if (this.masterSelected.length == this.showdatapart.length) {
      this.masterSelected = []
    } else {
      this.masterSelected = this.showdatapart.map(sdp => sdp.REF_KEY)
    }

  }
  isAllSelected(id) {
    if (this.masterSelected.includes(id)) {
      this.masterSelected = [...this.masterSelected].filter(ms => ms != id)
    } else {
      this.masterSelected = [...this.masterSelected, id]
    }

  }


  ishistItemChecked(id) {
    return this.histmasterSelected.includes(id)
  }


  histcheckUncheckAll() {
    if (this.histmasterSelected.length == this.showdatapart.length) {
      this.histmasterSelected = []
    } else {
      this.histmasterSelected = this.showdatapart.map(sdp => sdp.HIST_ID)
    }

  }
  histisAllSelected(id) {
    if (this.histmasterSelected.includes(id)) {
      this.histmasterSelected = [...this.histmasterSelected].filter(ms => ms != id)
    } else {
      this.histmasterSelected = [...this.histmasterSelected, id]
    }

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
      this._page_authority = JSON.parse(this.orig_value);
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

  addform = () => {
    this.toggle = !this.toggle;
    $("#addForm").toggle();
    $("#updateform").hide();
  }
  updateform = () => {
    if (this._tableservice.selectpsadk.REF_KEY == "") {
      alert("Update item select this row");
    }
    else {
      this.toggle = !this.toggle;
      $("#updateform").toggle();
      $("#addForm").hide();
    }

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

   
 
      this.toggle = !this.toggle;
      $("#addForm").toggle();
  this._tableservice.postpsadk(form.value).subscribe((res)=>{

    this.toastr.success(res.message, 'Neutral Words');

  },(error) => {                              //Error callback
    console.error('error caught in component')
    this.toastr.error(error, 'Neutral - Words');
   

    //throw error;   //You can also throw the error to a global error handler
  });

 

}


UpdateSubmitForm(form: NgForm) {
  this.toggle = !this.toggle;
  $("#updateForm").toggle();
  this._tableservice.putpsadk(form.value).subscribe((res) => {
    this.masterSelected = [];
    this.toastr.info(res.message, 'Sensitive Words');
   
  }, (error) => {                              //Error callback
    console.error('error caught in component')
    this.toastr.error(error, 'Sensitive Word');


    //throw error;   //You can also throw the error to a global error handler
  });

}


postChangetype(change_type) {
  const zonetype = { "CHANGE_TYPE": change_type,"USER_ZONE": this.userzone,"ROLE":this.myData,"USER_ID":this.UserId };
  this._tableservice.psadk_Change_Type(zonetype).subscribe((res) => {
    this.showdatapart = res.result;
    // this.unseen();
  },(error) => {                              //Error callback
    console.error('error caught in component')
    this.toastr.error(error, 'Payment Screen Adk');
   

    //throw error;   //You can also throw the error to a global error handler
  })
}



onEdit(psadk: Paymentscreenadk) {
  this.btn_name = "Update";
  this._tableservice.selectpsadk = psadk;
  this.selectedpsadkRow = psadk;
}


deleteSelected(form: NgForm) {
  if (this.masterSelected.length <= 0) {
    alert("Delete Item Select This Row")
  }
  else {
    this._tableservice.deletepsadk(this.masterSelected.join(',')).subscribe((res) => {
      this.toastr.warning(res.message, 'Sensitive Word');
      this.masterSelected = [];
    }, (error) => {
      console.error('error caught in component')
      this.toastr.error(error, 'Sensitive Word');



    });

  }


}

ChkdeleteSelected(status, form: NgForm) {
  if (this.histmasterSelected.length <= 0) {
    alert("check Item Select This Row")
  }
  else {
    var value1 = { "APPROVE_STATUS": status, "HIST_ID": this.histmasterSelected.join(',') }
    this._tableservice.psadkapproved({ ...form.value, ...value1 }).subscribe((res) => {
      this.histmasterSelected = [];
      this.toastr.success(res.message, status);

    }, (error) => {
      console.error('error caught in component')
      this.toastr.error(error, 'Sensitive Word');



    });

  }

}

}


