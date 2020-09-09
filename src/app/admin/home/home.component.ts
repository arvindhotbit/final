import { Component, Input, OnInit } from '@angular/core';
import { AuthserviceService } from '../../auth/authservice.service';
import { TableDataService } from '../../shared/table-data.service';
import { Auth } from '../../auth/auth';
import { Observable } from 'rxjs';
import { parseJSON } from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectauth: Auth;
  myData: string;
  data: any = [];
  logotitle = "Trustling - Real Time Screening";
  features = [];
  _access: boolean;
  neutral: string;

  constructor(public _authservice: AuthserviceService, public _tableservice: TableDataService) {


  }

  ngOnInit(): void {
    this.myData = localStorage.getItem('Role');
    // this.countdata();
   this._access_management();
  }
  
  _access_management = ()=>{
    if (this.myData === "admin") {
            this.features = [
              { "name": "Register", "icon": "fa-users", "pagelink": "register" },
              { "name": "Users list", "icon": "fa-list", "pagelink": "users" },
              { "name": "Department", "icon": "fa-object-ungroup", "pagelink": "department" },
              { "name": "PaysysId", "icon": "fa-outdent", "pagelink": "paysys" },
              { "name": "Zone List", "icon": "fa-plus-circle", "pagelink": "add-zone" },
              { "name": "Manage Roles", "icon": "fa-plus-circle", "pagelink": "roles_manage" },
    
            ];
          }
  }

  // countdata(): void {
  //   this._tableservice.fetchcount().subscribe((res) => {
  //     this.data = res;
   

  //     if (this.myData === "checkers") {
  //       this._access = true;
  //       this.features = [
  //         { "name": "netural Words", "icon": "fa-minus-circle", "pagelink": "neutralwords", "insert": this.data.neutral_words[0].NW_I_COUNT, "delete": this.data.neutral_words[0].NW_D_COUNT, "update": this.data.neutral_words[0].NW_U_COUNT },
  //         { "name": "payement screening", "icon": "fa-credit-card", "pagelink": "payment-screen-adk", "insert": this.data.ps_fields_adk[0].ADK_I_COUNT, "delete": this.data.ps_fields_adk[0].ADK_D_COUNT, "update": this.data.ps_fields_adk[0].ADK_U_COUNT },
  //         { "name": "name screening", "icon": "fa-user", "pagelink": "name-screen", "insert": this.data.ns_fields[0].NS_I_COUNT, "delete": this.data.ns_fields[0].NS_D_COUNT, "update": this.data.ns_fields[0].NS_U_COUNT },
  //         { "name": "threshold Mangement", "icon": "fa-support", "pagelink": "match-score-threshold", "insert": this.data.match_score_threshold[0].MST_I_COUNT, "delete": this.data.match_score_threshold[0].MST_D_COUNT, "update": this.data.match_score_threshold[0].MST_U_COUNT },
  //         { "name": "Internal list management", "icon": "fa-list-ul", "pagelink": "internamanagement", "insert": this.data.internal_list_def[0].ILD_I_COUNT, "delete": this.data.internal_list_def[0].ILD_D_COUNT, "update": this.data.internal_list_def[0].ILD_U_COUNT },
  //         { "name": "Politicaly Exposed person", "icon": "fa-users", "pagelink": "politicaly-Exposed-Person", "insert": this.data.screen_pep[0].SPEP_I_COUNT, "delete": this.data.screen_pep[0].SPEP_I_COUNT, "update": this.data.screen_pep[0].SPEP_I_COUNT },
  //         { "name": "zone vs Golbal Keywords", "icon": "fa-globe", "pagelink": "zonevsglobal", "insert": this.data.zone_global_keywords[0].ZGK_I_COUNT, "delete": this.data.zone_global_keywords[0].ZGK_D_COUNT, "update": this.data.zone_global_keywords[0].ZGK_U_COUNT },
  //         // { "name": "stripping detection", "icon": "fa-street-view", "pagelink": "neutralwords","insert":this.data.neutral_words[0].ZGK_I_COUNT,"delete":this.data.zone_global_keywords[0].ZGK_D_COUNT,"update":this.data.zone_global_keywords[0].ZGK_U_COUNT },
  //         // { "name": "customer basic number position", "icon": "fa-building-o", "pagelink": "neutralwords","insert":this.data.neutral_words[0].NW_I_COUNT,"delete":this.data.neutral_words[0].NW_D_COUNT,"update":this.data.neutral_words[0].NW_U_COUNT },
  //         //{ "name": "Add new zone", "icon": "fa-plus-circle", "pagelink": "add-zone" },
  //         { "name": "Sensitive Word", "icon": "fa-plus-circle", "pagelink": "sensitive-word", "insert": this.data.sensitive_words[0].SW_I_COUNT, "delete": this.data.sensitive_words[0].SW_D_COUNT, "update": this.data.sensitive_words[0].SW_U_COUNT },
  //         { "name": "Blacklist Bic", "icon": "fa-plus-circle", "pagelink": "blacklistedbic", "insert": this.data.blacklisted_bic[0].BIC_I_COUNT, "delete": this.data.blacklisted_bic[0].BIC_D_COUNT, "update": this.data.blacklisted_bic[0].BIC_U_COUNT },
  //         { "name": "High Risk Countries", "icon": "fa-plus-circle", "pagelink": "highriskcountries", "insert": this.data.high_risk_countries[0].HRC_I_COUNT, "delete": this.data.high_risk_countries[0].HRC_D_COUNT, "update": this.data.high_risk_countries[0].HRC_U_COUNT },
  //         { "name": "Sanctioned Cities", "icon": "fa-plus-circle", "pagelink": "sanctionedcities", "insert": this.data.sanctioned_cities[0].SC_I_COUNT, "delete": this.data.sanctioned_cities[0].SC_D_COUNT, "update": this.data.sanctioned_cities[0].SC_U_COUNT },
  //         //{ "name": "Case Listing", "icon": "fa-plus-circle", "pagelink": "case-listing" }




  //       ];

  //     }
  //     else if (this.myData === "makers") {
  //       this._access = false;
  //       this.features = [
  //         { "name": "netural Words", "icon": "fa-minus-circle", "pagelink": "neutralwords" },
  //         { "name": "payement screening", "icon": "fa-credit-card", "pagelink": "payment-screen-adk" },
  //         { "name": "name screening", "icon": "fa-user", "pagelink": "name-screen" },
  //         { "name": "threshold Mangement", "icon": "fa-support", "pagelink": "match-score-threshold" },
  //         { "name": "Internal list management", "icon": "fa-list-ul", "pagelink": "internamanagement" },
  //         { "name": "Politicaly Exposed person", "icon": "fa-users", "pagelink": "politicaly-Exposed-Person" },
  //         { "name": "zone vs Golbal Keywords", "icon": "fa-globe", "pagelink": "zonevsglobal" },
  //         { "name": "stripping detection", "icon": "fa-street-view", "pagelink": "neutralwords" },
  //         { "name": "customer basic number position", "icon": "fa-building-o", "pagelink": "neutralwords" },

  //         { "name": "Sensitive Word", "icon": "fa-plus-circle", "pagelink": "sensitive-word" },
  //         { "name": "Blacklist Bic", "icon": "fa-plus-circle", "pagelink": "blacklistedbic" },
  //         { "name": "High Risk Countries", "icon": "fa-plus-circle", "pagelink": "highriskcountries" },
  //         { "name": "Sanctioned Cities", "icon": "fa-plus-circle", "pagelink": "sanctionedcities" },
  //         { "name": "Case Listing", "icon": "fa-plus-circle", "pagelink": "case-listing" }
  //       ];
  //     }
  //     else if (this.myData === "admin") {
  //       this.features = [
  //         { "name": "Register", "icon": "fa-users", "pagelink": "register" },
  //         { "name": "Users list", "icon": "fa-list", "pagelink": "users" },
  //         { "name": "Department", "icon": "fa-object-ungroup", "pagelink": "department" },
  //         { "name": "PaysysId", "icon": "fa-outdent", "pagelink": "paysys" },
  //         { "name": "Zone List", "icon": "fa-plus-circle", "pagelink": "add-zone" },
  //         { "name": "Roles", "icon": "fa-plus-circle", "pagelink": "roles_manage" },

  //       ];
  //     }
  //   });
  // }







}








 







