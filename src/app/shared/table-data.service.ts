import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Neutralscheme,Bicscheme,Interdefination,sanctioned,internalwatchlist,Highriskcountry,Zonevsglobal,sensitivescheme,pepscheme,Paymentscreenadk,matchscore,namescreen,casedetail,addzonescheme} from './tabular';


@Injectable({
  providedIn: 'root'
})
export class TableDataService {
  public myData:string;
  UserId:string;
  UserName:string;
  selectedneu:  Neutralscheme;
   selectedbic :  Bicscheme;
   selectedinterdef : Interdefination;
   selectedsanction : sanctioned;
   selectedinterwatch:internalwatchlist;   
   selectedhrc : Highriskcountry;   
   selectedzvg : Zonevsglobal; 
   selectsensitive : sensitivescheme;   
   selectpep : pepscheme;
   selectpsadk:Paymentscreenadk;
    selectmatchscore:matchscore;
    selectns:namescreen;
    selectzone : addzonescheme;
  constructor(private http : HttpClient) {
    this.myData = localStorage.getItem('Role');
    this.UserId = localStorage.getItem('Id');
    this.UserName = localStorage.getItem('Username');
    console.log(this.UserId);
   }
 
  




// Neutral-words api call start*************************************
// neutrallistpage():Observable<Neutralscheme[]>
// { return  this.http.get<Neutralscheme[]>(`${environment.apiUrl}/neutral_words`)};
neutrallistpage()
{ return this.http.post<any>(`${environment.apiUrl}/neutral_words`,{"ROLE":this.myData})};

neutrallistpagechk()
{ return this.http.post<any>(`${environment.apiUrl}/neutral_words`,{"ROLE":this.myData})};

neutrallistpost(neuscheme:Neutralscheme)
{ return this.http.post<any>(`${environment.apiUrl}/add_neutral_words`,neuscheme)};


neutrallistput(neuscheme:Neutralscheme)
{ return this.http.post<any>(`${environment.apiUrl}/update_neutralWords`,neuscheme)};
// neutrallistput(neuscheme:Neutralscheme)
// { return this.http.put<any>(`${environment.apiUrl}/update_neutralWords` + `/${neuscheme.REF_KEY}`,neuscheme)};



neutraldelpage(REF_KEY:string)
{ return this.http.post<any>(`${environment.apiUrl}/del_neutral_words`,{"ROLE":this.myData,"REF_KEY":REF_KEY,"USER_ID":this.UserId,"USER_NAME":this.UserName})};

neudelapproved(neuscheme:Neutralscheme)
{ return this.http.post<any>(`${environment.apiUrl}/check_neutral_words`,neuscheme)};

neudeldisapproved(neuscheme:Neutralscheme)
{ return this.http.post<any>(`${environment.apiUrl}/check_neutral_words`,neuscheme)};


// neutrallistdelete(REF_KEY:string)
// {return this.http.delete(`${environment.apiUrl}/del_neutral_words` + `/${REF_KEY}`)};
// Neutral-words api call end*************************************







// Neutral-words api call start*************************************
// neutrallistpage():Observable<Neutralscheme[]>
// { return  this.http.get<Neutralscheme[]>(`${environment.apiUrl}/neutral_words`)};
addzonelistpage()
{ return this.http.post<any>(`${environment.apiUrl}/zone_list`,{"ROLE":this.myData})};


addzonelistpost(addzone:addzonescheme)
{ return this.http.post<any>(`${environment.apiUrl}/add_zone`,addzone)};


addzonelistput(addzone:addzonescheme)
{ return this.http.post<any>(`${environment.apiUrl}/update_zone_list`,addzone)};
// neutrallistput(neuscheme:Neutralscheme)
// { return this.http.put<any>(`${environment.apiUrl}/update_neutralWords` + `/${neuscheme.REF_KEY}`,neuscheme)};



addzonedelpage(REF_KEY:string)
{ return this.http.post<any>(`${environment.apiUrl}/del_zone_list`,{"ROLE":this.myData,"REF_KEY":REF_KEY,"USER_ID":this.UserId,"USER_NAME":this.UserName})};

addzonedelapproved(addzone:addzonescheme)
{ return this.http.post<any>(`${environment.apiUrl}/check_zone_list`,addzone)};

addzonedeldisapproved(addzone:addzonescheme)
{ return this.http.post<any>(`${environment.apiUrl}/check_zone_list`,addzone)};


// neutrallistdelete(REF_KEY:string)
// {return this.http.delete(`${environment.apiUrl}/del_neutral_words` + `/${REF_KEY}`)};
// Neutral-words api call end*************************************


















// Blacklist-bic api call start*************************************

bicfetch():Observable<Bicscheme[]>
{ return  this.http.get<Bicscheme[]>(`${environment.apiUrl}/blacklist_bic`)};

bicpost(bicblack:Bicscheme)
{ return this.http.post<any>(`${environment.apiUrl}/add_blacklisted_bic`,bicblack)};

bicput(bicblack:Bicscheme)
{ return this.http.put<any>(`${environment.apiUrl}/update_blacklistedBic` + `/${bicblack.REF_KEY}`,bicblack)};

bicdelete(REF_KEY:string)
{return this.http.delete(`${environment.apiUrl}/del_blacklisted_bic` + `/${REF_KEY}`)};
// Blacklist-bic api call end*************************************




// internallist-defination api call start************************************

fetchinter():Observable<Interdefination[]>
{ return  this.http.get<Interdefination[]>(`${environment.apiUrl}/internal_list`)};

postinter(interdefs:Interdefination)
{ return this.http.post<any>(`${environment.apiUrl}/add_internal_list_def`,interdefs)};

putinter(interdefs:Interdefination)
{ return this.http.put<any>(`${environment.apiUrl}/update_internalListDef` + `/${interdefs.REF_KEY}`,interdefs)};

deleteinter(REF_KEY:string)
{return this.http.delete(`${environment.apiUrl}/del_internal_list` + `/${REF_KEY}`)};
// internallist-defination api call start*************************************




// Sanctioned cities api call start*************************************

// fetchsanction():Observable<sanctioned[]>
// { return  this.http.get<sanctioned[]>(`${environment.apiUrl}/sanctioned_cities`)};

// postsanction(sanction:sanctioned)
// { return this.http.post<any>(`${environment.apiUrl}/add_sanctioned_cities`,sanction)};

// putsanction(sanction:sanctioned)
// { return this.http.put<any>(`${environment.apiUrl}/update_sanctionedCities` + `/${sanction.REF_KEY}`,sanction)};

// deletesanction(REF_KEY:string)
// {return this.http.delete(`${environment.apiUrl}/del_sanctioned_cities` + `/${REF_KEY}`)};
// Sanctioned cities api call start*************************************


// internal-watchlist api call start*************************************

fetchinterwatch():Observable<internalwatchlist[]>
{ return  this.http.get<internalwatchlist[]>(`${environment.apiUrl}/internal_watchlist`)};

postinterwatch(interwatch:internalwatchlist)
{ return this.http.post<any>(`${environment.apiUrl}/add_internal_watchlist`,interwatch)};

putinterwatch(interwatch:internalwatchlist)
{ return this.http.put<any>(`${environment.apiUrl}/update_internalWatchList` + `/${interwatch.UID_SERIAL_NO}`,interwatch)};

deleteinterwatch(UID_SERIAL_NO:string)
{return this.http.delete(`${environment.apiUrl}/del_internal_watchlist`+ `/${UID_SERIAL_NO}`)};
// internal-watchlist api call start*************************************



// High-Risk-Cities api call start*************************************


// fetchhrc():Observable<Highriskcountry[]>
// { return  this.http.get<Highriskcountry[]>(`${environment.apiUrl}/high_risk_countries`)};

// posthrc(hrc:Highriskcountry)
// { return this.http.post<any>(`${environment.apiUrl}/add_highRiskCountry`,hrc)};

// puthrc(hrc:Highriskcountry)
// { return this.http.put<any>(`${environment.apiUrl}/update_highRishCountry` + `/${hrc.REF_KEY}`,hrc)};

// deletehrc(REF_KEY:string)
// {return this.http.delete(`${environment.apiUrl}/del_highRiskCountry` + `/${REF_KEY}`)};
// High-Risk-Cities api call start*************************************



// Zone_vs_global api call start*************************************
// fetchzvg():Observable<Zonevsglobal[]>
// { return  this.http.get<Zonevsglobal[]>(`${environment.apiUrl}/zone_x_global_keywords`)};

fetchzvg()
{ return this.http.post<any>(`${environment.apiUrl}/zone_x_global_keywords`,{"ROLE":this.myData})};

postzvg(zvg:Zonevsglobal)
{ return this.http.post<any>(`${environment.apiUrl}/add_zone_global_keywords`,zvg)};

putzvg(zvg:Zonevsglobal)
{ return this.http.post<any>(`${environment.apiUrl}/update_zoneGlobalKeywords`,zvg)};
// putzvg(zvg:Zonevsglobal)
// { return this.http.put<any>(`${environment.apiUrl}/update_zoneGlobalKeywords` + `/${zvg.REF_KEY}`,zvg)};

// deletezvg(REF_KEY:string)
// {return this.http.delete(`${environment.apiUrl}/del_zone_global_keywords` + `/${REF_KEY}`)};
deletezvg(REF_KEY:string)
{ return this.http.post<any>(`${environment.apiUrl}/del_zone_global_keywords`,{"ROLE":this.myData,"REF_KEY":REF_KEY,"USER_ID":this.UserId,"USER_NAME":this.UserName})};


zvgapproved(neuscheme:Neutralscheme)
{ return this.http.post<any>(`${environment.apiUrl}/check_zone_global_keywords`,neuscheme)};

zvgdisapproved(neuscheme:Neutralscheme)
{ return this.http.post<any>(`${environment.apiUrl}/check_zone_global_keywords`,neuscheme)};

// Zone_vs_global api call start*************************************


getsensitive()
{ return this.http.post<any>(`${environment.apiUrl}/sensitive_words`,{"ROLE":this.myData})};


postsensitive(sensitivescheme:sensitivescheme)
{ return this.http.post<any>(`${environment.apiUrl}/add_sensitive_words`,sensitivescheme)};


putsensitive(sensitivescheme:sensitivescheme)
{ return this.http.post<any>(`${environment.apiUrl}/update_sensitive_words`,sensitivescheme)};


deletesensitive(REF_KEY:string)
{ return this.http.post<any>(`${environment.apiUrl}/del_sensitive_words`,{"ROLE":this.myData,"REF_KEY":REF_KEY,"USER_ID":this.UserId,"USER_NAME":this.UserName})};

sensapproved(sensitivescheme:sensitivescheme)
{ return this.http.post<any>(`${environment.apiUrl}/check_sensitive_words`,sensitivescheme)};

sensdisapproved(sensitivescheme:sensitivescheme)
{ return this.http.post<any>(`${environment.apiUrl}/check_sensitive_words`,sensitivescheme)};






getbic()
{ return this.http.post<any>(`${environment.apiUrl}/blacklisted_bic`,{"ROLE":this.myData})};


postbic(bic:Bicscheme)
{ return this.http.post<any>(`${environment.apiUrl}/add_blacklisted_bic`,bic)};


putbic(bic:Bicscheme)
{ return this.http.post<any>(`${environment.apiUrl}/update_blacklisted_bic`,bic)};


deletebic(REF_KEY:string)
{ return this.http.post<any>(`${environment.apiUrl}/del_blacklisted_bic`,{"ROLE":this.myData,"REF_KEY":REF_KEY,"USER_ID":this.UserId,"USER_NAME":this.UserName})};

bicapproved(bic:Bicscheme)
{ return this.http.post<any>(`${environment.apiUrl}/check_blacklisted_bic`,bic)};

bicdisapproved(bic:Bicscheme)
{ return this.http.post<any>(`${environment.apiUrl}/check_blacklisted_bic`,bic)};



getinterdef()
{ return this.http.post<any>(`${environment.apiUrl}/internal_list_def`,{"ROLE":this.myData})};


postinterdef(interdef:Interdefination)
{ return this.http.post<any>(`${environment.apiUrl}/add_internal_list_def`,interdef)};


putinterdef(interdef:Interdefination)
{ return this.http.post<any>(`${environment.apiUrl}/update_internal_list_def`,interdef)};


deleteinterdef(REF_KEY:string)
{ return this.http.post<any>(`${environment.apiUrl}/del_internal_list_def`,{"ROLE":this.myData,"REF_KEY":REF_KEY,"USER_ID":this.UserId,"USER_NAME":this.UserName})};

interdefapproved(interdef:Interdefination)
{ return this.http.post<any>(`${environment.apiUrl}/check_internal_list_def`,interdef)};

interdefdisapproved(interdef:Interdefination)
{ return this.http.post<any>(`${environment.apiUrl}/check_internal_list_def`,interdef)};




fetchhrc(){ 
  return this.http.post<any>(`${environment.apiUrl}/high_risk_country`,{"ROLE":this.myData})};


posthrc(hrc:Highriskcountry)
{ return this.http.post<any>(`${environment.apiUrl}/add_high_risk_country`,hrc)};


puthrc(hrc:Highriskcountry)
{ return this.http.post<any>(`${environment.apiUrl}/update_high_risk_country`,hrc)};


deletehrc(REF_KEY:string)
{ return this.http.post<any>(`${environment.apiUrl}/del_high_risk_country`,{"ROLE":this.myData,"REF_KEY":REF_KEY,"USER_ID":this.UserId,"USER_NAME":this.UserName})};

hrcapproved(hrc:Highriskcountry)
{ return this.http.post<any>(`${environment.apiUrl}/check_high_risk_country`,hrc)};

hrcdisapproved(hrc:Highriskcountry)
{ return this.http.post<any>(`${environment.apiUrl}/check_high_risk_country`,hrc)};





fetchsanction(){ 
  return this.http.post<any>(`${environment.apiUrl}/sanctioned_cities`,{"ROLE":this.myData})};


postsanction(sanction:sanctioned)
{ return this.http.post<any>(`${environment.apiUrl}/add_sanctioned_cities`,sanction)};


putsanction(sanction:sanctioned)
{ return this.http.post<any>(`${environment.apiUrl}/update_sanctioned_cities`,sanction)};


deletesanction(REF_KEY:string)
{ return this.http.post<any>(`${environment.apiUrl}/del_sanctioned_cities`,{"ROLE":this.myData,"REF_KEY":REF_KEY,"USER_ID":this.UserId,"USER_NAME":this.UserName})};

sanctionapproved(sanction:sanctioned)
{ return this.http.post<any>(`${environment.apiUrl}/check_sanctioned_cities`,sanction)};

sanctiondisapproved(sanction:sanctioned)
{ return this.http.post<any>(`${environment.apiUrl}/check_sanctioned_cities`,sanction)};


fetchpsadk(){ 
  return this.http.post<any>(`${environment.apiUrl}/ps_fields_adk`,{"ROLE":this.myData})};


postpsadk(psadk:Paymentscreenadk)
{ return this.http.post<any>(`${environment.apiUrl}/add_ps_fields_adk`,psadk)};


putpsadk(psadk:Paymentscreenadk)
{ return this.http.post<any>(`${environment.apiUrl}/update_ps_fields_adk`,psadk)};


deletepsadk(REF_KEY:string)
{ return this.http.post<any>(`${environment.apiUrl}/del_ps_fields_adk`,{"ROLE":this.myData,"REF_KEY":REF_KEY,"USER_ID":this.UserId,"USER_NAME":this.UserName})};

psadkapproved(psadk:Paymentscreenadk)
{ return this.http.post<any>(`${environment.apiUrl}/check_ps_fields_adk`,psadk)};

psadkdisapproved(psadk:Paymentscreenadk)
{ return this.http.post<any>(`${environment.apiUrl}/check_ps_fields_adk`,psadk)};




fetchms(){ 
  return this.http.post<any>(`${environment.apiUrl}/match_score_threshold`,{"ROLE":this.myData})};


postms(ms:matchscore)
{ return this.http.post<any>(`${environment.apiUrl}/add_match_score_threshold`,ms)};


putms(ms:matchscore)
{ return this.http.post<any>(`${environment.apiUrl}/update_match_score_threshold`,ms)};


deletems(REF_KEY:string)
{ return this.http.post<any>(`${environment.apiUrl}/del_match_score_threshold`,{"ROLE":this.myData,"REF_KEY":REF_KEY,"USER_ID":this.UserId,"USER_NAME":this.UserName})};

msapproved(ms:matchscore)
{ return this.http.post<any>(`${environment.apiUrl}/check_match_score_threshold`,ms)};

msdisapproved(ms:matchscore)
{ return this.http.post<any>(`${environment.apiUrl}/check_match_score_threshold`,ms)};




fetchns(){ 
  return this.http.post<any>(`${environment.apiUrl}/ns_fields`,{"ROLE":this.myData})};


postns(ns:namescreen)
{ return this.http.post<any>(`${environment.apiUrl}/add_ns_fields`,ns)};


putns(ns:namescreen)
{ return this.http.post<any>(`${environment.apiUrl}/update_ns_fields`,ns)};


deletens(REF_KEY:string)
{ return this.http.post<any>(`${environment.apiUrl}/del_ns_fields`,{"ROLE":this.myData,"REF_KEY":REF_KEY,"USER_ID":this.UserId,"USER_NAME":this.UserName})};

nsapproved(ns:namescreen)
{ return this.http.post<any>(`${environment.apiUrl}/check_ns_fields`,ns)};

nsdisapproved(ns:namescreen)
{ return this.http.post<any>(`${environment.apiUrl}/check_ns_fields`,ns)};













fetchcase(){ 
  return this.http.post<any>(`${environment.apiUrl}/ps_case_decision`,{"ROLE":this.myData})};


  
  fetchcount(){ 
    return this.http.post<any>(`${environment.apiUrl}/get_count`,{"ROLE":this.myData})};

    postcaseids(cs:casedetail)
    { return this.http.post<any>(`${environment.apiUrl}/ps_information`,cs)};



// postms(ms:matchscore)
// { return this.http.post<any>(`${environment.apiUrl}/add_match_score_threshold`,ms)};


// putms(ms:matchscore)
// { return this.http.post<any>(`${environment.apiUrl}/update_match_score_threshold`,ms)};


// deletems(REF_KEY:string)
// { return this.http.post<any>(`${environment.apiUrl}/del_match_score_threshold`,{"ROLE":this.myData,"REF_KEY":REF_KEY,"USER_ID":this.UserId,"USER_NAME":this.UserName})};

// msapproved(ms:matchscore)
// { return this.http.post<any>(`${environment.apiUrl}/check_match_score_threshold`,ms)};

// msdisapproved(ms:matchscore)
// { return this.http.post<any>(`${environment.apiUrl}/check_match_score_threshold`,ms)};


getpep()
{ return this.http.post<any>(`${environment.apiUrl}/screen_pep`,{"ROLE":this.myData})};

putpep(pep:pepscheme)
{ return this.http.post<any>(`${environment.apiUrl}/update_screen_pep`,pep)};

pepapproved(pep:pepscheme)
{ return this.http.post<any>(`${environment.apiUrl}/check_screen_pep`,pep)};

pepdisapproved(pep:pepscheme)
{ return this.http.post<any>(`${environment.apiUrl}/check_screen_pep`,pep)};




}
