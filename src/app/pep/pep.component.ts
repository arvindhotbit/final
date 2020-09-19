import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormArray, FormControl, FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import { TableDataService } from '../shared/table-data.service';
import { AuthserviceService } from '../auth/authservice.service';
import { pepscheme } from '../shared/tabular';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { element } from 'protractor';
import { data, parseJSON } from 'jquery';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pep',
  templateUrl: './pep.component.html',
  styleUrls: ['./pep.component.css']
})
export class PepComponent implements OnInit {

  changetype: string;
  public pageSize: number = 10;
  public myData: string;
  public UserId: string;
  public UserName: string;
  selectedAllclone: any;
  public showdatapart: any = [];
  _InsertButtonAccess:boolean;
  _DeleteButtonAccess:boolean;
  _updateButtonAccess:boolean;
  p: number = 1;
  nsn = true;
  zoneid = true;
  SENSITIVEWORDS = true;
  sensitivefilters: string = "";
  zonefilters: string = "";
  IS_DELETE = false;
  IS_UPDATE = false;
  ref_keys = false;
  DELETE_FLG = false;
  selectedsensitiveRow: pepscheme;
  public selectedAll = "";
  public SelectedIDs: any = [];
  checkbox: boolean;
  filteredArray: any = [];
  is_edit: boolean = true;
  isButtonClass: boolean;
  valuedelete: string = "";
  _isaccess: boolean;
  updatemark: string;
  status_alph: string = "";
  flag: string = "";
  toggle = true;
  delete_toggle = true;
  clone: any;
  nsncol:boolean=true;
  zoneidcol:boolean=true;
  settingflagcol:boolean=true;
  valueflagcol:boolean=true;
  apstatus: string = "";
  btn_name: string = "Submit";
  isdelete_button: boolean = true;
  tbl_header: any = [];
  userzone: string;
  xbunch: string;
  ybunch: string;
  formact: string = "Add Record";
  masterSelected: string[];
  checkedList: any;
  histmasterSelected: string[];
  histcheckedList: any;
  _page_authority:any;
  orig_value:any;
  zonearray:any;
  zonevalue:string;
  constructor(public _tableservice: TableDataService, public _authservice: AuthserviceService, private toastr: ToastrService, private _location: Location) {
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


  refreshEmployeeList() {

    
 
    this._tableservice.getassignaccesslist().subscribe((res) => {
      this.orig_value = res.result;
      this._page_authority = JSON.parse(this.orig_value);
      console.log("arvind",this._page_authority);
      if(this._page_authority.pep.approval == false)
      {
      this.valuedelete = "1";
      this._isaccess = false;
      this.updatemark = "1";
      }
      if(this._page_authority.pep.approval == true)
      {
        this.valuedelete = "y";
        this._isaccess = true;
        this.updatemark = "y";
      }
      if(this._page_authority.pep.add == false)
      {
        this._InsertButtonAccess = false;
      }
      if(this._page_authority.pep.add == true)
      {
        this._InsertButtonAccess = true;
      }
      if(this._page_authority.pep.delete == false)
      {
        this._DeleteButtonAccess = false;
      }
      if(this._page_authority.pep.delete == true)
      {
        this._DeleteButtonAccess = true;
      }
      if(this._page_authority.pep.update == false)
      {
        this._updateButtonAccess = false;
      }
      if(this._page_authority.pep.update == true)
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
  this._tableservice.getpep().subscribe((res) => {
    this.showdatapart = res.result;

 
  })
}


updateform = () => {
  if (this._tableservice.selectpep.REF_KEY == "") {
    alert("Update item select this row");
  }
  else {
    this.toggle = !this.toggle;
    $("#updateform").toggle();
  
  }

}










  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this._tableservice.selectpep = {
      REF_KEY: "",
      ROLE: this.myData,
      USER_ID: this.UserId,
      USER_NAME: this.UserName,
      USER_ZONE: this.userzone,
      ZONE_ID: "",
      HIST_ID: "",
      APPROVE_STATUS: this.apstatus,
      CHANGE_TYPE: "",
      VALUE: ""

    }
  }





  UpdateSubmitForm(form: NgForm) {
    this.toggle = !this.toggle;
    $("#updateForm").toggle();
    this._tableservice.putpep(form.value).subscribe((res) => {
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
      this._tableservice.pep_Change_Type(zonetype).subscribe((res) => {
        this.showdatapart = res.result;
      }, (error) => {                              //Error callback
        console.error('error caught in component')
        this.toastr.error(error, 'Neutral - Words');
  
  
        //throw error;   //You can also throw the error to a global error handler
      });
    }

 



  onEdit(pep: pepscheme, bt: string) {
    this.btn_name = "Update";
    console.log('update' + pep.USER_NAME);
    this._tableservice.selectpep = pep;
    this.selectedsensitiveRow = pep;
  }



  ChkdeleteSelected(status, form: NgForm) {
    if (this.histmasterSelected.length <= 0) {
      alert("check Item Select This Row")
    }
    else {
      var value1 = { "APPROVE_STATUS": status, "HIST_ID": this.histmasterSelected.join(',') }
      this._tableservice.pepapproved({ ...form.value, ...value1 }).subscribe((res) => {
        this.histmasterSelected = [];
        this.toastr.success(res.message, status);

      }, (error) => {
        console.error('error caught in component')
        this.toastr.error(error, 'Sensitive Word');



      });

    }

  }



}
