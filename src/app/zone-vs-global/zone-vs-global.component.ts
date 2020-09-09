import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TableDataService } from '../shared/table-data.service';
import { AuthserviceService } from '../auth/authservice.service';
import { Zonevsglobal } from '../shared/tabular';
import { data, parseJSON } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { Location } from '@angular/common';
@Component({
  selector: 'app-zone-vs-global',
  templateUrl: './zone-vs-global.component.html',
  styleUrls: ['./zone-vs-global.component.css']
})
export class ZoneVsGlobalComponent implements OnInit {
  public showzvg: any = [];
  public pageSize: number = 10;
  public myData: string;
  public UserId: string;
  public UserName: string;
  selectedAll: any;
  _InsertButtonAccess:boolean;
  _DeleteButtonAccess:boolean;
  _updateButtonAccess:boolean;
  listtitle: string = "Zone Vs Global Keywords";
  p: number = 1;
  showhidepregnant: boolean = false;
  _isaccess: boolean;
  updatemark: string;
  thead = ["Serial No.", "PROGRAM_KEYWORD", "PROGRAM_KEYWORD_DESC"];
  SERIAL = true;
  PROGRAMKEYWORD = true;
  PROGRAMKEYWORDDESC = true;
  PAYSYSID = false;
  SCOPES = false;
  ZONEID = true;
  pkey: string = "";
  pkeyw: string = "";
  changetype: string = "";
  oldpkey: string = "";
  oldpkeyword: string = "";
  selectedZoneRow: Zonevsglobal;
  public SelectedIDs: any = [];
  apstatus: string = "";
  btn_name: string = "Submit";
  isdelete_button: boolean = true;
  valuedelete: string = "";
  _isaccesszvg: boolean;
  toggle = true;
  delete_toggle = true;
  xbunch: string;
  ybunch: string;
  formact: string = "Add Record";
  masterSelected: boolean;
  checkedList: any;
  histmasterSelected: boolean;
  histcheckedList: any;
  zonearray: string;
  zonevalue: string;
  _page_authority: any;
  orig_value: any;
  constructor(public _tableservice: TableDataService, public _authservice: AuthserviceService, private toastr: ToastrService, private _location: Location) {

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
    for (var i = 0; i < this.showzvg.length; i++) {
      this.showzvg[i].isSelected = this.masterSelected;
      console.log("master", this.masterSelected);
    }
    this.getCheckedItemList();
  }
  isAllSelected() {
    this.masterSelected = this.showzvg.every(function (item: any) {
      return item.isSelected == true;
    })
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.showzvg.length; i++) {
      if (this.showzvg[i].isSelected)
        this.checkedList.push(this.showzvg[i].REF_KEY);
    }
    // this.checkedList = JSON.stringify(this.checkedList);
    this.xbunch = this.checkedList.toString();
    this.isdelete_button = false;
  }





  histcheckUncheckAll() {
    for (var i = 0; i < this.showzvg.length; i++) {
      this.showzvg[i].isSelected = this.histmasterSelected;
      console.log(this.histmasterSelected);
    }
    this.getCheckedItemhistList();
  }
  histisAllSelected() {
    this.histmasterSelected = this.showzvg.every(function (item: any) {
      return item.isSelected == true;
    })
    this.getCheckedItemhistList();
  }

  getCheckedItemhistList() {
    this.histcheckedList = [];
    for (var i = 0; i < this.showzvg.length; i++) {
      if (this.showzvg[i].isSelected)
        this.histcheckedList.push(this.showzvg[i].HIST_ID);
    }
    // this.checkedList = JSON.stringify(this.checkedList);
    this.ybunch = this.histcheckedList.toString();
    console.log(this.ybunch);
  }

  getZonelist() {
    this._tableservice.getassignzonelist().subscribe((res) => {
      this.zonearray = res.result.rows;
      console.log(this.zonearray);
    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');
     

      //throw error;   //You can also throw the error to a global error handler
    })
  }

  onZoneChange(zonevalue: any) {

    var obj = {
      "ROLE": this.myData,
      "USER_ZONE": this.zonevalue, "USER_ID": this.UserId, "CHANGE_TYPE": this.changetype
    };

    this._tableservice.getchangezonebiclist(obj).subscribe((res) => {
      this.showzvg = res.result;
      this.toastr.success(res.message, 'zonelist');

    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');
     

      //throw error;   //You can also throw the error to a global error handler
    });

  }

  addform = () => {
    this.toggle = !this.toggle;
    $("#addzoneform").toggle();
  }



  resetForm(formdata?: NgForm) {
    if (formdata)
      formdata.reset();
    this._tableservice.selectedzvg = {
      ZONE_ID: "",
      PROGRAM_KEYWORD: "",
      PROGRAM_KEYWORD_DESC: "",
      REF_KEY: "",
      PAYSYS_ID: "",
      SCOPE: "",
      ROLE: this.myData,
      USER_ID: this.UserId,
      USER_NAME: this.UserName,
      USER_ZONE: "QA",
      HIST_ID: this.ybunch,
      APPROVE_STATUS: this.apstatus,
      CHANGE_TYPE: ""
    }
  }
  submitform(formdata: NgForm) {

    if (formdata.value.REF_KEY == "") {
      this.toggle = !this.toggle;
      $("#addzoneform").toggle();

      this._tableservice.postzvg(formdata.value).subscribe((res) => {
        console.log(formdata.value);
        // this.resetForm(formdata);
        this.refreshEmployeeList();
        this.toastr.success(res.message, 'Zone Vs Global Words');

      },(error) => {                              //Error callback
        console.error('error caught in component')
        this.toastr.error(error, 'Neutral - Words');
       
  
        //throw error;   //You can also throw the error to a global error handler
      });
    }

    else {
      this.toggle = !this.toggle;
      $("#addzoneform").toggle();
      this._tableservice.putzvg(formdata.value).subscribe((res) => {
        // this.resetForm(formdata);
        this.refreshEmployeeList();
        this.unseen();
        this.toastr.info(res.message, 'Zone Vs Global Words');
      },(error) => {                              //Error callback
        console.error('error caught in component')
        this.toastr.error(error, 'Neutral - Words');
       
  
        //throw error;   //You can also throw the error to a global error handler
      });

    }
  }
 
  unseen()
  {
    this._tableservice.fetchzvg().subscribe((res)=>{
            this.showzvg = res.result;
    });
  }
  
  refreshEmployeeList() {
    this._tableservice.getassignaccesslist().subscribe((res) => {
      this.orig_value = res.result;
      this._page_authority = parseJSON(this.orig_value);
      console.log("arvind", this._page_authority);
      if (this._page_authority.zonevsglobal.approval == false) {
        this.valuedelete = "1";
        this._isaccess = false;
        this.updatemark = "1";
      }
      if (this._page_authority.zonevsglobal.approval == true) {
        this.valuedelete = "y";
        this._isaccess = true;
        this.updatemark = "y";
      }
      if(this._page_authority.zonevsglobal.add == false)
          {
            this._InsertButtonAccess = false;
          }
          if(this._page_authority.zonevsglobal.add == true)
          {
            this._InsertButtonAccess = true;
          }
          if(this._page_authority.zonevsglobal.delete == false)
          {
            this._DeleteButtonAccess = false;
          }
          if(this._page_authority.zonevsglobal.delete == true)
          {
            this._DeleteButtonAccess = true;
          }
          if(this._page_authority.zonevsglobal.update == false)
          {
            this._updateButtonAccess = false;
          }
          if(this._page_authority.zonevsglobal.update == true)
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
    this._tableservice.zvg_Change_Type(change_type).subscribe((res) => {
      this.showzvg = res.result;
    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');
     

      //throw error;   //You can also throw the error to a global error handler
    })
  }

  onEdit(zvg: Zonevsglobal) {

    this._tableservice.selectedzvg = zvg;
    this.selectedZoneRow = zvg;


  }
  deleteSelected(form: NgForm) {
    this.delete_toggle = !this.delete_toggle;
    this._tableservice.deletezvg(this.xbunch).subscribe((res) => {
      this.refreshEmployeeList();
      this.unseen();
      this.resetForm(form);
      this.toastr.warning(res.message, 'NAME SCREEN');
    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');
     

      //throw error;   //You can also throw the error to a global error handler
    });

  }
 


  ChkdeleteSelected(status, form: NgForm) {
    var value1 = {"APPROVE_STATUS":status}
    this._tableservice.zvgapproved({...form.value,...value1}).subscribe((res) => {
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



