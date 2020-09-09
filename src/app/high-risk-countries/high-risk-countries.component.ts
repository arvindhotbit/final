
import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormArray, FormControl,FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import {TableDataService} from '../shared/table-data.service';
import {AuthserviceService} from '../auth/authservice.service';
import {Highriskcountry} from '../shared/tabular';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { data, parseJSON } from 'jquery';
import { Observable } from 'rxjs';
import {Location} from '@angular/common';
import * as $ from 'jquery';
@Component({
  selector: 'app-high-risk-countries',
  templateUrl: './high-risk-countries.component.html',
  styleUrls: ['./high-risk-countries.component.css'],
  providers: [TableDataService]
})
export class HighRiskCountriesComponent implements OnInit {
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
  selectedhrcRow : Highriskcountry;
  _InsertButtonAccess:boolean;
  _DeleteButtonAccess:boolean;
  _updateButtonAccess:boolean;
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
  masterSelected: boolean;
  checkedList: any;
  histmasterSelected: boolean;
  histcheckedList: any;
  a:string;
b:string;
c:string;
d:string;
e:string;
f:string;
g:string;
h:string;
changetype:string;
Userzone:string;
zonearray:any;
zonevalue:string;
_page_authority:any;
orig_value:any;
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
    this.getZonelist(); 
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
        this.checkedList.push(this.showdatapart[i]);
    }
    // this.checkedList = JSON.stringify(this.checkedList);
    this.checkedList.forEach(element => {
      this.SelectedIDs.push(element.REF_KEY);
      this.xbunch = this.SelectedIDs.toString();
      this.isdelete_button = false;
      this.formact = "Update Record";
      console.log("add" + this.SelectedIDs, this.SelectedIDs.length);
    });
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
        this.histcheckedList.push(this.showdatapart[i]);
    }
    // this.checkedList = JSON.stringify(this.checkedList);
    this.histcheckedList.forEach(element => {
      this.SelectedIDs.push(element.HIST_ID);
      this.ybunch = this.SelectedIDs.toString();
      console.log("add" + this.SelectedIDs, this.SelectedIDs.length);
    });
  }




  getZonelist()
  {
    this._tableservice.getassignzonelist().subscribe((res) => {
     this.zonearray = res.result.rows;
     console.log(this.zonearray);
    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');
     

      //throw error;   //You can also throw the error to a global error handler
    })
  }

  onZoneChange(zonevalue:any){

    var obj = {  "ROLE" : this.myData,
    "USER_ZONE" : this.zonevalue,"USER_ID" : this.UserId,"CHANGE_TYPE":this.changetype};
    
        this._tableservice.get_hrc_changezonelist(obj).subscribe((res)=>{
          this.showdatapart = res.result;
          this.toastr.success(res.message, 'zonelist');
      
        },(error) => {                              //Error callback
          console.error('error caught in component')
          this.toastr.error(error, 'Neutral - Words');
         
    
          //throw error;   //You can also throw the error to a global error handler
        });
    
      }
      resetForm(form?: NgForm) {
        if (form)
       form.reset();
          this._tableservice.selectedhrc = {
                   REF_KEY : "",
                   USER_ID : "",
                   USER_NAME : "",
                   USER_ZONE : "",
                   ROLE : "",
                   ZONE_ID : "",
                   COUNTRY_CODE : "",
                   COUNTRY_NAME : "",
                   RISK_LEVEL : "",
                   SANCTIONED_FLAG : "",
                   INITIAL_LOAD_FLAG : "",
                   WATCHLIST_NAME : "",
                   WATCHLIST_TYPE : "",
                   HIST_ID : "",
                   APPROVE_STATUS : "",
                   CHANGE_TYPE : ""
      
        }
       }
  
  refreshEmployeeList() {
    this._tableservice.getassignaccesslist().subscribe((res) => {
      this.orig_value = res.result;
      this._page_authority = parseJSON(this.orig_value);
      console.log("arvind",this._page_authority);
      if(this._page_authority.highriskcountry.approval == false)
      {
      this.valuedelete = "1";
      this._isaccess = false;
      this.updatemark = "1";
      }
      if(this._page_authority.highriskcountry.approval == true)
      {
        this.valuedelete = "y";
        this._isaccess = true;
        this.updatemark = "y";
      }
      if(this._page_authority.highriskcountry.add == false)
      {
        this._InsertButtonAccess = false;
      }
      if(this._page_authority.highriskcountry.add == true)
      {
        this._InsertButtonAccess = true;
      }
      if(this._page_authority.highriskcountry.delete == false)
      {
        this._DeleteButtonAccess = false;
      }
      if(this._page_authority.highriskcountry.delete == true)
      {
        this._DeleteButtonAccess = true;
      }
      if(this._page_authority.highriskcountry.update == false)
      {
        this._updateButtonAccess = false;
      }
      if(this._page_authority.highriskcountry.update == true)
      {
        this._updateButtonAccess = true;
      }


    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');
     

      //throw error;   //You can also throw the error to a global error handler
    });
}

unseen()
{
  this._tableservice.fetchhrc().subscribe((res)=>{
          this.showdatapart = res.result;
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

  
  postChangetype(change_type) {
    this._tableservice.hrclistpagetype(change_type).subscribe((res) => {
      this.showdatapart = res.result;
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
  this._tableservice.posthrc(form.value).subscribe((res)=>{
    //  this.resetForm(form);
   this.refreshEmployeeList();
   this.unseen();
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
this._tableservice.puthrc(form.value).subscribe((res) => {
  this.toggle = !this.toggle;
  $("#addForm").toggle();
    // this.resetForm(form);
    this.refreshEmployeeList();
    this.unseen();
    this.toastr.info(res.message, 'Neutral Words');

  },(error) => {                              //Error callback
    console.error('error caught in component')
    this.toastr.error(error, 'Neutral - Words');
   

    //throw error;   //You can also throw the error to a global error handler
  });
}
}





onEdit(hrc: Highriskcountry,bt:string) {
  this.btn_name = "Update";
  this._tableservice.selectedhrc = hrc;
  this.selectedhrcRow = hrc;
}


deleteSelected(form: NgForm) {
  this.delete_toggle = !this.delete_toggle; 
    this._tableservice.deletehrc(this.xbunch).subscribe((res) => {
      this.refreshEmployeeList();
      this.unseen();
      this.resetForm(form);
      this.toastr.warning(res.message, 'High Risk Country');
    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');
     

      //throw error;   //You can also throw the error to a global error handler
    });

}



ChkdeleteSelected(status, form: NgForm) {
  var value1 = {"APPROVE_STATUS":status}
  this._tableservice.hrcapproved({...form.value,...value1}).subscribe((res) => {
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
