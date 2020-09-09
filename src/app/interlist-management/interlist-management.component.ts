import { Component,Input, OnInit } from '@angular/core';
import {AuthserviceService} from '../auth/authservice.service';
import {TableDataService} from '../shared/table-data.service';
import {Auth } from '../auth/auth';
import {Location} from '@angular/common';
import { parseJSON } from 'jquery';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-interlist-management',
  templateUrl: './interlist-management.component.html',
  styleUrls: ['./interlist-management.component.css']
})
export class InterlistManagementComponent implements OnInit {

  selectauth : Auth;
  myData : string;
  _data: any = [];
   logotitle = "Trustling - Real Time Screening";
   features = [];
   _page_authority:any;
   _checkout_count = false;
  constructor(public _authservice:AuthserviceService, public _tableservice:TableDataService,private toastr: ToastrService,private _location: Location) {
  

   }

  ngOnInit(): void {
   this.myData = localStorage.getItem('Role');
    //  this.check();
     this._access_management();
  }
 
    
    _access_management = ()=>{
      this._tableservice.getassignaccesslist().subscribe((res) => {
        var orig_value = res.result;
        this._page_authority = parseJSON(orig_value);
        if((this._page_authority.internallistdef.view == true) && (this._page_authority.internallistdef.approval == false))
        {
     
         let obj = { "name": "Internal Defination List", "icon": "fa-plus-circle", "pagelink": "internaldeflist", "visible":true  }
          this.features.push(obj);
        }
        if((this._page_authority.internallistdef.view == true) && (this._page_authority.internallistdef.approval == true))
        {
          this._checkout_count = true;
          let chkobj = { "count_access":true, "name": "Internal Defination List", "icon": "fa-plus-circle", "pagelink": "internaldeflist","visible":true , "insert": this._data.high_risk_countries[0].HRC_I_COUNT, "delete": this._data.high_risk_countries[0].HRC_D_COUNT, "update": this._data.high_risk_countries[0].HRC_U_COUNT };
          this.features.push(chkobj);
        }

        if((this._page_authority.internallistwatchlist.view == true) && (this._page_authority.internallistwatchlist.approval == false))
        {
     
         let obj = { "name": "Internal Watchlist List", "icon": "fa-plus-circle", "pagelink": "internalwatchlist", "visible":true  }
          this.features.push(obj);
        }
        if((this._page_authority.internallistwatchlist.view == true) && (this._page_authority.internallistwatchlist.approval == true))
        {
          this._checkout_count = true;
          let chkobj = { "count_access":true, "name": "Internal Watchlist", "icon": "fa-plus-circle", "pagelink": "internalwatchlist","visible":true , "insert": this._data.high_risk_countries[0].HRC_I_COUNT, "delete": this._data.high_risk_countries[0].HRC_D_COUNT, "update": this._data.high_risk_countries[0].HRC_U_COUNT };
          this.features.push(chkobj);
        }
      
   
    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');
     

      //throw error;   //You can also throw the error to a global error handler
    });
  }
  // check()
  // {
  //   if(this.myData === "checkers")
  //   {
  //     this.features = [
  //       {"name" :"Internal Watchlist","icon":"fa-minus-circle","pagelink":"internawatchlist"},
       
      
        
  //      ];
     
  //   }
  //   else if(this.myData === "makers"){
  //     this.features = [
  //       {"name" :"Internal Watchlist","icon":"fa-minus-circle","pagelink":"internawatchlist"},
  //       {"name":"Internal Watchlist Defination","icon":"fa-credit-card","pagelink":"internallist"},
  
  //      ];
  //     }
  // }
  
   
}

