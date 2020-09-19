 
import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormArray, FormControl,FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import {TableDataService} from '../../shared/table-data.service';
import {AuthserviceService} from '../../auth/authservice.service';
import {Interdefination,internalwatchlist} from '../../shared/tabular';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { data, parseJSON } from 'jquery';
import { Observable } from 'rxjs';
import {Location} from '@angular/common';
import * as $ from 'jquery';
@Component({
  selector: 'app-internallist-watchlist',
  templateUrl: './internallist-watchlist.component.html',
  styleUrls: ['./internallist-watchlist.component.css'],
  providers: [TableDataService]
})
export class InternallistWatchlistComponent implements OnInit {
  
  public pageSize: number = 10;
  public myData:string;
  public UserId:string;
  public UserName:string;
  selectedAllclone: any;
  _InsertButtonAccess:boolean;
  _DeleteButtonAccess:boolean;
  _updateButtonAccess:boolean;
  public showdatapart:any = [];
  p:number =1;
  nsncol:boolean=true;
  zoneidcol:boolean=true;
  customernameenglishcol:boolean=true;
  citycol:boolean=true;
  watchlistnamecol:boolean=true;
  watchlistidcol:boolean=true;
  zonefilters:string ="";
  IS_DELETE= false;
  IS_UPDATE= false;
  ref_keys= false;
  DELETE_FLG= false;
  selectedinternalistwatchlistRow : internalwatchlist;
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
  xbunch: string;
  ybunch: string;
  formact: string = "Add Record";
  masterSelected: string[];
  checkedList: any;
  histmasterSelected: string[];
  histcheckedList: any;
  changetype:string;
Userzone:string;
zonearray:any;
zonevalue:string;
_page_authority:any;
orig_value:any;
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
    this.getZonelist();
    this.zonevalue = this.userzone;
    this.onZoneChange(this.userzone);
    this.sendButtonClick();
    this.viewmessage();
  }

  sendButtonClick() {
    this._tableservice.sendMessage(null)
  }
 
  viewmessage()
  {
    
    this._tableservice.onNewMessage().subscribe(msg => {
    
      if(msg.reload == true)
      {
        this.onZoneChange(this.zonevalue);
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



  
  refreshEmployeeList() {
    this._tableservice.getassignaccesslist().subscribe((res) => {
      this.orig_value = res.result;
      this._page_authority = JSON.parse(this.orig_value);
     
      if(this._page_authority.internallistwatchlist.approval == false)
      {
      this.valuedelete = "1";
      this._isaccess = false;
      this.updatemark = "1";
      }
      if(this._page_authority.internallistwatchlist.approval == true)
      {
        this.valuedelete = "y";
        this._isaccess = true;
        this.updatemark = "y";
      }
      if(this._page_authority.internallistwatchlist.add == false)
      {
        this._InsertButtonAccess = false;
      }
      if(this._page_authority.internallistwatchlist.add == true)
      {
        this._InsertButtonAccess = true;
      }
      if(this._page_authority.internallistwatchlist.delete == false)
      {
        this._DeleteButtonAccess = false;
      }
      if(this._page_authority.internallistwatchlist.delete == true)
      {
        this._DeleteButtonAccess = true;
      }
      if(this._page_authority.internallistwatchlist.update == false)
      {
        this._updateButtonAccess = false;
      }
      if(this._page_authority.internallistwatchlist.update == true)
      {
        this._updateButtonAccess = true;
      }
    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');
     

      //throw error;   //You can also throw the error to a global error handler
    });
  }

  getZonelist()
  {
    this._tableservice.getassignzonelist().subscribe((res) => {
     this.zonearray = res.result.rows;
   
    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');
     

      //throw error;   //You can also throw the error to a global error handler
    })
  }
  unseen() {
    this._tableservice.getinterwatch().subscribe((res) => {
      this.showdatapart = res.result;
    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');
     

      //throw error;   //You can also throw the error to a global error handler
    });
  }
  onZoneChange(zonevalue:any){

    var obj = {  "ROLE" : this.myData,
    "USER_ZONE" : zonevalue,"USER_ID" : this.UserId,"CHANGE_TYPE":this.changetype};
    
        this._tableservice.get_ilw_changezonelist(obj).subscribe((res)=>{
          this.showdatapart = res.result;
     
      
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
        if (this._tableservice.selectedinterwatch.REF_KEY == "") {
          alert("Update item select this row");
        }
        else {
          this.toggle = !this.toggle;
          $("#updateform").toggle();
          $("#addForm").hide();
        }
    
      }
    
 
  


 resetForm(form?: NgForm) {
   if (form)
  form.reset();
     this._tableservice.selectedinterwatch = {
      REF_KEY:"",
      USER_ID : "",
      USER_NAME : "",
      USER_ZONE :"",
      ROLE : "",
      UID_SERIAL_NO: "",
      ZONE_ID : "",
      WATCHLIST_ID : "",
      WATCHLIST_NAME : "",
      CUSTOMER_NAME_ENGLISH : "",
      CUSTOMER_NAME_ARABIC :"",
      CUSTOMER_TYPE:"",
      CITY :"",
      CUSTOMER_ACCOUNT : "",
      DOB : "",
      RESIDENCE_COUNTRY :"",
      RESIDENCE_COUNTRY_FLAG: "",
      NATIONALITY :"",
      ID_NUMBER: "",
      ID_TYPE :"",
      KNOWN_AS_NAME_ENGLISH : "",
      KNOWN_AS_NAME_ARABIC :"",
      MOTHER_NAME : "",
      ADDRESS: "",
      REMARKS:"",
      CIN :"",
      NEW_PAN :"",
      SOURCE: "",
      CUSTOMER_STATUS : "",
      BRANCH : "",
      CUSTOMER_RISK_LEVEL : "",
      CUSTOMER_CREATE_DATE: "",
      CUST_RISK_LEVEL_UPDATE_DATE : "",
      POLITICALLY_EXPOSED:"",
      DETAILS_PROGRAMS: "",
      OTHERS_REMARKS : "",
      OTHERS_DATA_SOURCES : "",
      OTHERS_RELATED_TO : "",
      HIST_ID : "",
      APPROVE_STATUS :  "",
      CHANGE_TYPE : "",
 
   }
  }

  
 



  submitform(form: NgForm){

   
  
  
      $("#addForm").toggle();
  this._tableservice.postinterwatch(form.value).subscribe((res)=>{
 
    this.toastr.success(res.message, 'Internal Watchlist');

  },(error) => {                              //Error callback
    console.error('error caught in component')
    this.toastr.error(error, 'Internal Watchlist');
   

    //throw error;   //You can also throw the error to a global error handler
  });

}

UpdateSubmitForm(form: NgForm) {
  this.toggle = !this.toggle;
  $("#updateform").toggle();
  this._tableservice.putinterwatch(form.value).subscribe((res) => {
    this.masterSelected = [];
    this.toastr.info(res.message, 'Sensitive Words');
   
  }, (error) => {                              //Error callback
    console.error('error caught in component')
    this.toastr.error(error, 'Sensitive Word');


    //throw error;   //You can also throw the error to a global error handler
  });

}




postChangetype(change_type) {
  if(this.zonevalue == null)
  {
    alert("Please Select a Zone");
  }
  else
  {
    const zonetype = { "CHANGE_TYPE": change_type,"USER_ZONE": this.zonevalue,"ROLE":this.myData,"USER_ID":this.UserId };
    this._tableservice.iwl_Change_Type(zonetype).subscribe((res) => {
      this.showdatapart = res.result;
    }, (error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');


      //throw error;   //You can also throw the error to a global error handler
    });
  }

}

onEdit(interwatch: internalwatchlist,bt:string) {
  this.btn_name = "Update";
  this._tableservice.selectedinterwatch = interwatch;
  this.selectedinternalistwatchlistRow = interwatch;
}






deleteSelected(form: NgForm) {
  if (this.masterSelected.length <= 0) {
    alert("Delete Item Select This Row")
  }
  else {
    this._tableservice.deleteinterwatch(this.masterSelected.join(',')).subscribe((res) => {
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
    this._tableservice.interwatchapproved({ ...form.value, ...value1 }).subscribe((res) => {
      this.histmasterSelected = [];
      this.toastr.success(res.message, status);

    }, (error) => {
      console.error('error caught in component')
      this.toastr.error(error, 'Sensitive Word');



    });

  }

}

}

  
  
  


   


  
 

