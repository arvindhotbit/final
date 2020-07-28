

import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormArray, FormControl,FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import {TableDataService} from '../shared/table-data.service';
import {AuthserviceService} from '../auth/authservice.service';
import {casedetail} from '../shared/tabular';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { data, parseJSON } from 'jquery';
import { Observable } from 'rxjs';
import {Location} from '@angular/common';
import * as $ from 'jquery';


@Component({
  selector: 'app-case-listing',
  templateUrl: './case-listing.component.html',
  styleUrls: ['./case-listing.component.css']
})
export class CaseListingComponent implements OnInit {
  public pageSize: number = 10;
  public myData:string;
  public UserId:string;
  public UserName:string;
  selectedAllclone: any;
  public showdatapart:any = [];
  p:number =1;
  r:number =1;
  nsn = true;
  zoneid = true;
  zonefilters:string ="";
  IS_DELETE= false;
  IS_UPDATE= false;
  ref_keys= false;
  DELETE_FLG= false;
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
casedata:any = [];
casedetail:any = [];
caseinfo:any =[];

term1:string;
 term2:string; 
 term3:any;
  term4:string; 
  term5:string; 
  term6:string; 
  term7:string; 
startdate:any;
endate: any;
matchdate:any;
  constructor(public _tableservice:TableDataService,public _authservice:AuthserviceService, private toastr: ToastrService,private _location: Location) {
    this.userzone = "QA";
    this.myData = localStorage.getItem('Role');
    this.UserId = localStorage.getItem('Id');
    this.UserName = localStorage.getItem('Username');
     }

  ngOnInit(): void {
    

    this.refreshEmployeeList();
     this.matchdate = this.showdatapart.filter(m => new Date(m.date) > this.startdate && new Date(m.date) < this.endate);
     console.log(this.matchdate);
   
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
      this._tableservice.fetchcase().subscribe((res)=>{
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
      this._tableservice.fetchcase().subscribe((res)=>{
        this.showdatapart = res.result;
        this.tbl_header = res.metadata;
        console.log(this.showdatapart);
      })
      this.valuedelete = "y";
      this._isaccess = true;
      this.updatemark = "y";
      
     
    }
  }
  
  getId = (form:casedetail,item:any,)=>{
    $(".seconddiv").show();
    $('html,body').animate({
      scrollTop: $(".seconddiv").offset().top},
      'slow');
  
   
 console.log(item,form);
this._tableservice.postcaseids({...item,...form}).subscribe((res) => {
  this.casedetail = res.result[0].alert_info;
  this.caseinfo = res.result[1].case_info;

});

  }

  

 
  



   selectID(id, isSelected){  
    
    if(isSelected === true)
  {
    this.SelectedIDs.push(id);
    this.isdelete_button = false;
  }

    else
    {
      this.SelectedIDs.pop(id);
      this.isdelete_button = true;
    }
    console.log("true" + this.SelectedIDs);
    console.log("false" + this.filteredArray);
 

  }
  
  
 
















}


