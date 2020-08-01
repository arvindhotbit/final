import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormArray, FormControl, FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import { TableDataService } from '../shared/table-data.service';
import { AuthserviceService } from '../auth/authservice.service';
import { Neutralscheme } from '../shared/tabular';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { element } from 'protractor';
import { data, parseJSON } from 'jquery';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
@Component({
  selector: 'app-neutral-words',
  templateUrl: './neutral-words.component.html',
  styleUrls: ['./neutral-words.component.css'],
  providers: [TableDataService]
})


export class NeutralWordsComponent implements OnInit {
  public pageSize: number = 10;
  public myData: string;
  public UserId: string;
  public UserName: string;
  selectedAllclone: any;
  public showdata: any = [];
  p: number = 1;
  count: Number = 20;
  nsn = true;
  zoneid = true;
  noiseword = true;
  IS_DELETE = false;
  IS_UPDATE = false;
  ref_keys = false;
  DELETE_FLG = false;
  selectedNeutralRow: Neutralscheme;
  public selectedAll = "";
  public SelectedIDs: any = [];
  public SelectedhistIDs: any = [];
  checkbox: boolean;
  filteredArray: any = [];
  is_edit: boolean = true;
  isButtonClass: boolean;
  valuedelete: string = "";
  _isaccess: boolean;
  updatemark: string;
  status_alph: string = "";
  flag: string = "";
  toggle = true;
  delete_toggle = true;
  clone: any;
  zone: string = "";
  noise: string = "";
  oldzone: string = "";
  oldnoise: string = "";
  changetype: string = "";
  apstatus: string = "";
  btn_name: string = "Submit";
  isdelete_button: boolean = true;
  tbl_header: any = [];
  zoneidcol: boolean = true;
  noisewordcol: boolean = true;
  oldzoneidcol: boolean = true;
  oldnoisewordcol: boolean = true;
  changetypecol: boolean = true;
  xbunch: string;
  ybunch: string;
  formact: string = "Add Record";
  masterSelected: boolean;
  checkedList: any;
  histmasterSelected: boolean;
  histcheckedList: any;
  constructor(public _tableservice: TableDataService, public _authservice: AuthserviceService, private toastr: ToastrService, private _location: Location) {
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
      this.formact = "Update Record";
      console.log("add" + this.SelectedIDs, this.SelectedIDs.length);
    });
  }





  histcheckUncheckAll() {
    for (var i = 0; i < this.showdata.length; i++) {
      this.showdata[i].isSelected = this.histmasterSelected;
      console.log(this.histmasterSelected);
    }
    this.getCheckedItemhistList();
  }
  histisAllSelected() {
    this.histmasterSelected = this.showdata.every(function (item: any) {
      return item.isSelected == true;
    })
    this.getCheckedItemhistList();
  }

  getCheckedItemhistList() {
    this.histcheckedList = [];
    for (var i = 0; i < this.showdata.length; i++) {
      if (this.showdata[i].isSelected)
        this.histcheckedList.push(this.showdata[i]);
    }
    // this.checkedList = JSON.stringify(this.checkedList);
    this.histcheckedList.forEach(element => {
      this.SelectedIDs.push(element.HIST_ID);
      this.ybunch = this.SelectedIDs.toString();
      console.log("add" + this.SelectedIDs, this.SelectedIDs.length);
    });
  }




  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this._tableservice.selectedneu = {
      REF_KEY: "",
      ROLE: this.myData,
      USER_ID: this.UserId,
      USER_NAME: this.UserName,
      USER_ZONE: "QA",
      NOISE_WORD: "",
      ZONE_ID: "",
      HIST_ID: this.ybunch,
      APPROVE_STATUS: this.apstatus,
      CHANGE_TYPE: ""

    }
  }


  backClicked() {
    this._location.back();
  }

  refreshEmployeeList() {
    var myData = localStorage.getItem('Role');
    console.log(myData);
    if (myData === "makers") {
      this._tableservice.neutrallistpage().subscribe((res) => {
        this.showdata = res.result;
        this.tbl_header = res.metadata;
        console.log(this.tbl_header);
      })



      this.valuedelete = "1";
      this._isaccess = false;
      this.updatemark = "1";

    }
    else if (myData === "checkers") {
      this._tableservice.neutrallistpage().subscribe((res) => {
        this.showdata = res.result;
        this.tbl_header = res.metadata;
        console.log(this.showdata);
      })
      this.valuedelete = "y";
      this._isaccess = true;
      this.updatemark = "y";


    }
  }



  addform = () => {
    this.toggle = !this.toggle;
    $("#addForm").toggle();
  }








  submitform(form: NgForm) {


    if (form.value.REF_KEY == "") {
      this.toggle = !this.toggle;
      $("#addForm").toggle();
      this._tableservice.neutrallistpost(form.value).subscribe((res) => {
        //  this.resetForm(form);
        this.refreshEmployeeList();
        this.toastr.success('data inserted successfully', 'Neutral Words');

      });
    }
    else {
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





  onEdit(neuscheme: Neutralscheme, bt: string) {
    this.btn_name = "Update";
    this._tableservice.selectedneu = neuscheme;
    this.selectedNeutralRow = neuscheme;
  }




  deleteSelected(form: NgForm) {
    this.delete_toggle = !this.delete_toggle;
    var myData = localStorage.getItem('Role');
    console.log(myData);
    if (myData === "makers") {


      this._tableservice.neutraldelpage(this.xbunch).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
        this.toastr.warning(res.message, 'Neutral Words');
      });

    }

  }
  changetext(status: string, form: NgForm) {
    this.apstatus = status;
    this.myData = localStorage.getItem('Role');
    this.UserId = localStorage.getItem('Id');
    this.UserName = localStorage.getItem('Username');
    console.log(this.apstatus);
  }
  changetextr(status: string, form: NgForm) {
    this.apstatus = status;
    this.myData = localStorage.getItem('Role');
    this.UserId = localStorage.getItem('Id');
    this.UserName = localStorage.getItem('Username');
    console.log(this.apstatus);
  }
  ChkdeleteSelected(form: NgForm) {

    this._tableservice.neudelapproved(form.value).subscribe((res) => {
      this.refreshEmployeeList();
      this.toastr.success(res.message, 'Approved');

    });
  }

}
