
import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormArray, FormControl,FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import {TableDataService} from '../../shared/table-data.service';
import {AuthserviceService} from '../../auth/authservice.service';
import {paysysscheme} from '../../shared/tabular';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { element } from 'protractor';
import { data, parseJSON } from 'jquery';
import { Observable } from 'rxjs';
import {Location} from '@angular/common';
@Component({
  selector: 'app-paysys',
  templateUrl: './paysys.component.html',
  styleUrls: ['./paysys.component.css']
})

export class PaysysComponent implements OnInit {
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
  selectedpaysysRow : paysysscheme;
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
  constructor(public _tableservice:TableDataService,public _authservice:AuthserviceService, private toastr: ToastrService,private _location: Location) {
 
    this.myData = localStorage.getItem('Role');
    this.UserId = localStorage.getItem('Id');
    this.UserName = localStorage.getItem('Username');
     }

  ngOnInit(): void {
    
    this.resetForm();
    this.refreshEmployeeList();
   
  }



 resetForm(form?: NgForm) {
   if (form)
  form.reset();
     this._tableservice.selectpaysys = {
        REF_KEY: "" ,
        ROLE : this.myData,
        USER_ID : this.UserId,
        USER_NAME : this.UserName,
        USER_ZONE : "QA",
        PAYSYS_ID : "",
        CASE_TYPE_NS :"",
        CASE_TYPE_PS : "",
        ZONE_ID : "",
        HIST_ID :"",
        APPROVE_STATUS : this.apstatus,
        CHANGE_TYPE : ""
 
   }
  }

  //  selectID(id, isSelected, e){  
    
  //   if()
  // {
  //   this.SelectedIDs.push(id);
  //   this.isdelete_button = false;
  // }

  //   else
  //   {
  //     this.SelectedIDs.splice(id, 1);
  //     this.isdelete_button = true;
  //   }
  //   console.log(this.SelectedIDs);

 

  // }

  selectID(item,e)
  {
   if(e.target.checked) 
   {
     this.SelectedIDs.push(item.REF_KEY);
     this.isdelete_button = false;
     console.log("add" +  this.SelectedIDs,this.SelectedIDs.length);
   }
   else
   {
    for(var i=0 ; i < this.showdata.length; i++) {
      if(this.showdata[i] == item.REF_KEY) {
        this.showdata.splice(i,1);
     }
     this.isdelete_button = true;
     console.log("remove" + this.SelectedIDs,this.SelectedIDs.length);
   }
   console.log("result" + this.SelectedIDs,this.SelectedIDs.length)
  }
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
      this._tableservice.paysyslistpage().subscribe((res)=>{
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
      this._tableservice.paysyslistpage().subscribe((res)=>{
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
      this._tableservice.paysyslistpage().subscribe((res)=>{
        this.showdata = res.result;
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

   
    if (form.value.REF_KEY == "") {
      this.toggle = !this.toggle;
      $("#addForm").toggle();
  this._tableservice.paysyslistpost(form.value).subscribe((res)=>{
    //  this.resetForm(form);
   this.refreshEmployeeList();
    this.toastr.success('data inserted successfully', 'Neutral Words');

  });
}
else
{
this._tableservice.neutrallistput(form.value).subscribe((res) => {
  this.toggle = !this.toggle;
  $("#addForm").toggle();
    // this.resetForm(form);
    var showdatas = res.result;
    console.log("update" + showdatas);
    this.refreshEmployeeList();
    this.toastr.info('data update successfully', 'Neutral Words');

  });
}
}





onEdit(paysys: paysysscheme,bt:string) {
  this.btn_name = "Update";
  this._tableservice.selectpaysys = paysys;
  this.selectedpaysysRow = paysys;
}




deleteSelected(form: NgForm){
  this.delete_toggle = !this.delete_toggle;
  var myData = localStorage.getItem('Role');
    console.log(myData);
    if(myData === "makers")
    {
  
      this.SelectedIDs.forEach( (obj) => {
        this._tableservice.neutraldelpage(obj).subscribe((res) => {
          this.refreshEmployeeList();
          this.resetForm(form);
          this.toastr.warning(res.message, 'Neutral Words');
        });
      });
    }
  
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
ChkdeleteSelected(form:NgForm,paysys:paysysscheme)
{

    this._tableservice.selectpaysys = paysys;
    this.selectedpaysysRow = paysys;
    console.log(form.value,paysys);

      this._tableservice.neudelapproved({...form.value,...paysys}).subscribe((res) => {
         this.refreshEmployeeList();
        this.toastr.success('Data Delete Successfully', 'Approved');
     
      });
  


}
ChkNotdeleteSelected(form:NgForm,paysys:paysysscheme)
{


  this._tableservice.selectpaysys = paysys;
  this.selectedpaysysRow = paysys;
  console.log(form.value,paysys);
    this._tableservice.neudeldisapproved({...form.value,...paysys}).subscribe((res) => {
     this.refreshEmployeeList();

      this.toastr.info('Data Restored Successfully', 'Disapproved');
    });

}
}

