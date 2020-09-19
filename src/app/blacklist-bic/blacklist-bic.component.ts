
import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormArray, FormControl,FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import {TableDataService} from '../shared/table-data.service';
import {AuthserviceService} from '../auth/authservice.service';
import {Bicscheme} from '../shared/tabular';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { data, parseJSON } from 'jquery';
import { Observable } from 'rxjs';
import {Location} from '@angular/common';
import * as $ from 'jquery';
@Component({
  selector: 'app-blacklist-bic',
  templateUrl: './blacklist-bic.component.html',
  styleUrls: ['./blacklist-bic.component.css'],
  providers: [TableDataService]
})
export class BlacklistBicComponent implements OnInit {
  
  public pageSize: number = 10;
  public myData:string;
  public UserId:string;
  public UserName:string;
  selectedAllclone: any;
  public showdatapart:any = [];
  p:number =1;

  zonefilters:string ="";
  IS_DELETE= false;
  IS_UPDATE= false;
  ref_keys= false;
  DELETE_FLG= false;
  _InsertButtonAccess:boolean;
  _DeleteButtonAccess:boolean;
  _updateButtonAccess:boolean;
  selectedbicRow : Bicscheme;
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
  nsn:boolean = true;
  zoneidcol:boolean = true;
  biccol:boolean = true;
  bic8col:boolean = true;
  citycol:boolean = true;
  countrycol:boolean = true;
  watchlistnamecol:boolean = true;
  watchlisttypecol:boolean = true;
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
  a:string;
b:string;
c:string;
d:string;
e:string;
f:string;
g:string;
changetype:string;
zonevalue:string;
zonearray:any;
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
 
 
  


 resetForm(form?: NgForm) {
   if (form)
  form.reset();
     this._tableservice.selectedbic = {
        REF_KEY : "",
        USER_ID : "",
        USER_NAME : "",
        USER_ZONE : "",
        ROLE : "",
        ZONE_ID : "",
        BIC : "",
        INSTITUTION_NAME : "",
        CITY : "",
        COUNTRY : "",
        BIC8 : "",
        WATCHLIST_NAME: "",
        WATCHLIST_TYPE: "",
        HIST_ID : "",
        APPROVE_STATUS : "",
        CHANGE_TYPE : ""
 
   }
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
 
      if(this._page_authority.blacklisted.approval == false)
      {
      this.valuedelete = "1";
      this._isaccess = false;
      this.updatemark = "1";
      }
      if(this._page_authority.blacklisted.approval == true)
      {
        this.valuedelete = "y";
        this._isaccess = true;
        this.updatemark = "y";
      }
      if(this._page_authority.blacklisted.add == false)
      {
        this._InsertButtonAccess = false;
      }
      if(this._page_authority.blacklisted.add == true)
      {
        this._InsertButtonAccess = true;
      }
      if(this._page_authority.blacklisted.delete == false)
      {
        this._DeleteButtonAccess = false;
      }
      if(this._page_authority.blacklisted.delete == true)
      {
        this._DeleteButtonAccess = true;
      }
      if(this._page_authority.blacklisted.update == false)
      {
        this._updateButtonAccess = false;
      }
      if(this._page_authority.blacklisted.update == true)
      {
        this._updateButtonAccess = true;
      }

    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');
     

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
    this._tableservice.biclistpagetype(zonetype).subscribe((res) => {
      this.showdatapart = res.result;
    }, (error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Blacklisted Bic');


      //throw error;   //You can also throw the error to a global error handler
    });
  }

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
 
  onZoneChange(zonevalue){

    var obj = {  "ROLE" : this.myData,
    "USER_ZONE" : zonevalue,"USER_ID" : this.UserId,"CHANGE_TYPE":this.changetype};
    
        this._tableservice.getchangezonelistblacklist(obj).subscribe((res)=>{
          this.showdatapart = res.result || [];
       
      
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
        if (this._tableservice.selectedbic.REF_KEY == "") {
          alert("Update item select this row");
        }
        else {
          this.toggle = !this.toggle;
          $("#updateform").toggle();
          $("#addForm").hide();
        }
    
      }

  unseen() {
    this._tableservice.getbic().subscribe((res) => {
      this.showdatapart = res.result;
    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');
     

      //throw error;   //You can also throw the error to a global error handler
    });
  }

  submitform(form: NgForm){
    $("#addForm").toggle();
  this._tableservice.postbic(form.value).subscribe((res)=>{
    this.toastr.success(res.message, 'Neutral Words');

  },(error) => {                              //Error callback
    console.error('error caught in component')
    this.toastr.error(error, 'Neutral - Words');
   

    //throw error;   //You can also throw the error to a global error handler
  });





}


updatesubmitform(form: NgForm) {

      $("#updateform").toggle();
  this._tableservice.putbic(form.value).subscribe((res) => {
    this.masterSelected = [];
      this.toastr.info(res.message, 'Blacklisted List');
  
    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Blacklisted - List');
     
  
      //throw error;   //You can also throw the error to a global error handler
    });

}


onEdit(bic: Bicscheme,bt:string) {
  this.btn_name = "Update";
  console.log('update'+ bic.USER_NAME);
  this._tableservice.selectedbic = bic;
  this.selectedbicRow = bic;
}





deleteSelected(form: NgForm) {

  if (this._tableservice.selectedbic.REF_KEY == "") {
    alert("Delete Item Select This Row")
  }
  else {
    this.delete_toggle = !this.delete_toggle;
    this._tableservice.deletebic(this.masterSelected.join(',')).subscribe((res) => {
      this.masterSelected = [];
      this.toastr.warning(res.message, 'Neutral Words');
    }, (error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');


      //throw error;   //You can also throw the error to a global error handler
    });
  }


}

ChkdeleteSelected(status, form: NgForm) {


   
  var value1 = { "APPROVE_STATUS": status, "HIST_ID": this.histmasterSelected.join(',') }
    this._tableservice.bicapproved({ ...form.value, ...value1 }).subscribe((res) => {
      this.histmasterSelected = [];
      this.toastr.success(res.message, status);
     
    }, (error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error.statusTexterror.status, 'Blacklisted - Bic')


      //throw error;   //You can also throw the error to a global error handler
    });
  
}

}
