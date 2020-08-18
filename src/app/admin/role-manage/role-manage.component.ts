
import { Component, OnInit, ElementRef } from '@angular/core';
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
export class RoleManageComponent implements OnInit {
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
  masterSelected: boolean;
  checkedList: any;
  xbunch: string;
  ybunch: string;
  paysyssendrefkey:string;
  _accessPages:any;
  _viewneutral:boolean;
  _editneutral:boolean;
  _updateneutral:boolean;
  _deleteneutral:boolean
  page1:string= "Neutral-Words";
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


  backClicked() {
    this._location.back();
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
          var yadav = parseJSON(arvind);
          console.log("res",yadav);
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
   
   
    if (form.value.REF_KEY == null) {
      this.toggle = !this.toggle;
      $("#addForm").toggle();
  this._tableservice.roleslistpost(form.value).subscribe((res)=>{
    //  this.resetForm(form);
   this.refreshEmployeeList();
    this.toastr.success('data inserted successfully', 'Neutral Words');

  });
}
else
{
this._tableservice.paysyslistput(form.value).subscribe((res) => {
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
  this.selectedpaysysRow = paysys;
  this.paysyssendrefkey = JSON.stringify(this.selectedpaysysRow.REF_KEY);
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


