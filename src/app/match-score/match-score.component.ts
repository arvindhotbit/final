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
a:string;
b:string;
c:string;
d:string;
e:string;
f:string;
changetype:string;
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
  backClicked() {
    this._location.back();
  }
 
  refreshEmployeeList()
  {
    var myData = localStorage.getItem('Role');
    console.log(myData);
    if(myData === "makers")
    {
      this._tableservice.fetchms().subscribe((res)=>{
        this.showdatapart = res.result;
        // this.tbl_header = res.metadata.name;
        console.log("data" , this.showdatapart);
      })
 
    
    
      this.valuedelete = "1";
      this._isaccess = false;
      this.updatemark = "1";
  
    }
    else if(myData === "checkers")
    {
      this._tableservice.fetchms().subscribe((res)=>{
        this.showdatapart = res.result;
        this.tbl_header = res.metadata;
        console.log(this.showdatapart);
      })
      this.valuedelete = "y";
      this._isaccess = true;
      this.updatemark = "y";
      
     
    }
  }
  
 

  addform = () =>{
    this.toggle = !this.toggle;
    $("#addForm").toggle();
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
    this.toastr.success(res.message, 'Match Score');

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
    this.toastr.info(res.message, 'Neutral Words');

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
      this.resetForm(form);
      this.toastr.warning(res.message, 'NAME SCREEN');
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

ChkdeleteSelected(form: NgForm) {

  this._tableservice.msapproved(form.value).subscribe((res) => {
    this.refreshEmployeeList();
    this.toastr.success(res.message, 'Approved');

  });
}


}


