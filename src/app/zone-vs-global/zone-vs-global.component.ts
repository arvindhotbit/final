import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {TableDataService} from '../shared/table-data.service';
import {AuthserviceService} from '../auth/authservice.service';
import {Zonevsglobal} from '../shared/tabular';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import {Location} from '@angular/common';
@Component({
selector: 'app-zone-vs-global',
templateUrl: './zone-vs-global.component.html',
styleUrls: ['./zone-vs-global.component.css']
})
export class ZoneVsGlobalComponent implements OnInit {
public showzvg:any = [];
public pageSize: number = 10;
public myData:string;
public UserId:string;
public UserName:string;
selectedAll: any;
listtitle : string = "Zone Vs Global Keywords";
p: number = 1;
showhidepregnant: boolean = false;
_isaccess : boolean;
updatemark : string;
thead = ["Serial No.","PROGRAM_KEYWORD","PROGRAM_KEYWORD_DESC"];
SERIAL = true;
PROGRAMKEYWORD = true;
PROGRAMKEYWORDDESC = true;
PAYSYSID = false;
SCOPES =false;
ZONEID=true;
pkey : string = "";
pkeyw : string = "";
changetype:string = "";
oldpkey:string = "";
oldpkeyword:string = "";
selectedZoneRow : Zonevsglobal;
public SelectedIDs:any = [];
apstatus:string = "";
btn_name :string = "Submit";
isdelete_button:boolean = true;
valuedelete : string="" ;
_isaccesszvg : boolean;
toggle = true;
delete_toggle = true;
xbunch: string;
ybunch: string;
formact: string = "Add Record";
masterSelected: boolean;
checkedList: any;
histmasterSelected: boolean;
histcheckedList: any;
constructor(public _tableservice:TableDataService,public _authservice:AuthserviceService,  private toastr: ToastrService,private _location: Location) {

this.myData = localStorage.getItem('Role');
this.UserId = localStorage.getItem('Id');
this.UserName = localStorage.getItem('Username');
this.getCheckedItemList();
this.getCheckedItemhistList();

}

ngOnInit(): void {

this.resetForm();
this.refreshList();

}
checkUncheckAll() {
    for (var i = 0; i < this.showzvg.length; i++) {
      this.showzvg[i].isSelected = this.masterSelected;
      console.log("master", this.masterSelected);
    }
    this.getCheckedItemList();
  }
  isAllSelected() {
    this.masterSelected = this.showzvg.every(function (item: any) {
      return item.isSelected == true;
    })
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.showzvg.length; i++) {
      if (this.showzvg[i].isSelected)
        this.checkedList.push(this.showzvg[i].REF_KEY);
    }
    // this.checkedList = JSON.stringify(this.checkedList);
    this.xbunch = this.checkedList.toString();
    this.isdelete_button = false;
  }





  histcheckUncheckAll() {
    for (var i = 0; i < this.showzvg.length; i++) {
      this.showzvg[i].isSelected = this.histmasterSelected;
      console.log(this.histmasterSelected);
    }
    this.getCheckedItemhistList();
  }
  histisAllSelected() {
    this.histmasterSelected = this.showzvg.every(function (item: any) {
      return item.isSelected == true;
    })
    this.getCheckedItemhistList();
  }

  getCheckedItemhistList() {
    this.histcheckedList = [];
    for (var i = 0; i < this.showzvg.length; i++) {
      if (this.showzvg[i].isSelected)
        this.histcheckedList.push(this.showzvg[i].HIST_ID);
    }
    // this.checkedList = JSON.stringify(this.checkedList);
    this.ybunch = this.histcheckedList.toString();
    console.log(this.ybunch);
  }



addform = () =>{
this.toggle = !this.toggle;
$("#addzoneform").toggle();
}

backClicked() {
this._location.back();
}


resetForm(formdata?: NgForm) {
if (formdata)
formdata.reset();
this._tableservice.selectedzvg = {
ZONE_ID: "",
PROGRAM_KEYWORD: "",
PROGRAM_KEYWORD_DESC: "",
REF_KEY : "",
PAYSYS_ID : "",
SCOPE : "",
ROLE : this.myData,
USER_ID : this.UserId,
USER_NAME : this.UserName,
USER_ZONE : "QA",
HIST_ID :this.ybunch,
APPROVE_STATUS : this.apstatus,
CHANGE_TYPE : ""
}
}
submitform(formdata: NgForm){

if (formdata.value.REF_KEY == "") {
this.toggle = !this.toggle;
$("#addzoneform").toggle();

this._tableservice.postzvg(formdata.value).subscribe((res)=>{
console.log(formdata.value);
// this.resetForm(formdata);
this.refreshList();
this.toastr.success('data inserted successfully', 'Zone Vs Global Words');

});
}

else {
this.toggle = !this.toggle;
$("#addzoneform").toggle();
this._tableservice.putzvg(formdata.value).subscribe((res) => {
// this.resetForm(formdata);
this.refreshList();
this.toastr.info('data update successfully', 'Zone Vs Global Words');
});

}
}
// refreshList(){
//   this._tableservice.fetchzvg()
//   .subscribe(
//     data => this.showzvg = data.result,
//     error => console.log('oops', error)
//   );
// }

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
refreshList()
{
var myData = localStorage.getItem('Role');
console.log(myData);
if(myData === "makers")
{
this._tableservice.fetchzvg().subscribe((res)=>{
this.showzvg = res.result;
console.log(this.showzvg);
})



this.valuedelete = "1";
this._isaccesszvg = false;
this.updatemark = "1";

}
else if(myData === "checkers")
{
this._tableservice.fetchzvg().subscribe((res)=>{
this.showzvg = res.result;
console.log(this.showzvg);
})
this.valuedelete = "y";
this._isaccesszvg = true;
this.updatemark = "y";


}
}




onEdit(zvg: Zonevsglobal) {

this._tableservice.selectedzvg = zvg;
this.selectedZoneRow = zvg;


}
deleteSelected(form: NgForm) {
  this.delete_toggle = !this.delete_toggle; 
    this._tableservice.deletezvg(this.xbunch).subscribe((res) => {
      this.refreshList();
      this.resetForm(form);
      this.toastr.warning(res.message, 'NAME SCREEN');
    });

}
ChkdeleteSelected(form: NgForm) {

  this._tableservice.zvgapproved(form.value).subscribe((res) => {
    this.refreshList();
    this.toastr.success(res.message, 'Approved');

  });
}





}



