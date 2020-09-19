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
  masterSelected: string[];
  checkedList: any;
  histmasterSelected: string[];
  histcheckedList: any;
  Userzone: string;
  zonearray: any;
  zonevalue: string;
  zonevaluechk: string;
  _page_authority: any;
  orig_value: any;

  constructor(public _tableservice: TableDataService, public _authservice: AuthserviceService, private toastr: ToastrService, private _location: Location) {
    this.masterSelected = [];
    this.histmasterSelected = [];
    this.myData = localStorage.getItem('Role');
    this.UserId = localStorage.getItem('Id');
    this.UserName = localStorage.getItem('Username');
    this.Userzone = localStorage.getItem('UserZone');

    this.sendButtonClick();
  
  }

  ngOnInit(): void {
 
    this.resetForm();
    this.refreshEmployeeList();
    this.getZonelist();
    this.zonevalue = this.Userzone;
    this.onZoneChange(this.Userzone);
    this.sendButtonClick();
    this.viewmessage();

  }

  sendButtonClick() {
    this._tableservice.sendMessage(null)
  }

  viewmessage() {

    this._tableservice.onNewMessage().subscribe(msg => {
      if (msg.reload == true) {
        this.onZoneChange(this.zonevalue);
      }
    });
  }


  onZoneChange(zonevalue) {

    const obj = {
      "ROLE": this.myData,
      "USER_ZONE": zonevalue,
      "USER_ID": this.UserId,
      "CHANGE_TYPE": this.changetype
    };

    this._tableservice.getchangezonelist(obj).subscribe((res) => {
      this.showdata = res.result|| [];
    

    }, (error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');


      //throw error;   //You can also throw the error to a global error handler
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

 
  isItemChecked(id) {
    return this.masterSelected.includes(id)
  }


  checkUncheckAll() {
    if (this.masterSelected.length == this.showdata.length) {
      this.masterSelected = []
    } else {
      this.masterSelected = this.showdata.map(sdp => sdp.REF_KEY)
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
    if (this.histmasterSelected.length == this.showdata.length) {
      this.histmasterSelected = []
    } else {
      this.histmasterSelected = this.showdata.map(sdp => sdp.HIST_ID)
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
    if(this.zonevalue == null)
    {
      alert("Please Select a Zone");
    }
    else
    {
      const zonetype = { "CHANGE_TYPE": change_type,"USER_ZONE": this.zonevalue,"ROLE":this.myData,"USER_ID":this.UserId };
      this._tableservice.neutrallistpagetype(zonetype).subscribe((res) => {
        this.showdata = res.result;
      }, (error) => {                              //Error callback
        console.error('error caught in component')
        this.toastr.error(error, 'Neutral - Words');
  
  
        //throw error;   //You can also throw the error to a global error handler
      });
    }

  }

  getZonelist() {
    this._tableservice.getassignzonelist().subscribe((res) => {
      this.zonearray = res.result.rows;

    }, (error) => {                              //Error callback
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
    if (this._tableservice.selectedneu.REF_KEY == "") {
      alert("Update item select this row");
    }
    else {
      this.toggle = !this.toggle;
      $("#updateform").toggle();
      $("#addForm").hide();
    }

  }

  unseen() {
    this._tableservice.neutrallistpage().subscribe((res) => {
      this.showdata = res.result;
      // this.toastr.success(res.message, 'Neutral - Words');
    }, (error) => {
      this.toastr.error(error, 'Neutral - Words');

    });
  }

  submitform(form: NgForm) {
    $("#addForm").toggle();

    this._tableservice.neutrallistpost(form.value).subscribe((res) => {
      this.toastr.success(res.message, 'Neutral Words');

    }, (error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');


      //throw error;   //You can also throw the error to a global error handler
    });
  }

  UpdateSubmitForm(form: NgForm) {
    this.toggle = !this.toggle;
    $("#updateform").toggle();
    this._tableservice.neutrallistput(form.value).subscribe((res) => {
      this.masterSelected = [];
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
    if (this.masterSelected.length <= 0) {
      alert("Delete Item Select This Row")
    }
    else {
      this._tableservice.neutraldelpage(this.masterSelected.join(',')).subscribe((res) => {
        this.toastr.warning(res.message, 'Sensitive Word');
        this.masterSelected = [];
      }, (error) => {
        console.error('error caught in component')
        this.toastr.error(error, 'Sensitive Word');



      });

    }


  }

  ChkdeleteSelected(status, form: NgForm) {


   
    var value1 = { "APPROVE_STATUS": status, "HIST_ID": this.histmasterSelected.join(',') }
      this._tableservice.neudelapproved({ ...form.value, ...value1 }).subscribe((res) => {
        this.histmasterSelected = [];
        this.toastr.success(res.message, status);
       
      }, (error) => {                              //Error callback
        console.error('error caught in component')
        this.toastr.error(error.statusTexterror.status, 'Neutral - Words')


        //throw error;   //You can also throw the error to a global error handler
      });
    
  }


}



