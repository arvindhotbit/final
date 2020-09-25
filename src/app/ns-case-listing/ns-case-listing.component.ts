


import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormArray, FormControl, FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import { TableDataService } from '../shared/table-data.service';
import { AuthserviceService } from '../auth/authservice.service';
import { casedetail } from '../shared/tabular';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { data, parseJSON } from 'jquery';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import * as $ from 'jquery';
import { DateArray } from 'ngx-bootstrap/chronos/types';
import { AnyTxtRecord } from 'dns';

@Component({
  selector: 'app-ns-case-listing',
  templateUrl: './ns-case-listing.component.html',
  styleUrls: ['./ns-case-listing.component.css']
})
export class NsCaseListingComponent implements OnInit {
  public pageSize: number = 10;
  public pageSizepb: number = 10;
  public pageSizecp: number = 10;
  public myData: string;
  public UserId: string;
  public UserName: string;
  department: string;
  selectedAllclone: any;
  public showdatapart: any = [];
  p: number = 1;
  pb:number = 1;
  cm:number = 1;
  r: number = 1;
  zonefilters: string = "";
  selectedNeutralRow: casedetail;
  IS_DELETE = false;
  IS_UPDATE = false;
  ref_keys = false;
  DELETE_FLG = false;
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
  nsncol: boolean = true;
  caseidcol: boolean = true;
  customernamecol: boolean = true;
  senderbiccol: boolean = true;
  receiverbiccol: boolean = true;
  Paysysidcol: boolean = true;
  channelcol: boolean = true;
  amountcol: boolean = true;
  datecol: boolean = true;
  casedata: any = [];
  casedetail: any = [];
  caseinfo: any = [];
  matchedvalue: any = [];
  term1: string;
  term2: string;
  term3: any;
  term4: string;
  term5: string;
  term6: string;
  term7: string;
  startDate: any;
  endDate: any;
  filterdata: any;
  _DetailData: any;
  deparmentlist: any;
  makeraction: string;
  _actionaccess: boolean = true;
  _actionaccessvalue: boolean = true;
  commentbox: any = [];
  commentboxtext: any = [];
  cmmnt: any = [];
  _page_authority: any;
  orig_value: any;
  constructor(public _tableservice: TableDataService, public _authservice: AuthserviceService, private toastr: ToastrService, private _location: Location) {
    this.userzone = localStorage.getItem('UserZone');
    this.myData = localStorage.getItem('Role');
    this.UserId = localStorage.getItem('Id');
    this.UserName = localStorage.getItem('Username');
    this.department = localStorage.getItem('department');
    var retrievedObject = localStorage.getItem('testObject');
    var filterperseved = JSON.parse(retrievedObject);
    var retrievedObject1 = localStorage.getItem('fromto');
    var datefilterperseved = JSON.parse(retrievedObject1);
    // this.term1 = filterperseved.term1;
    // this.term2 = filterperseved.term2;
    // this.term3 = filterperseved.term3;
    // this.term4 = filterperseved.term4;
    // this.term5 = filterperseved.term5;
    // this.term6 = filterperseved.term6;
    // this.term7 = filterperseved.term7;
    // this.startDate = datefilterperseved.option1;
    // this.endDate = datefilterperseved.option2;


  }

  ngOnInit(): void {


    this.refreshEmployeeList();
    this.resetForm();
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



  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this._tableservice.selectedcasedetail = {
      REF_KEY: "",
      USER_ID: "",
      TYPE: "",
      EX_USER_ID: "",
      USER_NAME: "",
      USER_ZONE: "",
      ROLE: "",
      ECM_CASE_ID: "",
      MESSAGE_ID: "",
      COMMENTS: "",
      CREATION_DTTM: "",
      LOCKED_VIEW:"",
      PAGES: []

    }
  }

  commentsend(form: casedetail, msg: any) {

    var caseid = msg.ECM_CASE_ID;
    var obj = { "ROLE": this.myData, "USER_ID": this.UserId, "CASE_ID": caseid, "ROLE_PRIORITY": "admin", "USER_DEPARTMENT": this.department }
    console.log({ ...obj, ...form });
    this._tableservice.sendNscomment({ ...obj, ...form }).subscribe((res) => {
      this._actionaccess = false;
      this.commentbox = res.CASE_DECISION;
      this.commentboxtext = res.COMMENTS;
      this.unseen();
      console.log("comment", this.commentbox);


    }, (error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');


      //throw error;   //You can also throw the error to a global error handler
    })
  }
  // commentNssend(form: casedetail, msg: any) {

  //   var caseid = msg.ECM_CASE_ID;
  //   var obj = { "ROLE": this.myData, "USER_ID": this.UserId, "CASE_ID": caseid, "ROLE_PRIORITY": "admin", "USER_DEPARTMENT": this.department }
  //   console.log({ ...obj, ...form });
  //   this._tableservice.sendNscomment({ ...obj, ...form }).subscribe((res) => {
  //     this._actionaccess = false;
  //     this.commentbox = res.CASE_DECISION;
  //     this.commentboxtext = res.COMMENTS;
  //     this.unseen();
  //     console.log("comment", this.commentbox);


  //   }, (error) => {                              //Error callback
  //     console.error('error caught in component')
  //     this.toastr.error(error, 'Neutral - Words');


  //     //throw error;   //You can also throw the error to a global error handler
  //   })
  // }
  routes(form: casedetail, msg: any) {

    var caseid = msg.ECM_CASE_ID;
    var obj = { "ROLE": this.myData, "USER_ID": this.UserId, "CASE_ID": caseid, "ROUTE_DEPT_ID": "compliance", "USER_ZONE": this.userzone }
    console.log({ ...obj, ...form });
    this._tableservice.routecomment({ ...obj, ...form }).subscribe((res) => {
      this._actionaccess = false;
      this.commentbox = res.CASE_DECISION;
      this.commentboxtext = res.COMMENTS;
      console.log("comment", this.commentbox);
      this.unseen();

    }, (error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');


      //throw error;   //You can also throw the error to a global error handler
    })
  }




  refreshEmployeeList() {
    this._tableservice.getassigndepartment().subscribe((res) => {
      this.deparmentlist = res.result;
      console.log("department", this.deparmentlist);
      this.unseen();
    }, (error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');


      //throw error;   //You can also throw the error to a global error handler
    });
    this._tableservice.getassignaccesslist().subscribe((res) => {
      this.orig_value = res.result;
      this._page_authority = JSON.parse(this.orig_value);
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
     
    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'page - Authority');
     

      //throw error;   //You can also throw the error to a global error handler
    });
  }




  unseen() {


    var obj = { "ROLE": this.myData, "USER_ID": this.UserId, "USER_ZONE": this.userzone, "USER_DEPARTMENT": this.department };
    this._tableservice.fetchNscase(obj).subscribe((res) => {
      this.showdatapart = res.result;
      console.log("data", this.showdatapart);

    }, (error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');


      //throw error;   //You can also throw the error to a global error handler
    });
  }

  getId = (form: casedetail, item: casedetail,doc:any) => {
    
    if(doc != this.UserId && doc != '0')
    {
      alert("another user click");
      return
     
    }
   
      $(".seconddiv").show();
      $('html,body').animate({
        scrollTop: $(".seconddiv").offset().top
      },
        'slow');
      this._tableservice.selectedcasedetail = form;
      this.selectedNeutralRow = form;
      var data = { "MESSAGE_ID": form.MESSAGE_ID, "CASE_ID": form.ECM_CASE_ID };
  
  
      this._tableservice.postNScaseids({ ...item, ...data }).subscribe((res) => {
        this.casedetail = res.result[0].alert_info;
        this.caseinfo = res.result[1].case_info;
        this.cmmnt = res.result[2].case_comments;
        this.unseen();
      }, (error) => {                              //Error callback
        console.error('error caught in component')
        this.toastr.error(error, 'Neutral - Words');
  
  
        //throw error;   //You can also throw the error to a global error handler
      });
  
   

  }


  onEdit(form: casedetail, item: any) {

    this._tableservice.matchitems({ ...item, ...form }).subscribe((res) => {
      this.matchedvalue = res.result;

    }, (error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');


      //throw error;   //You can also throw the error to a global error handler
    });
  }


}



