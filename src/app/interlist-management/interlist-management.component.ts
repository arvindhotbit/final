import { Component,Input, OnInit } from '@angular/core';
import {AuthserviceService} from '../auth/authservice.service';
import {TableDataService} from '../shared/table-data.service';
import {Auth } from '../auth/auth';


@Component({
  selector: 'app-interlist-management',
  templateUrl: './interlist-management.component.html',
  styleUrls: ['./interlist-management.component.css']
})
export class InterlistManagementComponent implements OnInit {

  selectauth : Auth;
  myData : string;
   logotitle = "Trustling - Real Time Screening";
   features = [];

  constructor(public _authservice:AuthserviceService, public _tableservice:TableDataService) {
  

   }

  ngOnInit(): void {
   this.myData = localStorage.getItem('Role');
     this.check();
  }
  check()
  {
    if(this.myData === "checkers")
    {
      this.features = [
        {"name" :"Internal Watchlist","icon":"fa-minus-circle","pagelink":"internawatchlist"},
        {"name":"Internal Watchlist Defination","icon":"fa-credit-card","pagelink":"internallist"},
      
        
       ];
     
    }
    else if(this.myData === "makers"){
      this.features = [
        {"name" :"Internal Watchlist","icon":"fa-minus-circle","pagelink":"internawatchlist"},
        {"name":"Internal Watchlist Defination","icon":"fa-credit-card","pagelink":"internallist"},
  
       ];
      }
  }
  
   
}

