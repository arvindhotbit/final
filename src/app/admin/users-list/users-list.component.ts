
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormArray, FormControl,FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import {TableDataService} from '../../shared/table-data.service';
import {AuthserviceService} from '../../auth/authservice.service';
import {usersscheme,adepartscheme,unassignitem} from '../../shared/tabular';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { element } from 'protractor';
import { data, parseJSON } from 'jquery';
import { Observable } from 'rxjs';
import {Location} from '@angular/common';
import { stringify } from 'querystring';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  public pageSize: number = 10;
  public myData:string;
  public UserId:string;
  public UserName:string;
  public Userzone:string="QA";
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
  selectedpaysysRow : usersscheme;
  selecteddepartRow:unassignitem;
  selectedzoneRow:unassignitem;
  selectedpay:unassignitem;
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
  department:any = [];
  zoneslist:any = [];
  paysyslist:any = [];
  values:any = [
    { name: "makers" },
    { name: "checkers" },
    { name: "admin" }
  ];
 user:string="makers";
 departselect:any = [];
 _showassign:boolean= false;
 selectdepartmentid:any;
 selectzoneid:any;
 zoneselect:any = [];
 paysysselect:any = [];
 selectpayid:any;
 departmenttype:string = "department";
 zonetype:string= "zone";
 departsendrefkey:string;
 paysystype:string="paysys";
 asuserid:any;
 rlist:any;
 primary_flag:string;
 btnhidden:boolean = false;
 

  constructor(public _tableservice:TableDataService,public _authservice:AuthserviceService, private toastr: ToastrService,private _location: Location) {
 
    this.myData = localStorage.getItem('Role');
    this.UserId = localStorage.getItem('Id');
    this.UserName = localStorage.getItem('Username');
     }

  ngOnInit(): void {
    
    this.resetForm();
    this.departselection();
    this.zoneselection();
    this.paysysselection();
   this.roleslist();

  }

  departselection = ()=>{
    this._tableservice.departlistpage().subscribe((res)=>{
      this.departselect = res.result;
      console.log(this.departselect);
    })
  }
  zoneselection = ()=>{
    this._tableservice.addzonelistpage().subscribe((res)=>{
      this.zoneselect = res.result;
      console.log(this.zoneselect);
    })
  }
  paysysselection = ()=>{
    this._tableservice.paysyslistpage().subscribe((res)=>{
      this.paysysselect = res.result;
      console.log('paysysdata',this.paysysselect);
    })
  }
 
  roleslist()
{
  this._tableservice.rolelistviewpage().subscribe((res)=>{
    this.rlist = res.result;
    console.log(this.showdata);

  })
}

  onroleChange(user:usersscheme){
    this.user = "makers";
    console.log(user);
    this._tableservice.userslistpost(user).subscribe((res)=>{
      this.showdata = res.result;
      this.toastr.success(res.message, 'Users List');
  
    });

  }

  getuserid = (item,form)=>{
   console.log(item.uid);
   this.asuserid = {"USER_ID":item.uid};
   this._showassign = true;
  
    this._tableservice.postuserids({...this.asuserid,...form.value}).subscribe((res) => {
     
      this.department = res.dept_list,
   this.zoneslist = res.zone_list,
     this.paysyslist = res.paysys_list,
     console.log(this.department,this.zoneslist,this.paysyslist);
    });
 
 
  }

 
  AllItemList(item)
  {
    var role  = {"ROLE":this.myData}
    console.log("new",role,item)
    this._tableservice.postuserids({...item,...role}).subscribe((res) => {
     
      this.department = res.dept_list,
   this.zoneslist = res.zone_list,
     this.paysyslist = res.paysys_list,
     console.log("new",this.department,this.zoneslist,this.paysyslist);
    });
  }

  onflagChange(item,e){
    var role  = {"ROLE":this.myData};
    var flag = { "PRIMARY_FLAG":e};
    console.log(flag);
    this._tableservice.flagupdate({...role,...item,...flag}).subscribe((res)=>{
      this.AllItemList(this.asuserid);
    })
  }


  refreshdata = (id)=>{
       var role = {"ROLE":this.myData};
       this._tableservice.postuserids({...id,...role}).subscribe((res) => {
     
        this.department = res.dept_list,
     this.zoneslist = res.zone_list,
       this.paysyslist = res.paysys_list,
       console.log(res);
      });
  }

   


  assigndepartment =  (form:NgForm)=>{

  //  var obj = this.department.rows[0].USER_ID;
  //  var userid = {"USER_ID":obj};
   this._tableservice.assigndepartservice({...this.asuserid,...form.value}).subscribe((res) => {
    this.AllItemList(this.asuserid);
    
  });
  }

  assignzone =  (form:NgForm)=>{

    // var obj = this.department.rows[0].USER_ID;
    // var userid = {"USER_ID":obj};
    this._tableservice.assignzoneservice({...this.asuserid,...form.value}).subscribe((res) => {
      this.AllItemList(this.asuserid);

   });
   
   }


   assignpaysys = (form:NgForm)=>{
    var obj = this.department.rows[0].USER_ID;
    var userid = {"USER_ID":obj};
    this._tableservice.assignpayservice({...userid,...form.value}).subscribe((res) => {
      this.AllItemList(this.asuserid);
     
   });
   }
  

 resetForm(form?: NgForm) {
   if (form)
  form.reset();
     this._tableservice.selectusers = {
        ROLE : this.myData,
   
   }
   this._tableservice.selectunassignitem = {
      REF_KEY : "",
      USER_ID : "",
      TYPE : "",
      EX_USER_ID : "",
      USER_NAME : "",
      USER_ZONE : "",
      ROLE : "",

}
  }


 



  
 

  addform = () =>{
    this.toggle = !this.toggle;
    $("#addForm").toggle();
  }

  


 



  submitform(form: NgForm){

   
    
      this.toggle = !this.toggle;
      $("#addForm").toggle();
  this._tableservice.userslistpost(form.value).subscribe((res)=>{
    //  this.resetForm(form);
    this.showdata = res.result;
    this.toastr.success(res.message, 'Users List');

  });


}


unassigndepartment = (form:NgForm)=>{
  this._tableservice.unassignitemservice(form.value).subscribe((res)=>{
    //  this.resetForm(form);
    this.AllItemList(this.asuserid);
    this.toastr.success(res.message, 'remove department');

  });
}
unassignzone = (form:NgForm)=>{
  this._tableservice.unassignitemservice(form.value).subscribe((res)=>{
    //  this.resetForm(form);
    this.AllItemList(this.asuserid);
    this.toastr.success(res.message, 'remove department');

  });
}
unassignpay = (form:NgForm)=>{
  this._tableservice.unassignitemservice(form.value).subscribe((res)=>{
    //  this.resetForm(form);
    this.AllItemList(this.asuserid);
    this.toastr.success(res.message, 'remove department');

  });
}


onEdit(unassign: unassignitem,bt:string) {

  this.btn_name = "Update";
  this._tableservice.selectunassignitem = unassign;
  this.selecteddepartRow = unassign;
  this.departsendrefkey = JSON.stringify(this.selecteddepartRow.REF_KEY);

}


onEditZone(unassign: unassignitem,bt:string) {
  this.btn_name = "Update";
  this._tableservice.selectunassignitem = unassign;
  this.selectedzoneRow = unassign;
  console.log(this.selectedzoneRow);
  this.departsendrefkey = JSON.stringify(this.selectedzoneRow.REF_KEY);
  
}
onEditpaysys(unassign: unassignitem,bt:string) {
  this.btn_name = "Update";
  this._tableservice.selectunassignitem = unassign;
  this.selectedpay = unassign;
  console.log(this.selectedpay);
  this.departsendrefkey = JSON.stringify(this.selectedpay.REF_KEY);
  
}



deleteSelected(form: NgForm){
  this.delete_toggle = !this.delete_toggle;
  var myData = localStorage.getItem('Role');
    console.log(myData);
    if(myData === "makers")
    {
  
      this.SelectedIDs.forEach( (obj) => {
        this._tableservice.neutraldelpage(obj).subscribe((res) => {
          // this.refreshEmployeeList();
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
ChkdeleteSelected(form:NgForm,paysys:usersscheme)
{

    this._tableservice.selectusers = paysys;
    this.selectedpaysysRow = paysys;
    console.log(form.value,paysys);

      this._tableservice.neudelapproved({...form.value,...paysys}).subscribe((res) => {
        //  this.refreshEmployeeList();
        this.toastr.success('Data Delete Successfully', 'Approved');
     
      });
  


}

}
