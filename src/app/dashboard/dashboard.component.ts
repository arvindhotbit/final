import { Component, Input, OnInit } from '@angular/core';
import { AuthserviceService } from '../auth/authservice.service';
import { TableDataService } from '../shared/table-data.service';
import { Auth } from '../auth/auth';
import { Observable, concat } from 'rxjs';
import { parseJSON } from 'jquery';
import { ToastrService } from 'ngx-toastr';

type NewType = Observable<any>;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectauth: Auth;
  myData: string;
  _data: any = [];
  logotitle = "Trustling - Real Time Screening";
  features = [];
  _checkout_count = false;
  _access: boolean;
  neutral: string;
  _page_authority:any;
  constructor(public _authservice: AuthserviceService, public _tableservice: TableDataService,private toastr: ToastrService) {
    // this._page_authority = parseJSON(localStorage.getItem('authority'));

  }

  ngOnInit(): void {
    this.myData = localStorage.getItem('Role');
    // this.countdata();
          this._access_management();
          
  }
  
   


  _access_management = ()=>{
    // countdata(): void {
    this._tableservice.fetchcount().subscribe((data) => {
      this._data = data;
       this._tableservice.getassignaccesslist().subscribe((res) => {
      var orig_value = res.result;
      this._page_authority = parseJSON(orig_value);
     if((this._page_authority.neutral_words.view == true) && (this._page_authority.neutral_words.approval == false))
     {
       let obj = {"name": "netural Words", "icon": "fa-minus-circle", "pagelink": "neutralwords", "visible":true}
       this.features.push(obj);
    
    
    }
    if((this._page_authority.neutral_words.view == true) && (this._page_authority.neutral_words.approval == true))
    {
      this._checkout_count = true;
      let chkobj = {"count_access":true,"name": "netural Words", "icon": "fa-minus-circle", "pagelink": "neutralwords", "visible":true,"insert": this._data.neutral_words[0].NW_I_COUNT, "delete": this._data.neutral_words[0].NW_D_COUNT, "update": this._data.neutral_words[0].NW_U_COUNT};
      this.features.push(chkobj);
    }

// *******************************************************************************************************



    if((this._page_authority.blacklisted.view == true) && (this._page_authority.blacklisted.approval == false))
    {
      let obj = { "name": "Blacklist Bic", "icon": "fa-plus-circle", "pagelink": "blacklistedbic", "visible":true  };
      this.features.push(obj);
    }
    if((this._page_authority.blacklisted.view == true) && (this._page_authority.blacklisted.approval == true))
    {
      this._checkout_count = true;
      let chkobj = {"count_access":true, "name": "Blacklist Bic", "icon": "fa-plus-circle", "pagelink": "blacklistedbic","visible":true , "insert": this._data.blacklisted_bic[0].BIC_I_COUNT, "delete": this._data.blacklisted_bic[0].BIC_D_COUNT, "update": this._data.blacklisted_bic[0].BIC_U_COUNT };
      this.features.push(chkobj);
    }
// *******************************************************************************************************

    if((this._page_authority.highriskcountry.view == true) && (this._page_authority.highriskcountry.approval == false))
     {
  
      let obj = { "name": "High Risk Countries", "icon": "fa-plus-circle", "pagelink": "highriskcountries", "visible":true  }
       this.features.push(obj);
     }
     if((this._page_authority.highriskcountry.view == true) && (this._page_authority.highriskcountry.approval == true))
     {
       this._checkout_count = true;
       let chkobj = { "count_access":true, "name": "High Risk Countries", "icon": "fa-plus-circle", "pagelink": "highriskcountries","visible":true , "insert": this._data.high_risk_countries[0].HRC_I_COUNT, "delete": this._data.high_risk_countries[0].HRC_D_COUNT, "update": this._data.high_risk_countries[0].HRC_U_COUNT };
       this.features.push(chkobj);
     }
   
    // ******************************************************************************************************* 
    if((this._page_authority.internallistdef.view == true) && (this._page_authority.internallistdef.approval == false))
     {
      let obj =  { "name": "Internal list management", "icon": "fa-list-ul", "pagelink": "internamanagement", "visible":true }
      this.features.push(obj);
     }
     if((this._page_authority.internallistdef.view == true) && (this._page_authority.internallistdef.approval == true))
     {
       this._checkout_count = true;
       let chkobj = {"count_access":true, "name": "Internal list management", "icon": "fa-plus-circle", "pagelink": "internamanagement","visible":true , "insert": this._data.internal_list_def[0].ILD_I_COUNT, "delete": this._data.internal_list_def[0].ILD_D_COUNT, "update": this._data.internal_list_def[0].ILD_U_COUNT };
       this.features.push(chkobj);
     }
     // ******************************************************************************************************* 

     if((this._page_authority.matchscorethreshold.view == true) && (this._page_authority.matchscorethreshold.approval == false))
     {
   
      let obj =  { "name": "threshold Mangement", "icon": "fa-support", "pagelink": "match-score-threshold", "visible":true  }
     this.features.push(obj);
     }

     if((this._page_authority.matchscorethreshold.view == true) && (this._page_authority.matchscorethreshold.approval == true))
     {
       this._checkout_count = true;
       let chkobj = {"count_access":true, "name": "threshold Mangement", "icon": "fa-plus-circle", "pagelink": "match-score-threshold","visible":true , "insert": this._data.match_score_threshold[0].MST_I_COUNT, "delete": this._data.match_score_threshold[0].MST_D_COUNT, "update": this._data.match_score_threshold[0].MST_U_COUNT };
       this.features.push(chkobj);
     }

     // ******************************************************************************************************* 

     if((this._page_authority.namescreening.view == true) && (this._page_authority.namescreening.approval == false))
     {
   
      let obj = { "name": "name screening", "icon": "fa-user", "pagelink": "name-screen", "visible":true  }
       this.features.push(obj);
     }
     if((this._page_authority.namescreening.view == true) && (this._page_authority.namescreening.approval == true))
     {
       this._checkout_count = true;
       let chkobj = {"count_access":true, "name": "name screening", "icon": "fa-plus-circle", "pagelink": "name-screen","visible":true , "insert": this._data.ns_fields[0].NS_I_COUNT, "delete": this._data.ns_fields[0].NS_D_COUNT, "update": this._data.ns_fields[0].NS_U_COUNT };
       this.features.push(chkobj);
     }
       // ******************************************************************************************************* 
       if((this._page_authority.paymentscreenadk.view == true) && (this._page_authority.paymentscreenadk.approval == false))
     {
    
      let obj =  { "name": "payement screening", "icon": "fa-credit-card", "pagelink": "payment-screen-adk", "visible":true  }
      this.features.push(obj);
     }
     if((this._page_authority.paymentscreenadk.view == true) && (this._page_authority.paymentscreenadk.approval == true))
     {
       this._checkout_count = true;
       let chkobj = {"count_access":true, "name": "payement screening", "icon": "fa-credit-card", "pagelink": "payment-screen-adk","visible":true , "insert": this._data.ps_fields_adk[0].ADK_I_COUNT, "delete": this._data.ps_fields_adk[0].ADK_D_COUNT, "update": this._data.ps_fields_adk[0].ADK_U_COUNT };
       this.features.push(chkobj);
     }
       // ******************************************************************************************************* 
       if((this._page_authority.pep.view == true) && (this._page_authority.pep.approval == false))
     {
     
      let obj  = { "name": "Politicaly Exposed person", "icon": "fa-users", "pagelink": "politicaly-Exposed-Person", "visible":true  }
      this.features.push(obj);
     }
     if((this._page_authority.pep.view == true) && (this._page_authority.pep.approval == true))
     {
       this._checkout_count = true;
       let chkobj = {"count_access":true, "name": "Politicaly Exposed person", "icon": "fa-plus-circle", "pagelink": "politicaly-Exposed-Person","visible":true , "insert": this._data.screen_pep[0].SPEP_I_COUNT, "delete": this._data.screen_pep[0].SPEP_D_COUNT, "update": this._data.screen_pep[0].SPEP_U_COUNT };
       this.features.push(chkobj);
     }
       // ******************************************************************************************************* 
       if((this._page_authority.sanctionedcities.view == true) && (this._page_authority.sanctionedcities.approval == false))
     {
    
      let obj ={ "name": "Sanctioned Cities", "icon": "fa-plus-circle", "pagelink": "sanctionedcities", "visible":true  }
        this.features.push(obj);
     }
     if((this._page_authority.sanctionedcities.view == true) && (this._page_authority.sanctionedcities.approval == true))
     {
       this._checkout_count = true;
       let chkobj = { "count_access":true,"name": "Sanctioned Cities", "icon": "fa-plus-circle", "pagelink": "sanctionedcities","visible":true , "insert": this._data.sanctioned_cities[0].SC_I_COUNT, "delete": this._data.sanctioned_cities[0].SC_D_COUNT, "update": this._data.sanctioned_cities[0].SC_U_COUNT };
       this.features.push(chkobj);
     }
       // ******************************************************************************************************* 
       if((this._page_authority.sensitive_word.view == true) && (this._page_authority.sensitive_word.approval == false))
     {
     
      let obj =  { "name": "Sensitive Word", "icon": "fa-plus-circle", "pagelink": "sensitive-word", "visible":true  }
      this.features.push(obj);
     }
     if((this._page_authority.sensitive_word.view == true) && (this._page_authority.sensitive_word.approval == true))
     {
       this._checkout_count = true;
       let chkobj = { "count_access":true, "name": "Sensitive Word", "icon": "fa-plus-circle", "pagelink": "sensitive-word","visible":true , "insert": this._data.sensitive_words[0].SW_I_COUNT, "delete": this._data.sensitive_words[0].SW_D_COUNT, "update": this._data.sensitive_words[0].SW_U_COUNT };
       this.features.push(chkobj);
     }

       // ******************************************************************************************************* 
       if((this._page_authority.zonevsglobal.view == true) && (this._page_authority.zonevsglobal.approval == false))
     {
      
      let obj = { "name": "zone vs Golbal Keywords", "icon": "fa-globe", "pagelink": "zonevsglobal", "visible":true  }
       this.features.push(obj);
     }
     if((this._page_authority.zonevsglobal.view == true) && (this._page_authority.zonevsglobal.approval == true))
     {
       this._checkout_count = true;
       let chkobj = { "count_access":true, "name": "zone vs Golbal Keywords", "icon": "fa-plus-circle", "pagelink": "zonevsglobal","visible":true , "insert": this._data.zone_global_keywords[0].ZGK_I_COUNT, "delete": this._data.zone_global_keywords[0].ZGK_D_COUNT, "update": this._data.zone_global_keywords[0].ZGK_U_COUNT };
       this.features.push(chkobj);
     }
       // ******************************************************************************************************* 
     if((this._page_authority.customerbasicnoposition.view == true) && (this._page_authority.customerbasicnoposition.approval == false))
     {
      
      let obj =  { "name": "Customer Basic Number Position", "icon": "fa-building-o", "pagelink": "customer-basic-number","visible":true }
       this.features.push(obj);
     }
     if((this._page_authority.customerbasicnoposition.view == true) && (this._page_authority.customerbasicnoposition.approval == true))
     {
       this._checkout_count = true;
       let chkobj = { "count_access":true, "name": "Customer Basic Number Position", "icon": "fa-building-o", "pagelink": "customer-basic-number","visible":true , "insert": this._data.cust_basic_number_pos[0].CBNP_I_COUNT, "delete": this._data.cust_basic_number_pos[0].CBNP_D_COUNT, "update": this._data.cust_basic_number_pos[0].CBNP_U_COUNT };
       this.features.push(chkobj);
     }
     if((this._page_authority.caselisting.view == true) && (this._page_authority.caselisting.approval == false))
     {
      
      let obj =  { "name": "case-listing", "icon": "fa-building-o", "pagelink": "case-listing","visible":true }
       this.features.push(obj);
     }
     if((this._page_authority.caselisting.view == true) && (this._page_authority.caselisting.approval == true))
     {
       this._checkout_count = true;
       let chkobj = { "name": "case-listing", "icon": "fa-building-o", "pagelink": "case-listing","visible":true };
       this.features.push(chkobj);
     }

     if(this._page_authority.report.view == true)
     {
      
      let obj =  { "name": "Reports", "icon": "fa-building-o", "pagelink": "report","visible":true }
       this.features.push(obj);
     }
   
       // ******************************************************************************************************* 
  
    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.toastr.error(error, 'Neutral - Words');
     

      //throw error;   //You can also throw the error to a global error handler
    });   });
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







