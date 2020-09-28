
import { Component, OnInit, ElementRef, ViewChild,AfterViewInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormArray, FormControl,FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import {TableDataService} from '../../shared/table-data.service';
import {AuthserviceService} from '../../auth/authservice.service';
import {paysysscheme,createrole} from '../../shared/tabular';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { element } from 'protractor';
import { data, parseJSON } from 'jquery';
import { Observable } from 'rxjs';
import {Location} from '@angular/common';
@Component({
  selector: 'app-role-manage',
  templateUrl: './role-manage.component.html',
  styleUrls: ['./role-manage.component.css']
})
export class RoleManageComponent implements OnInit,AfterViewInit {
  public pageSize: number = 10;
  public myData:string;
  public UserId:string;
  public UserName:string;
  selectedAllclone: any;
  public showdata:any = [];
  p:number =1;
  count: Number = 20;
  nsn = true;
  zoneid = true;
  noiseword = true;
  IS_DELETE= false;
  IS_UPDATE= false;
  ref_keys= false;
  DELETE_FLG= false;
  selectedrolesRow : createrole;
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
  oldzone:string ="";
  oldnoise:string="";
  changetype:string="";
  apstatus:string = "";
  btn_name :string = "Submit";
  isdelete_button:boolean = true;
  tbl_header:any = [];
  zoneidcol:boolean=true;
  noisewordcol:boolean=true;
  oldzoneidcol:boolean=true;
  oldnoisewordcol:boolean=true;
  changetypecol:boolean=true;
  masterSelected: boolean;
  checkedList: any;
  xbunch: string;
  ybunch: string;
  paysyssendrefkey:string;
  _accessPages:any;
  neutral_words_view: boolean = false;
  neutral_words_add: boolean = false;
  neutral_words_update: boolean = false;
  neutral_words_delete: boolean = false;
  neutral_words_check: boolean = false;
  blacklisted_view: boolean = false;
  blacklisted_add: boolean = false;
  blacklisted_update: boolean = false;
  blacklisted_delete: boolean = false;
  blacklisted_check: boolean = false;
  highriskcountry_view: boolean = false;
  highriskcountry_add: boolean = false;
  highriskcountry_update: boolean = false;
  highriskcountry_delete: boolean = false;
  highriskcountry_check: boolean = false;
  internallistdef_view: boolean = false;
  internallistdef_add: boolean = false;
  internallistdef_update: boolean = false;
  internallistdef_delete: boolean = false;
  internallistdef_check:boolean= false;
  internallistwatchlist_view: boolean = false;
  internallistwatchlist_add: boolean = false;
  internallistwatchlist_update: boolean = false;
  internallistwatchlist_delete: boolean = false;
  internallistwatchlist_check: boolean = false;
  sanctionedcities_view: boolean = false;
  sanctionedcities_add: boolean = false;
  sanctionedcities_update: boolean = false;
  sanctionedcities_delete: boolean = false;
  sanctionedcities_check: boolean = false;
  sensitive_word_view: boolean = false;
  sensitive_word_add: boolean = false;
  sensitive_word_update: boolean = false;
  sensitive_word_delete: boolean = false;
  sensitive_word_check: boolean = false;
  paymentscreenadk_view: boolean = false;
  paymentscreenadk_add: boolean = false;
  paymentscreenadk_update: boolean = false;
  paymentscreenadk_delete: boolean = false;
  paymentscreenadk_check: boolean = false;
  paymentscreeneph_view: boolean = false;
  paymentscreeneph_add: boolean = false;
  paymentscreeneph_update: boolean = false;
  paymentscreeneph_delete: boolean = false;
  paymentscreeneph_check: boolean = false;
  matchscorethreshold_view: boolean = false;
  matchscorethreshold_add: boolean = false;
  matchscorethreshold_update: boolean = false;
  matchscorethreshold_delete: boolean = false;
  matchscorethreshold_check: boolean = false;
  pep_view: boolean = false;
  pep_add: boolean = false;
  pep_update: boolean = false;
  pep_delete: boolean = false;
  pep_check: boolean = false;
  namescreening_view: boolean = false;
  namescreening_add: boolean = false;
  namescreening_update: boolean = false;
  namescreening_delete: boolean = false;
  namescreening_check: boolean = false;
  zonevsglobal_view: boolean = false;
  zonevsglobal_add: boolean = false;
  zonevsglobal_update: boolean = false;
  zonevsglobal_delete: boolean = false;
  zonevsglobal_check: boolean = false;
  customerbasicnoposition_view: boolean = false;
  customerbasicnoposition_add: boolean = false;
  customerbasicnoposition_update: boolean = false;
  customerbasicnoposition_delete: boolean = false;
  customerbasicnoposition_check: boolean = false;
  report_view:boolean =false;
  caselisting_view: boolean = false;
  caselisting_add: boolean = false;
  caselisting_update: boolean = false;
  caselisting_delete: boolean = false;
  caselisting_check: boolean = false;
  _Routeauthpermission:boolean = false;
  page1:string= "Neutral-Words";
  neutral_check_auth:boolean = true;
  neutral_crud:boolean = true;
 bic_check_auth:boolean = true;
  bic_crud:boolean = true;
  hrc_check_auth:boolean = true;
  hrc_crud:boolean = true;
  ild_check_auth:boolean = true;
  ild_crud:boolean = true;
  ilw_check_auth:boolean = true;
  ilw_crud:boolean = true;
  sanc_check_auth:boolean = true;
  sanc_crud:boolean = true;
  sens_check_auth:boolean = true;
  sens_crud:boolean = true;
  psa_check_auth:boolean = true;
  psa_crud:boolean = true;
  ms_check_auth:boolean = true;
  ms_crud:boolean = true;
  pep_check_auth:boolean = true;
  pep_crud:boolean = true;
  ns_check_auth:boolean = true;
  ns_crud:boolean = true;
  global_check_auth:boolean = true;
  global_crud:boolean = true;
  cbn_check_auth:boolean = true;
  cbn_crud:boolean = true;
  checkboxs:any = [];
  @ViewChild('pRef', {static: false}) pRef: ElementRef;

  constructor(public _tableservice:TableDataService,public _authservice:AuthserviceService, private toastr: ToastrService,private _location: Location) {
 
    this.masterSelected = false;
    this.myData = localStorage.getItem('Role');
    this.UserId = localStorage.getItem('Id');
    this.UserName = localStorage.getItem('Username');
    this.getCheckedItemList();
   
     }

  ngOnInit(): void {
    
    this.resetForm();
    this.refreshEmployeeList();
     
  }


  ngAfterViewInit() {
console.log(this.pRef.nativeElement);
  
  }
   selectViewAll = (e) => {
    if(e.target.checked == true)
    {
     this.neutral_words_view = true;
     this.blacklisted_view = true;
     this.highriskcountry_view = true;
     this.internallistdef_view = true;
     this.internallistwatchlist_view = true;
     this.sanctionedcities_view = true;
     this.sensitive_word_view = true;
     this.customerbasicnoposition_view = true;
     this.zonevsglobal_view = true;
     this.paymentscreenadk_view = true;
     this.paymentscreeneph_view = true;
     this.namescreening_view = true;
     this.pep_view = true;
     this.matchscorethreshold_view = true;
     this.caselisting_view = true;
     this.report_view = true;
    }
    else{
      this.neutral_words_view = false;
      this.blacklisted_view = false;
      this.highriskcountry_view = false;
      this.internallistdef_view = false;
      this.internallistwatchlist_view = false;
      this.sanctionedcities_view = false;
      this.sensitive_word_view = false;
      this.customerbasicnoposition_view = false;
      this.zonevsglobal_view = false;
      this.paymentscreenadk_view = false;
      this.paymentscreeneph_view = false;
      this.namescreening_view = false;
      this.pep_view = false;
      this.matchscorethreshold_view = false;
      this.caselisting_view = false;
    }
  }

  selectApprovalAll = (e) => {
    if(e.target.checked == true)
    {
     this.neutral_words_check = true;
     this.blacklisted_check = true;
     this.highriskcountry_check = true;
     this.internallistdef_check = true;
     this.internallistwatchlist_check = true;
     this.sanctionedcities_check = true;
     this.sensitive_word_check = true;
     this.customerbasicnoposition_check = true;
     this.zonevsglobal_check = true;
     this.paymentscreenadk_check = true;
     this.paymentscreeneph_check = true;
     this.namescreening_check = true;
     this.pep_check = true;
     this.matchscorethreshold_check = true;
     this.caselisting_check = true;

    }
    else{
      this.neutral_words_check = false;
      this.blacklisted_check = false;
      this.highriskcountry_check = false;
      this.internallistdef_check = false;
      this.internallistwatchlist_check = false;
      this.sanctionedcities_check = false;
      this.sensitive_word_check = false;
      this.customerbasicnoposition_check = false;
      this.zonevsglobal_check = false;
      this.paymentscreeneph_check = false;
      this.namescreening_check = false;
      this.pep_check = false;
      this.matchscorethreshold_check = false;
      this.caselisting_check = false;
    }
  }

  selectAddAll = (e) => {
    if(e.target.checked == true)
    {
     this.neutral_words_add = true;
     this.blacklisted_add = true;
     this.highriskcountry_add = true;
     this.internallistdef_add = true;
     this.internallistwatchlist_add = true;
     this.sanctionedcities_add = true;
     this.sensitive_word_add = true;
     this.customerbasicnoposition_add = true;
     this.zonevsglobal_add = true;
     this.paymentscreenadk_add = true;
     this.paymentscreeneph_add = true;
     this.namescreening_add = true;
     this.pep_add = true;
     this.matchscorethreshold_add = true;
     this.caselisting_add = true;

    }
    else{
      this.neutral_words_add = false;
      this.blacklisted_add = false;
      this.highriskcountry_add = false;
      this.internallistdef_add = false;
      this.internallistwatchlist_add = false;
      this.sanctionedcities_add = false;
      this.sensitive_word_add = false;
      this.customerbasicnoposition_add = false;
      this.zonevsglobal_add = false;
      this.paymentscreenadk_add = false;
      this.paymentscreeneph_add = false;
      this.namescreening_add = false;
      this.pep_add = false;
      this.matchscorethreshold_add = false;
      this.caselisting_add = false;
    }
  }

  selectUpdateAll = (e) => {
    if(e.target.checked == true)
    {
     this.neutral_words_update = true;
     this.blacklisted_update = true;
     this.highriskcountry_update = true;
     this.internallistdef_update = true;
     this.internallistwatchlist_update = true;
     this.sanctionedcities_update = true;
     this.sensitive_word_update = true;
     this.customerbasicnoposition_update = true;
     this.zonevsglobal_update = true;
     this.paymentscreenadk_update = true;
     this.paymentscreeneph_update = true;
     this.namescreening_update = true;
     this.pep_update = true;
     this.matchscorethreshold_update = true;
     this.caselisting_update = true;

    }
    else{
      this.neutral_words_update = false;
      this.blacklisted_update = false;
      this.highriskcountry_update = false;
      this.internallistdef_update = false;
      this.internallistwatchlist_update = false;
      this.sanctionedcities_update = false;
      this.sensitive_word_update = false;
      this.customerbasicnoposition_update = false;
      this.zonevsglobal_update = false;
      this.paymentscreenadk_update = false;
      this.paymentscreeneph_update = false;
      this.namescreening_update = false;
      this.pep_update = false;
      this.matchscorethreshold_update = false;
      this.caselisting_update = false;
    }
  }

  selectDeleteAll = (e) => {
    if(e.target.checked == true)
    {
     this.neutral_words_delete = true;
     this.blacklisted_delete = true;
     this.highriskcountry_delete = true;
     this.internallistdef_delete = true;
     this.internallistwatchlist_delete = true;
     this.sanctionedcities_delete = true;
     this.sensitive_word_delete = true;
     this.customerbasicnoposition_delete = true;
     this.zonevsglobal_delete = true;
     this.paymentscreenadk_delete = true;
     this.paymentscreeneph_delete = true;
     this.namescreening_delete = true;
     this.pep_delete = true;
     this.matchscorethreshold_delete = true;
     this.caselisting_delete = true;

    }
    else{
      this.neutral_words_delete = false;
      this.blacklisted_delete = false;
      this.highriskcountry_delete = false;
      this.internallistdef_delete = false;
      this.internallistwatchlist_delete = false;
      this.sanctionedcities_delete = false;
      this.sensitive_word_delete = false;
      this.customerbasicnoposition_delete = false;
      this.zonevsglobal_delete = false;
      this.paymentscreenadk_delete = false;
      this.paymentscreeneph_delete = false;
      this.namescreening_delete = false;
      this.pep_delete = false;
      this.matchscorethreshold_delete = false;
      this.caselisting_delete = false;
    }
  }



  // napl(e) {

  //   if (this.neutral_words_add == '1' || this.neutral_words_update == '1' || this.neutral_words_delete == '1') {
  //     this.neutral_check_auth = false;
  //     this.neutral_words_view = '1';
  //   }
  //   else {
  //     this.neutral_check_auth = true;
  //     this.neutral_words_view = '0';
  //   }

  //  if (this.blacklisted_add == '1' || this.blacklisted_update == '1' || this.blacklisted_delete == '1') {
  //     this.bic_check_auth = false;
  //     this.blacklisted_view = '1';
  //   }
  //   else {
  //     this.bic_check_auth = true;
  //     this.blacklisted_view = '0';
  //   }

  //   if (this.highriskcountry_add == '1' || this.highriskcountry_update == '1' || this.highriskcountry_delete == '1') {
  //     this.hrc_check_auth = false;
  //     this.highriskcountry_view = '1';
  //   }
  //   else {
  //     this.hrc_check_auth = true;
  //     this.highriskcountry_view = '0';
  //   }

  //   if (this.internallistdef_add == '1' || this.internallistdef_update == '1' || this.internallistdef_delete == '1') {
  //     this.ild_check_auth = false;
  //     this.internallistdef_view = '1';
  //   }
  //   else {
  //     this.ild_check_auth = true;
  //     this.internallistdef_view = '0';
  //   }

  //   if (this.internallistwatchlist_add == '1' || this.internallistwatchlist_update == '1' || this.internallistwatchlist_delete == '1') {
  //     this.ilw_check_auth = false;
  //     this.internallistwatchlist_view = '1';
  //   }
  //   else {
  //     this.ilw_check_auth = true;
  //     this.internallistwatchlist_view = '0';
  //   }


  //   if (this.sanctionedcities_add == '1' || this.sanctionedcities_update == '1' || this.sanctionedcities_delete == '1') {
  //     this.sanc_check_auth = false;
  //     this.sanctionedcities_view = '1';
  //   }
  //   else {
  //     this.sanc_check_auth = true;
  //     this.sanctionedcities_view = '0';
  //   }

  //   if (this.sensitive_word_add == '1' || this.sensitive_word_update == '1' || this.sensitive_word_delete == '1') {
  //     this.sens_check_auth = false;
  //     this.sensitive_word_view = '1';
  //   }
  //   else {
  //     this.sens_check_auth = true;
  //     this.sensitive_word_view = '0';
  //   }

  //   if (this.paymentscreenadk_add == '1' || this.paymentscreenadk_update == '1' || this.paymentscreenadk_delete == '1') {
  //     this.psa_check_auth = false;
  //     this.paymentscreenadk_view = '1';
  //   }
  //   else {
  //     this.psa_check_auth = true;
  //     this.paymentscreenadk_view = '0';
  //   }


  //   if (this.matchscorethreshold_add == '1' || this.matchscorethreshold_update == '1' || this.matchscorethreshold_delete == '1') {
  //     this.ms_check_auth = false;
  //     this.matchscorethreshold_view = '1';
  //   }
  //   else {
  //     this.ms_check_auth = true;
  //     this.matchscorethreshold_view = '0';
  //   }


  //   if (this.namescreening_add == '1' || this.namescreening_update == '1' || this.namescreening_delete == '1') {
  //     this.ns_check_auth = false;
  //     this.namescreening_view = '1';
  //   }
  //   else {
  //     this.ns_check_auth = true;
  //     this.namescreening_view = '0';
  //   }


  //   if (this.pep_add == '1' || this.pep_update == '1' || this.pep_delete == '1') {
  //     this.pep_check_auth = false;
  //     this.pep_view = '1';
  //   }
  //   else {
  //     this.pep_check_auth = true;
  //     this.pep_view = '0';
  //   }
  //   if (this.zonevsglobal_add == '1' || this.zonevsglobal_update == '1' || this.zonevsglobal_delete == '1') {
  //     this.global_check_auth = false;
  //     this.zonevsglobal_view = '1';
  //   }
  //   else {
  //     this.global_check_auth = true;
  //     this.zonevsglobal_view = '0';
  //   }

  //   if (this.customerbasicnoposition_add == '1' || this.customerbasicnoposition_update == '1' || this.customerbasicnoposition_delete == '1') {
  //     this.cbn_check_auth = false;
  //     this.customerbasicnoposition_view = '1';
  //   }
  //   else {
  //     this.cbn_check_auth = true;
  //     this.customerbasicnoposition_view = '0';
  //   }

  // }
  // chknapl(c) {
  //   if (this.neutral_words_check == '1') {
  //     this.neutral_crud = false;
  //     this.neutral_words_view = '1';
  //   }
  //   else {
  //     this.neutral_crud = true;
  //     this.neutral_words_view = '0';
  //   }


  //   if (this.blacklisted_check == '1') {
  //     this.bic_crud = false;
  //     this.blacklisted_view = '1';
  //   }
  //   else {
  //     this.bic_crud = true;
  //     this.blacklisted_view = '0';
  //   }


  //   if (this.highriskcountry_check == '1') {
  //     this.hrc_crud = false;
  //     this.highriskcountry_view = '1';
  //   }
  //   else {
  //     this.hrc_crud = true;
  //     this.highriskcountry_view = '0';
  //   }
  //   if (this.internallistdef_check == '1') {
  //     this.ild_crud = false;
  //     this.internallistdef_view = '1';
  //   }
  //   else {
  //     this.ild_crud = true;
  //     this.internallistdef_view = '0';
  //   }
  //   if (this.internallistwatchlist_check == '1') {
  //     this.ilw_crud = false;
  //     this.internallistwatchlist_view = '1';
  //   }
  //   else {
  //     this.ilw_crud = true;
  //     this.internallistwatchlist_view = '0';
  //   }

  //   if (this.sanctionedcities_check == '1') {
  //     this.sanc_crud = false;
  //     this.sanctionedcities_view = '1';
  //   }
  //   else {
  //     this.sanc_crud = true;
  //     this.sanctionedcities_view = '0';
  //   }
  //   if (this.sensitive_word_check == '1') {
  //     this.sens_crud = false;
  //     this.sensitive_word_view = '1';
  //   }
  //   else {
  //     this.sens_crud = true;
  //     this.sensitive_word_view = '0';
  //   }
  //   if (this.paymentscreenadk_check == '1') {
  //     this.psa_crud = false;
  //     this.paymentscreenadk_view = '1';
  //   }
  //   else {
  //     this.psa_crud = true;
  //     this.paymentscreenadk_view = '0';
  //   }
  //   if (this.matchscorethreshold_check == '1') {
  //     this.ms_crud = false;
  //     this.matchscorethreshold_view = '1';
  //   }
  //   else {
  //     this.ms_crud = true;
  //     this.matchscorethreshold_view = '0';
  //   }
  //   if (this.namescreening_check == '1') {
  //     this.ns_crud = false;
  //     this.namescreening_view = '1';
  //   }
  //   else {
  //     this.ns_crud = true;
  //     this.namescreening_view = '0';
  //   }
  //   if (this.pep_check == '1') {
  //     this.pep_crud = false;
  //     this.pep_view = '1';
  //   }
  //   else {
  //     this.pep_crud = true;
  //     this.pep_view = '0';
  //   }
  //   if (this.zonevsglobal_check == '1') {
  //     this.global_crud = false;
  //     this.zonevsglobal_view = '1';
  //   }
  //   else {
  //     this.global_crud = true;
  //     this.zonevsglobal_view = '0';
  //   }
  //   if (this.customerbasicnoposition_check == '1') {
  //     this.cbn_crud = false;
  //     this.customerbasicnoposition_view = '1';
  //   }
  //   else {
  //     this.cbn_crud = true;
  //     this.customerbasicnoposition_view = '0';
  //   }
  // }
// napl(e)
// {
//   if (this.neutral_words_add == true || this.neutral_words_update == true || this.neutral_words_delete == true) {
//       this.neutral_check_auth = false;
//       this.neutral_words_view = true;
//     }
//     else {
//       this.neutral_check_auth = true;
//       this.neutral_words_view = false;
//     }
// }
// chknapl(e)
// {
//     if (this.neutral_words_check == true) {
//       this.neutral_crud = false;
//       this.neutral_words_view = true;
//     }
//     else {
//       this.neutral_crud = true;
//       this.neutral_words_view = false;
//     }
// }
napl(e)
{
  
}
chknapl(e)
{

}
 resetForm(form?: NgForm) {
   if (form)
  form.reset();
     this._tableservice.selectroleslist = {
      REF_KEY : "",
      USER_ID : "",
      TYPE : "",
      EX_USER_ID : "",
      USER_NAME : "",
      USER_ZONE : "",
      ROLE : "",
      ROLE_NAME:"",
      ROLE_AUTHORITY:[],
      PAGES : []
 
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
        this.checkedList.push(this.showdata[i]);
    }
    // this.checkedList = JSON.stringify(this.checkedList);
    this.checkedList.forEach(element => {
      this.SelectedIDs.push(element.REF_KEY);
      this.xbunch = this.SelectedIDs.toString();
      this.isdelete_button = false;
      console.log("add" + this.SelectedIDs, this.SelectedIDs.length);
    });
  }



 
  refreshEmployeeList()
  
  {
    var myData = localStorage.getItem('Role');
    console.log(myData);
    if(myData === "makers")
    {
      this._tableservice.rolelistviewpage().subscribe((res)=>{
        this.showdata = res.result;

        this.tbl_header = res.metadata;
        console.log(this.tbl_header);
      })
 
    
    
      this.valuedelete = "1";
      this._isaccess = false;
      this.updatemark = "1";
  
    }
    else if(myData === "checkers")
    {
      this._tableservice.rolelistviewpage().subscribe((res)=>{
        this.showdata = res.result;
        this.tbl_header = res.metadata;
        console.log(this.showdata);
      })
      this.valuedelete = "y";
      this._isaccess = true;
      this.updatemark = "y";
      
     
    }
    else if(myData === "admin")
    {
      this._tableservice.rolelistviewpage().subscribe((res)=>{
        this.showdata = res.result;
         for(var i = 0;i < res.result.length; i++)
         {
          var arvind = res.result[i].ROLE_AUTHORITY;
          // var yadav = JSON.parse(arvind);
          // console.log("res",yadav);
         }
     
   
        this.tbl_header = res.metadata;
        console.log(this.showdata);
      })
      this.valuedelete = "1";
      this._isaccess = false;
      this.updatemark = "1";
      
     
    }
  }
  
 

  addform = () =>{
    this.toggle = !this.toggle;
    $("#addForm").toggle();
  }

  


 



  submitform(form: NgForm){
   
   
   
      this.toggle = !this.toggle;
      $("#addForm").toggle();
  this._tableservice.roleslistpost(form.value).subscribe((res)=>{
    //  this.resetForm(form);
   this.refreshEmployeeList();
    this.toastr.success('data inserted successfully', 'Role Created');
    (<any>$(this.pRef.nativeElement)).modal('toggle');
    return false;
  });


}

updatesubmitform(form: NgForm)
{
  this._tableservice.roleslistput(form.value).subscribe((res) => {
    this.toggle = !this.toggle;
    $("#addForm").toggle();
      // this.resetForm(form);
      var showdatas = res.result;
      console.log("update" + showdatas);
      this.refreshEmployeeList();
      this.toastr.info('data update successfully', 'Neutral Words');
  
    });
}



onEdit(roles: createrole) {
  this._tableservice.selectroleslist = roles;
  this.selectedrolesRow = roles;
  this.selectedrolesRow = roles;
  this.paysyssendrefkey = JSON.stringify(this.selectedrolesRow.REF_KEY);
}




deleteSelected(form: NgForm) {
 


    this._tableservice.paysysdeletepage(this.xbunch).subscribe((res) => {
      this.refreshEmployeeList();
      this.resetForm(form);
      this.toastr.warning(res.message, 'Neutral Words');
    });

 

}
changetext(status:string,form:NgForm)
{
  this.apstatus = status;
  this.myData = localStorage.getItem('Role');
  this.UserId = localStorage.getItem('Id');
  this.UserName = localStorage.getItem('Username');
  console.log(this.apstatus);
}
changetextr(status:string,form:NgForm)
{
  this.apstatus = status;
  this.myData = localStorage.getItem('Role');
  this.UserId = localStorage.getItem('Id');
  this.UserName = localStorage.getItem('Username');
  console.log(this.apstatus);
}
ChkdeleteSelected(form:NgForm,roles:createrole)
{

    this._tableservice.selectroleslist = roles;
    this.selectedrolesRow = roles;
    console.log(form.value,roles);

      this._tableservice.neudelapproved({...form.value,...roles}).subscribe((res) => {
         this.refreshEmployeeList();
        this.toastr.success('Data Delete Successfully', 'Approved');
     
      });
  


}

}


