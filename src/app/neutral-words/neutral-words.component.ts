import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormArray, FormControl, FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import { TableDataService } from '../shared/table-data.service';
import { AuthserviceService } from '../auth/authservice.service';
import { Neutralscheme } from '../shared/tabular';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { element } from 'protractor';
import { data, parseJSON } from 'jquery';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-neutral-words',
  templateUrl: './neutral-words.component.html',
  styleUrls: ['./neutral-words.component.css'],
})


export class NeutralWordsComponent implements OnInit {
  msgInput: string = 'QA';
  public pageSize: number = 10;
  public myData: string;
  public UserId: string;
  public UserName: string;
  selectedAllclone: any;
  public showdata: any = [];
  p: number = 1;
  count: Number = 20;
  nsn = true;
  zoneid = true;
  noiseword = true;
  IS_DELETE = false;
  IS_UPDATE = false;
  ref_keys = false;
  DELETE_FLG = false;
  selectedNeutralRow: Neutralscheme;
  public selectedAll = "";
  public SelectedIDs: any = [];
  public SelectedhistIDs: any = [];
  checkbox: boolean;
  filteredArray: any = [];
  is_edit: boolean = true;
  isButtonClass: boolean;
  valuedelete: string = "";
  _isaccess: boolean;
  _InsertButtonAccess: boolean;
  _DeleteButtonAccess: boolean;
  _updateButtonAccess: boolean;
  updatemark: string;
  status_alph: string = "";
  flag: string = "";
  toggle = true;
  delete_toggle = true;
  clone: any;
  zone: string = "";
  noise: string = "";
  oldzone: string = "";
  oldnoise: string = "";
  changetype: string = "";
  apstatus: string = "";
  btn_name: string = "Submit";
  isdelete_button: boolean = true;
  tbl_header: any = [];
  zoneidcol: boolean = true;
  noisewordcol: boolean = true;
  oldzoneidcol: boolean = true;
  oldnoisewordcol: boolean = true;
  changetypecol: boolean = true;
  xbunch: string;
  ybunch: string;
  formact: string = "Add Record";
  masterSelected: boolean;
  checkedList: any;
  histmasterSelected: boolean;
  histcheckedList: any;
  Userzone: string;
  zonearray: any;
  zonevalue: string;
  _page_authority: any;
  orig_value: any;
 
  constructor(public _tableservice: TableDataService, public _authservice: AuthserviceService, private toastr: ToastrService, private _location: Location) {
    this.masterSelected = false;
    this.histmasterSelected = false;
    this.myData = localStorage.getItem('Role');
    this.UserId = localStorage.getItem('Id');
    this.UserName = localStorage.getItem('Username');
    this.Userzone = localStorage.getItem('UserZone');
    this.getCheckedItemList();
    this.getCheckedItemhistList();
    this.sendButtonClick();
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
    this._tableservice.sendMessage(this.msgInput)
  }
 
  viewmessage()
  {
    
    this._tableservice.onNewMessage().subscribe(msg => {
      console.log('got a msg: ' , msg.result);
    });
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this._tableservice.selectedneu = {
      REF_KEY: "",
      ROLE: this.myData,
      USER_ID: this.UserId,
      USER_NAME: this.UserName,
      USER_ZONE: "QA",
      NOISE_WORD: "",
      ZONE_ID: "",
      HIST_ID: this.ybunch,
      APPROVE_STATUS: this.apstatus,
      CHANGE_TYPE: ""

    }
  }

  checkUncheckAll() {
    for (var i = 0; i < this.showdata.length; i++) {
      this.showdata[i].isSelected = this.masterSelected;
      console.log("master", this.masterSelected);
    }
    this.getCheckedItemList();
  }
  isAllSelected() {
    this.masterSelected = this.showdata.every(function (item: any) {
      return item.isSelected == true;
    })
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.showdata.length; i++) {
      if (this.showdata[i].isSelected)
        this.checkedList.push(this.showdata[i].REF_KEY);
    }


    this.xbunch = this.checkedList.toString();
    this.isdelete_button = false;
  }


  histcheckUncheckAll() {
    for (var i = 0; i < this.showdata.length; i++) {
      this.showdata[i].isSelected = this.histmasterSelected;
      console.log(this.histmasterSelected);
    }
    this.getCheckedItemhistList();
  }
  histisAllSelected() {
    this.histmasterSelected = this.showdata.every(function (item: any) {
      return item.isSelected == true;
    })
    this.getCheckedItemhistList();
  }

  getCheckedItemhistList() {
    this.histcheckedList = [];
    for (var i = 0; i < this.showdata.length; i++) {
      if (this.showdata[i].isSelected)
        this.histcheckedList.push(this.showdata[i].HIST_ID);
    }
    this.ybunch = this.histcheckedList.toString();
  }


  refreshEmployeeList() {
    this._tableservice.getassignaccesslist().subscribe((res) => {
      this.orig_value = res.result;
      this._page_authority = parseJSON(this.orig_value);

      if (this._page_authority.neutral_words.approval == false) {
        this.valuedelete = "1";
        this._isaccess = false;
        this.updatemark = "1";
      }
      if (this._page_authority.neutral_words.approval == true) {
        this.valuedelete = "y";
        this._isaccess = true;
        this.updatemark = "y";
      }
      if (this._page_authority.neutral_words.add == false) {
        this._InsertButtonAccess = false;
      }
      if (this._page_authority.neutral_words.add == true) {
        this._InsertButtonAccess = true;
      }
      if (this._page_authority.neutral_words.delete == false) {
        this._DeleteButtonAccess = false;
      }
      if (this._page_authority.neutral_words.delete == true) {
        this._DeleteButtonAccess = true;
      }
      if (this._page_authority.neutral_words.update == false) {
        this._updateButtonAccess = false;
      }
      if (this._page_authority.neutral_words.update == true) {
        this._updateButtonAccess = true;
      }

    }, (error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');


      //throw error;   //You can also throw the error to a global error handler
    });
  }
  postChangetype(change_type) {
    this._tableservice.neutrallistpagetype(change_type).subscribe((res) => {
      this.showdata = res.result;
    }, (error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');


      //throw error;   //You can also throw the error to a global error handler
    });
  }
 


  getZonelist() {
    this._tableservice.getassignzonelist().subscribe((res) => {
      this.zonearray = res.result.rows;
      console.log(this.zonearray);
    }, (error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');


      //throw error;   //You can also throw the error to a global error handler
    });
  }


  onZoneChange(zonevalue: any) {

    var obj = {
      "ROLE": this.myData,
      "USER_ZONE": this.zonevalue,
      "USER_ID": this.UserId,
      "CHANGE_TYPE": this.changetype
    };

    this._tableservice.getchangezonelist(obj).subscribe((res) => {
      this.showdata = res.result;
      this.toastr.success(res.message, 'zonelist');

    }, (error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');


      //throw error;   //You can also throw the error to a global error handler
    });

  }


  addform = () => {
    this.toggle = !this.toggle;
    $("#addForm").toggle();
  }
  updateform = () => {
    this.toggle = !this.toggle;
    $("#updateForm").toggle();
  }




  unseen() {
    this._tableservice.neutrallistpage().subscribe((res) => {
      this.showdata = res.result;
      this.toastr.success(res.message, 'Neutral - Words');
    }, (error) => {
      this.toastr.error(error, 'Neutral - Words');

    });
  }


  submitform(form: NgForm) {
    $("#addForm").toggle();
    this._tableservice.neutrallistpost(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshEmployeeList();
      this.unseen();
      this.toastr.success(res.message, 'Neutral Words');

    }, (error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');


      //throw error;   //You can also throw the error to a global error handler
    });
  }

  UpdateSubmitForm(form: NgForm) {

    this._tableservice.neutrallistput(form.value).subscribe((res) => {
      var showdatas = res.result;
      console.log("update" + showdatas);
      this.unseen();
      this.toastr.info(res.message, 'Neutral Words');

    }, (error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');


      //throw error;   //You can also throw the error to a global error handler
    });

  }




  onEdit(neuscheme: Neutralscheme) {
    this._tableservice.selectedneu = neuscheme;
    this.selectedNeutralRow = neuscheme;
  }




  deleteSelected(form: NgForm) {
    this.delete_toggle = !this.delete_toggle;
    this._tableservice.neutraldelpage(this.xbunch).subscribe((res) => {
      this.refreshEmployeeList();
      this.resetForm(form);
      this.unseen();
      this.toastr.warning(res.message, 'Neutral Words');
    }, (error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');


      //throw error;   //You can also throw the error to a global error handler
    });

  }


  ChkdeleteSelected(status, form: NgForm) {
    var value1 = { "APPROVE_STATUS": status }
    this._tableservice.neudelapproved({ ...form.value, ...value1 }).subscribe((res) => {
      this.refreshEmployeeList();
      this.unseen();
      this.toastr.success(res.message, status);

    }, (error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error.statusTexterror.status, 'Neutral - Words')


      //throw error;   //You can also throw the error to a global error handler
    });
  }

}
