import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {TableDataService} from '../../shared/table-data.service';
import {internalwatchlist} from '../../shared/tabular';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-internallist-watchlist',
  templateUrl: './internallist-watchlist.component.html',
  styleUrls: ['./internallist-watchlist.component.css'],
  providers: [TableDataService]
})
export class InternallistWatchlistComponent implements OnInit {
  public showinternawatch:any = [];
  p: number = 1;
  constructor(public _tableservice:TableDataService, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.resetinternalwatchForm();
    this.refreshinterwatchList();
  }
 
  resetinternalwatchForm(forms?: NgForm) {
    if (forms)
    forms.reset();
    this._tableservice.selectedinterwatch = {
      UID_SERIAL_NO: "",
      ZONE_ID : "",
      WATCHLIST_ID : "",
      WATCHLIST_NAME : "",
      CUSTOMER_NAME_ENGLISH : "",
      CUSTOMER_NAME_ARABIC :"",
      CUSTOMER_TYPE:"",
      CITY :"",
      CUSTOMER_ACCOUNT : "",
      DOB : "",
      RESIDENCE_COUNTRY : "",
      RESIDENCE_COUNTRY_FLAG: "",
      NATIONALITY : "",
      ID_NUMBER: "",
      ID_TYPE :"",
      KNOWN_AS_NAME_ENGLISH :  "",
      KNOWN_AS_NAME_ARABIC :  "",
      MOTHER_NAME :  "",
      ADDRESS:  "",
      REMARKS:  "",
      CIN : "",
      NEW_PAN : "",
      SOURCE:  "",
      CUSTOMER_STATUS :  "",
      BRANCH :  "",
      CUSTOMER_RISK_LEVEL :  "",
      CUSTOMER_CREATE_DATE:  "",
      CUST_RISK_LEVEL_UPDATE_DATE :  "",
      POLITICALLY_EXPOSED:  "",
      DETAILS_PROGRAMS:  "",
      OTHERS_REMARKS :  "",
      OTHERS_DATA_SOURCES : "",
      OTHERS_RELATED_TO : "",
    }
  }

 
  submitwatch(forms: NgForm){
    console.log(forms.value);
    if (forms.value.uid_serial_no == "") {
  this._tableservice.postinterwatch(forms.value).subscribe((res)=>{
    this.resetinternalwatchForm(forms);
    this.refreshinterwatchList();
    this.toastr.success('data inserted successfully', 'Internal-Watchlist');

  });
}
else
{
  this._tableservice.putinterwatch(forms.value).subscribe((res)=>{
    this.resetinternalwatchForm(forms);
    this.refreshinterwatchList();
    this.toastr.info('data updated successfully', 'Internal-Watchlist');
});
}
  }
  refreshinterwatchList(){
    this._tableservice.fetchinterwatch().subscribe(
      data => this.showinternawatch = data,
      error => console.log('oops', error)
    );
  }
  
  onEdit(interwatch: internalwatchlist) {
    this._tableservice.selectedinterwatch = interwatch;
  }

  onDelete(UID_SERIAL_NO: string, forms: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this._tableservice.deleteinterwatch(UID_SERIAL_NO).subscribe((res) => {
        this.refreshinterwatchList();
        this.resetinternalwatchForm(forms);
        this.toastr.warning('Delete', 'Internal-Watchlist');
      });
    }
  }


   
  
  
  


   


  }
 

