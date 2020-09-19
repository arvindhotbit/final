import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TableDataService } from '../shared/table-data.service';
import { AuthserviceService } from '../auth/authservice.service';
import { Zonevsglobal } from '../shared/tabular';
import { data, parseJSON } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { Location } from '@angular/common';
@Component({
  selector: 'app-zone-vs-global',
  templateUrl: './zone-vs-global.component.html',
  styleUrls: ['./zone-vs-global.component.css']
})
export class ZoneVsGlobalComponent implements OnInit {
  public showzvg: any = [];
  public pageSize: number = 10;
  public myData: string;
  public UserId: string;
  public UserName: string;
  selectedAll: any;
  _InsertButtonAccess:boolean;
  _DeleteButtonAccess:boolean;
  _updateButtonAccess:boolean;
  listtitle: string = "Zone Vs Global Keywords";
  p: number = 1;
  showhidepregnant: boolean = false;
  _isaccess: boolean;
  updatemark: string;
  thead = ["Serial No.", "PROGRAM_KEYWORD", "PROGRAM_KEYWORD_DESC"];
  SERIAL = true;
  PROGRAMKEYWORD = true;
  PROGRAMKEYWORDDESC = true;
  PAYSYSID = false;
  SCOPES = false;
  ZONEID = true;
  pkey: string = "";
  pkeyw: string = "";
  changetype: string = "";
  userzone :string;
  oldpkey: string = "";
  oldpkeyword: string = "";
  selectedZoneRow: Zonevsglobal;
  public SelectedIDs: any = [];
  apstatus: string = "";
  btn_name: string = "Submit";
  isdelete_button: boolean = true;
  valuedelete: string = "";
  _isaccesszvg: boolean;
  toggle = true;
  delete_toggle = true;
  xbunch: string;
  ybunch: string;
  formact: string = "Add Record";
  masterSelected: string[];
  checkedList: any;
  histmasterSelected: string[];
  histcheckedList: any;
  zonearray: string;
  zonevalue: string;
  _page_authority: any;
  orig_value: any;
  constructor(public _tableservice: TableDataService, public _authservice: AuthserviceService, private toastr: ToastrService, private _location: Location) {
    this.masterSelected = [];
    this.histmasterSelected = [];
    this.myData = localStorage.getItem('Role');
    this.UserId = localStorage.getItem('Id');
    this.UserName = localStorage.getItem('Username');
    this.userzone = localStorage.getItem('UserZone');
 

  }

  ngOnInit(): void {

    this.resetForm();
    this.refreshEmployeeList();
    this.getZonelist();
    this.zonevalue = this.userzone;
    this.onZoneChange(this.userzone);
    this.sendButtonClick();
    this.viewmessage();
  }

  sendButtonClick() {
    this._tableservice.sendMessage(null)
  }
 
  viewmessage()
  {
    
    this._tableservice.onNewMessage().subscribe(msg => {
      console.log('got a msg: ' , msg);
      if(msg.reload == true)
      {
        this.onZoneChange(this.zonevalue);
    
    }
  });
}
  
  isItemChecked(id) {
    return this.masterSelected.includes(id)
  }


  checkUncheckAll() {
    if (this.masterSelected.length == this.showzvg.length) {
      this.masterSelected = []
    } else {
      this.masterSelected = this.showzvg.map(sdp => sdp.REF_KEY)
    }

  }
  isAllSelected(id) {
    if (this.masterSelected.includes(id)) {
      this.masterSelected = [...this.masterSelected].filter(ms => ms != id)
    } else {
      this.masterSelected = [...this.masterSelected, id]
    }

  }


  ishistItemChecked(id) {
    return this.histmasterSelected.includes(id)
  }


  histcheckUncheckAll() {
    if (this.histmasterSelected.length == this.showzvg.length) {
      this.histmasterSelected = []
    } else {
      this.histmasterSelected = this.showzvg.map(sdp => sdp.HIST_ID)
    }

  }
  histisAllSelected(id) {
    if (this.histmasterSelected.includes(id)) {
      this.histmasterSelected = [...this.histmasterSelected].filter(ms => ms != id)
    } else {
      this.histmasterSelected = [...this.histmasterSelected, id]
    }

  }


  getZonelist() {
    this._tableservice.getassignzonelist().subscribe((res) => {
      this.zonearray = res.result.rows;
      console.log(this.zonearray);
    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Zone vs Global Keywords');
     

      //throw error;   //You can also throw the error to a global error handler
    })
  }

  onZoneChange(zonevalue: any) {

    var obj = {
      "ROLE": this.myData,
      "USER_ZONE": zonevalue, "USER_ID": this.UserId, "CHANGE_TYPE": this.changetype
    };

    this._tableservice.getchangezonebiclist(obj).subscribe((res) => {
      this.showzvg = res.result;
  

    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Zone vs Global Keywords');
     

      //throw error;   //You can also throw the error to a global error handler
    });

  }

  addform = () => {
    this.toggle = !this.toggle;
    $("#addForm").toggle();
    $("#updateform").hide();
  }
  updateform = () => {
    if (this._tableservice.selectedzvg.REF_KEY == "") {
      alert("Update item select this row");
    }
    else {
      this.toggle = !this.toggle;
      $("#updateform").toggle();
      $("#addForm").hide();
    }

  }

  resetForm(formdata?: NgForm) {
    if (formdata)
      formdata.reset();
    this._tableservice.selectedzvg = {
      ZONE_ID: "",
      PROGRAM_KEYWORD: "",
      PROGRAM_KEYWORD_DESC: "",
      REF_KEY: "",
      PAYSYS_ID: "",
      SCOPE: "",
      ROLE: this.myData,
      USER_ID: this.UserId,
      USER_NAME: this.UserName,
      USER_ZONE: "QA",
      HIST_ID: this.ybunch,
      APPROVE_STATUS: this.apstatus,
      CHANGE_TYPE: ""
    }
  }
  submitform(formdata: NgForm) {

   
      this.toggle = !this.toggle;
      $("#addzoneform").toggle();

      this._tableservice.postzvg(formdata.value).subscribe((res) => {
        this.toastr.success(res.message, 'Zone Vs Global Words');

      },(error) => {                              //Error callback
        console.error('error caught in component')
        this.toastr.error(error, 'Zone vs Global Keywords');
       
  
        //throw error;   //You can also throw the error to a global error handler
      });
  

 
  }
  UpdateSubmitForm(form: NgForm) {
    this.toggle = !this.toggle;
    $("#updateForm").toggle();
    this._tableservice.putzvg(form.value).subscribe((res) => {
      this.masterSelected = [];
      this.toastr.info(res.message, 'Sensitive Words');
     
    }, (error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Sensitive Word');


      //throw error;   //You can also throw the error to a global error handler
    });

  }

 
  unseen()
  {
    this._tableservice.fetchzvg().subscribe((res)=>{
            this.showzvg = res.result;
    });
  }
  
  refreshEmployeeList() {
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
      if(this._page_authority.zonevsglobal.add == false)
          {
            this._InsertButtonAccess = false;
          }
          if(this._page_authority.zonevsglobal.add == true)
          {
            this._InsertButtonAccess = true;
          }
          if(this._page_authority.zonevsglobal.delete == false)
          {
            this._DeleteButtonAccess = false;
          }
          if(this._page_authority.zonevsglobal.delete == true)
          {
            this._DeleteButtonAccess = true;
          }
          if(this._page_authority.zonevsglobal.update == false)
          {
            this._updateButtonAccess = false;
          }
          if(this._page_authority.zonevsglobal.update == true)
          {
            this._updateButtonAccess = true;
          }
    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Zone vs Global Keywords');
     

      //throw error;   //You can also throw the error to a global error handler
    });
  }
 

  postChangetype(change_type) {
    if(this.zonevalue == null)
    {
      alert("Please Select a Zone");
    }
    else
    {
      const zonetype = { "CHANGE_TYPE": change_type,"USER_ZONE": this.zonevalue,"ROLE":this.myData,"USER_ID":this.UserId };
      this._tableservice.zvg_Change_Type(zonetype).subscribe((res) => {
        this.showzvg = res.result;
      }, (error) => {                              //Error callback
        console.error('error caught in component')
        this.toastr.error(error, 'Zone vs Global Keywords');
  
  
        //throw error;   //You can also throw the error to a global error handler
      });
    }

  }

  onEdit(zvg: Zonevsglobal) {

    this._tableservice.selectedzvg = zvg;
    this.selectedZoneRow = zvg;


  }
  deleteSelected(form: NgForm) {
    if (this.masterSelected.length <= 0) {
      alert("Delete Item Select This Row")
    }
    else {
      this._tableservice.deletezvg(this.masterSelected.join(',')).subscribe((res) => {
        this.toastr.warning(res.message, 'Sensitive Word');
        this.masterSelected = [];
      }, (error) => {
        console.error('error caught in component')
        this.toastr.error(error, 'Sensitive Word');



      });

    }


  }
 


  ChkdeleteSelected(status, form: NgForm) {
    if (this.histmasterSelected.length <= 0) {
      alert("check Item Select This Row")
    }
    else {
      var value1 = { "APPROVE_STATUS": status, "HIST_ID": this.histmasterSelected.join(',') }
      this._tableservice.zvgapproved({ ...form.value, ...value1 }).subscribe((res) => {
        this.histmasterSelected = [];
        this.toastr.success(res.message, status);

      }, (error) => {
        console.error('error caught in component')
        this.toastr.error(error, 'Sensitive Word');



      });

    }

  }

}



