import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormArray, FormControl,FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import {TableDataService} from '../shared/table-data.service';
import {AuthserviceService} from '../auth/authservice.service';
import {matchscore} from '../shared/tabular';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { data, parseJSON } from 'jquery';
import { Observable } from 'rxjs';
import {Location} from '@angular/common';
import * as $ from 'jquery';


@Component({
  selector: 'app-match-score',
  templateUrl: './match-score.component.html',
  styleUrls: ['./match-score.component.css']
})
export class MatchScoreComponent implements OnInit {
  public pageSize: number = 10;
  public myData:string;
  public UserId:string;
  public UserName:string;
  selectedAllclone: any;
  public showdatapart:any = [];
  _InsertButtonAccess:boolean;
  _DeleteButtonAccess:boolean;
  _updateButtonAccess:boolean;
  p:number =1;
  nsn = true;
  zoneid = true;
  zonefilters:string ="";
  IS_DELETE= false;
  IS_UPDATE= false;
  ref_keys= false;
  DELETE_FLG= false;
  selectedmsRow : matchscore;
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
zoneidms: boolean = true;
matchscorems: boolean = true;
paysysms: boolean = true;
oldzoneidms: boolean = true;
oldmatchscorems: boolean = true;
oldpaysysidms: boolean = true;
changetypems: boolean = true;
xbunch: string;
ybunch: string;
formact: string = "Add Record";
masterSelected: boolean;
checkedList: any;
histmasterSelected: boolean;
histcheckedList: any;
zonearray:string;
zonevalue:string;
a:string;
b:string;
c:string;
d:string;
e:string;
f:string;
changetype:string;
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
  getZonelist()
  {
    this._tableservice.getassignzonelist().subscribe((res) => {
     this.zonearray = res.result.rows;
     console.log(this.zonearray);
    })
  }

  onZoneChange(zonevalue:any){

    var obj = {  "ROLE" : this.myData,
    "USER_ZONE" : this.zonevalue,"USER_ID" : this.UserId,"CHANGE_TYPE":this.changetype};
    
        this._tableservice.get_mst_changezonelist(obj).subscribe((res)=>{
          this.showdatapart = res.result;
          this.toastr.success(res.message, 'zonelist');
      
        });
    
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
        this.checkedList.push(this.showdatapart[i].REF_KEY);
    }

    this.xbunch = this.checkedList.toString();
    this.isdelete_button = false;
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
        this.histcheckedList.push(this.showdatapart[i].HIST_ID);
    }
 
    this.ybunch = this.histcheckedList.toString();
    console.log(this.ybunch);
  
  }
  
  unseen() {
    this._tableservice.fetchms().subscribe((res) => {
      this.showdatapart = res.result;
    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');
     

      //throw error;   //You can also throw the error to a global error handler
    });
  }
  refreshEmployeeList() {
    this._tableservice.getassignaccesslist().subscribe((res) => {
      this.orig_value = res.result;
      this._page_authority = parseJSON(this.orig_value);
      console.log("arvind",this._page_authority);
      if(this._page_authority.matchscorethreshold.approval == false)
      {
      this.valuedelete = "1";
      this._isaccess = false;
      this.updatemark = "1";
      }
      if(this._page_authority.matchscorethreshold.approval == true)
      {
        this.valuedelete = "y";
        this._isaccess = true;
        this.updatemark = "y";
      }
      if(this._page_authority.matchscorethreshold.add == false)
      {
        this._InsertButtonAccess = false;
      }
      if(this._page_authority.matchscorethreshold.add == true)
      {
        this._InsertButtonAccess = true;
      }
      if(this._page_authority.matchscorethreshold.delete == false)
      {
        this._DeleteButtonAccess = false;
      }
      if(this._page_authority.matchscorethreshold.delete == true)
      {
        this._DeleteButtonAccess = true;
      }
      if(this._page_authority.matchscorethreshold.update == false)
      {
        this._updateButtonAccess = false;
      }
      if(this._page_authority.matchscorethreshold.update == true)
      {
        this._updateButtonAccess = true;
      }
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
    this._tableservice.mslistpagetype(change_type).subscribe((res) => {
      this.showdatapart = res.result;
    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');
     

      //throw error;   //You can also throw the error to a global error handler
    })
  }


 resetForm(form?: NgForm) {
   if (form)
  form.reset();
     this._tableservice.selectmatchscore = {
              REF_KEY : "",
              USER_ID : "",
              USER_NAME : "",
              USER_ZONE : "",
              ROLE : "",
              ZONE_ID : "",
              PAYSYS_ID : "",
              MATCHSCORE_THRESHOLD : "",
              HIST_ID : "",
              APPROVE_STATUS : "",
              CHANGE_TYPE : ""
 
   }
  }


 



  submitform(form: NgForm){

   
    if (form.value.REF_KEY == "") {
      this.toggle = !this.toggle;
      $("#addForm").toggle();
  this._tableservice.postms(form.value).subscribe((res)=>{
    //  this.resetForm(form);
   this.refreshEmployeeList();
   this.unseen();
    this.toastr.success(res.message, 'Match Score');

  },(error) => {                              //Error callback
    console.error('error caught in component')
    this.toastr.error(error, 'Neutral - Words');
   

    //throw error;   //You can also throw the error to a global error handler
  });
}
else
{
  console.log(form.value);
this._tableservice.putms(form.value).subscribe((res) => {
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





onEdit(ms: matchscore,bt:string) {
  this.btn_name = "Update";
  this._tableservice.selectmatchscore = ms;
  this.selectedmsRow = ms;
}


deleteSelected(form: NgForm) {
  this.delete_toggle = !this.delete_toggle; 
    this._tableservice.deletems(this.xbunch).subscribe((res) => {
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
  this._tableservice.msapproved({...form.value,...value1}).subscribe((res) => {
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


