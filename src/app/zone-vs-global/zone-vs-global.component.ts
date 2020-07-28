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
constructor(public _tableservice:TableDataService,public _authservice:AuthserviceService,  private toastr: ToastrService,private _location: Location) {

this.myData = localStorage.getItem('Role');
this.UserId = localStorage.getItem('Id');
this.UserName = localStorage.getItem('Username');

}

ngOnInit(): void {

this.resetForm();
this.refreshList();

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
HIST_ID :"",
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

deleteSelected(formdata: NgForm) {
this.delete_toggle = !this.delete_toggle;
var myData = localStorage.getItem('Role');
if(myData === "makers")
{
this.SelectedIDs.forEach( (obj) => {
this._tableservice.deletezvg(obj).subscribe((res) => {
this.refreshList();
this.resetForm(formdata);
this.toastr.warning('Data Delete Successfully', 'Zone Vs Global Words');
});
});
}
}

ChkdeleteSelected(formdata:NgForm,zvg:Zonevsglobal)
{

this._tableservice.selectedzvg = zvg;
this.selectedZoneRow = zvg;
console.log(formdata.value,zvg);

this._tableservice.zvgapproved({...formdata.value,...zvg}).subscribe((res) => {
this.refreshList();
this.toastr.success('Successfully', 'Approved');

});



}
ChkNotdeleteSelected(formdata:NgForm,neuscheme:Zonevsglobal)
{


this._tableservice.selectedzvg = neuscheme;
this.selectedZoneRow = neuscheme;
console.log(formdata.value,neuscheme);
this._tableservice.zvgdisapproved({...formdata.value,...neuscheme}).subscribe((res) => {
this.refreshList();

this.toastr.info('Successfully', 'Disapproved');
});

}


}



