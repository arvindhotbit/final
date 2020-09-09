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
  zone: string = "";
  noise: string = "";
  apstatus: string = "";
  btn_name: string = "Submit";
  isdelete_button: boolean = true;
  tbl_header: any = [];
  userzone: string;
  xbunch: string;
  ybunch: string;
  formact: string = "Add Record";
  masterSelected: boolean;
  checkedList: any;
  histmasterSelected: boolean;
  histcheckedList: any;
  _page_authority:any;
  orig_value:any;
  zonearray:any;
  zonevalue:string;
  constructor(public _tableservice: TableDataService, public _authservice: AuthserviceService, private toastr: ToastrService, private _location: Location) {
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


  refreshEmployeeList() {

    
 
    this._tableservice.getassignaccesslist().subscribe((res) => {
      this.orig_value = res.result;
      this._page_authority = parseJSON(this.orig_value);
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


  addform = () => {
    this.toggle = !this.toggle;
    $("#addForm").toggle();
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







  submitform(form: NgForm) {



    console.log(form.value);
    this._tableservice.putpep(form.value).subscribe((res) => {
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






  onEdit(pep: pepscheme, bt: string) {
    this.btn_name = "Update";
    console.log('update' + pep.USER_NAME);
    this._tableservice.selectpep = pep;
    this.selectedsensitiveRow = pep;
  }



  ChkdeleteSelected(status, form: NgForm) {
    var value1 = {"APPROVE_STATUS":status}
    this._tableservice.pepapproved({...form.value,...value1}).subscribe((res) => {
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
