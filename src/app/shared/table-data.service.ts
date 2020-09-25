import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Neutralscheme, Bicscheme,cbn, Interdefination, sanctioned, internalwatchlist, Highriskcountry, Zonevsglobal, sensitivescheme, pepscheme, Paymentscreenadk, matchscore, namescreen, casedetail, addzonescheme, departscheme, paysysscheme, usersscheme, adepartscheme, azonescheme, apayscheme, unassignitem, createrole,usergroup,pseph } from './tabular';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as io from 'socket.io-client';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {
  
  socket:SocketIOClient.Socket;
  public myData: string;
  UserId: string;
  UserName: string;
  selectedneu: Neutralscheme;
  selectedbic: Bicscheme;
  selectedinterdef: Interdefination;
  selectedsanction: sanctioned;
  selectedinterwatch: internalwatchlist;
  selectedhrc: Highriskcountry;
  selectedzvg: Zonevsglobal;
  selectsensitive: sensitivescheme;
  selectpep: pepscheme;
  selectpsadk: Paymentscreenadk;
  selectmatchscore: matchscore;
  selectns: namescreen;
  selectzone: addzonescheme;
  selectdepartment: departscheme;
  selectpaysys: paysysscheme;
  selectusers: usersscheme;
  assigndepart: adepartscheme;
  assignzone: azonescheme;
  assignpay: apayscheme;
  selectunassignitem: unassignitem;
  Userzone: string;
  selectroleslist: createrole;
  selectedcasedetail:casedetail;
  selectedcbn:cbn;
  selectedusergroup:usergroup;
 selectedpseph:pseph;
  constructor(private http: HttpClient) {
    this.myData = localStorage.getItem('Role');
    this.UserId = localStorage.getItem('Id');
    this.UserName = localStorage.getItem('Username');
    this.Userzone = localStorage.getItem('UserZone');

    this.socket = io('http://192.168.29.162:8900');

  }



  sendMessage(msg: string) {
  this.socket.emit('CheckData', null);
  }

    // HANDLER
    onNewMessage() {
      return Observable.create(observer => {
        this.socket.on('CheckData', msg => {
          // console.log(msg);
          observer.next(msg);
        });
      });
    }

 


  public exportAsExcelFile(json: any[], excelFileName: string): void {
    
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  getassignzonelist() { return this.http.post<any>(`${environment.apiUrl}/get_assign_zone`, { "ROLE": this.myData, "USER_ID": this.UserId }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  getassignaccesslist() { return this.http.post<any>(`${environment.apiUrl}/get_authority`, { "ROLE": this.myData, "USER_ID": this.UserId }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };



  //  **********************************************************************************************************
          //  Zone permission
  //  **********************************************************************************************************
  getchangezonereportlist(obj: any) { return this.http.post<any>(`${environment.apiUrl}/get_history_info`, obj).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  getchangezonelist(obj: any) { return this.http.post<any>(`${environment.apiUrl}/neutral_words`, obj).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  get_ephchangezonelist(obj: any) { return this.http.post<any>(`${environment.apiUrl}/ps_fields_eph`, obj).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  getchangepagehistroylist(obj: any) { return this.http.post<any>(`${environment.apiUrl}/get_history_info`, obj).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  getchangezonelistblacklist(obj: any) { return this.http.post<any>(`${environment.apiUrl}/blacklisted_bic`, obj).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  get_hrc_changezonelist(obj: any) { return this.http.post<any>(`${environment.apiUrl}/high_risk_country`, obj).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  get_ild_changezonelist(obj: any) { return this.http.post<any>(`${environment.apiUrl}/internal_list_def`, obj).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  get_ilw_changezonelist(obj: any) { return this.http.post<any>(`${environment.apiUrl}/internal_watch_list`, obj).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  get_sanction_changezonelist(obj: any) { return this.http.post<any>(`${environment.apiUrl}/sanctioned_cities`, obj).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  get_mst_changezonelist(obj: any) { return this.http.post<any>(`${environment.apiUrl}/match_score_threshold`, obj).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  get_sensitive_changezonelist(obj: any) { return this.http.post<any>(`${environment.apiUrl}/sensitive_words`, obj).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  get_cbn_changezonelist(obj: any) { return this.http.post<any>(`${environment.apiUrl}/custome_basic_no_position`, obj).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  getchangezonebiclist(obj) { return this.http.post<any>(`${environment.apiUrl}/zone_x_global_keywords`, obj).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  //  **********************************************************************************************************
          //  Zone permission
  //  **********************************************************************************************************






  //  **********************************************************************************************************
          //  Neutral Words
  //  **********************************************************************************************************

  neutrallistpage() { return this.http.post<any>(`${environment.apiUrl}/neutral_words`, { "ROLE": this.myData, "USER_ZONE": this.Userzone, "USER_ID": this.UserId }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  ) };

  ephlistpage() { return this.http.post<any>(`${environment.apiUrl}/ps_fields_eph`, { "ROLE": this.myData, "USER_ZONE": this.Userzone, "USER_ID": this.UserId }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  ) };

  adminreportlist() { return this.http.post<any>(`${environment.apiUrl}/get_history_info`, { "ROLE": this.myData, "USER_ZONE": this.Userzone, "USER_ID": this.UserId }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  ) };



  neutrallistpagetype(change_type) { return this.http.post<any>(`${environment.apiUrl}/neutral_words`, change_type).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  ephlistpagetype(change_type) { return this.http.post<any>(`${environment.apiUrl}/ps_fields_eph`, change_type).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };
  
  Ns_Change_Type(change_type) { return this.http.post<any>(`${environment.apiUrl}/ns_fields`, change_type).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  biclistpagetype(change_type) { return this.http.post<any>(`${environment.apiUrl}/blacklisted_bic`, change_type).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };
  

  hrclistpagetype(change_type) { return this.http.post<any>(`${environment.apiUrl}/high_risk_country`, change_type).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };
  

  sanction_Change_Type(change_type) { return this.http.post<any>(`${environment.apiUrl}/sanctioned_cities`, change_type).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };
  
  
  sensitive_Change_Type(change_type) { return this.http.post<any>(`${environment.apiUrl}/sensitive_words`, change_type).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };
  
  mslistpagetype(change_type) { return this.http.post<any>(`${environment.apiUrl}/match_score_threshold`, change_type).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };
  

  psadk_Change_Type(change_type) { return this.http.post<any>(`${environment.apiUrl}/ps_fields_adk`, change_type).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };
  
  zvg_Change_Type(change_type) { return this.http.post<any>(`${environment.apiUrl}/zone_x_global_keywords`, change_type).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };
  

  cbn_Change_Type(change_type) { return this.http.post<any>(`${environment.apiUrl}/custome_basic_no_position`, change_type).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  idl_Change_Type(change_type) { return this.http.post<any>(`${environment.apiUrl}/internal_list_def`, change_type).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };


  iwl_Change_Type(change_type) { return this.http.post<any>(`${environment.apiUrl}/internal_watch_list`, change_type).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };
  

  neutrallistpost(neuscheme: Neutralscheme) { return this.http.post<any>(`${environment.apiUrl}/add_neutral_words`, neuscheme).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  ephlistpost(pse: pseph) { return this.http.post<any>(`${environment.apiUrl}/add_ps_fields_eph`, pse).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };
  neutrallistput(neuscheme: Neutralscheme) { return this.http.post<any>(`${environment.apiUrl}/update_neutralWords`, neuscheme).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

 ephlistput(pse: pseph) { return this.http.post<any>(`${environment.apiUrl}/update_ps_fields_eph`, pse).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };
  neutraldelpage(REF_KEY: string) { return this.http.post<any>(`${environment.apiUrl}/del_neutral_words`, { "ROLE": this.myData, "REF_KEY": REF_KEY, "USER_ID": this.UserId, "USER_NAME": this.UserName,"USER_ZONE":this.Userzone }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  ephdelpage(REF_KEY: string) { return this.http.post<any>(`${environment.apiUrl}/del_ps_fields_eph`, { "ROLE": this.myData, "REF_KEY": REF_KEY, "USER_ID": this.UserId, "USER_NAME": this.UserName,"USER_ZONE":this.Userzone }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  neudelapproved(neuscheme: Neutralscheme) { return this.http.post<any>(`${environment.apiUrl}/check_neutral_words`, neuscheme).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };
  ephdelapproved(neuscheme: Neutralscheme) { return this.http.post<any>(`${environment.apiUrl}/check_ps_fields_eph`, neuscheme).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };
  //  **********************************************************************************************************
          //  Neutral Words
  //  **********************************************************************************************************









  paysysdeletepage(REF_KEY: string) { return this.http.post<any>(`${environment.apiUrl}/delete_paysys`, { "ROLE": this.myData, "REF_KEY": REF_KEY, "USER_ID": this.UserId, "USER_NAME": this.UserName,"USER_ZONE":this.Userzone }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  departdeletepage(REF_KEY: string) { return this.http.post<any>(`${environment.apiUrl}/delete_department`, { "ROLE": this.myData, "REF_KEY": REF_KEY, "USER_ID": this.UserId, "USER_NAME": this.UserName,"USER_ZONE":this.Userzone }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };


  departlistpage() { return this.http.post<any>(`${environment.apiUrl}/department_list`, { "ROLE": this.myData }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  matchitems(casedetail:casedetail){ return this.http.post<any>(`${environment.apiUrl}/ps_mapping_info`, casedetail).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  departlistpost(depart: departscheme) { return this.http.post<any>(`${environment.apiUrl}/add_department`, depart).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  getassigndepartment() { return this.http.post<any>(`${environment.apiUrl}/get_assign_department`, { "ROLE": this.myData, "USER_ZONE": this.Userzone, "USER_ID": this.UserId }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  paysyslistpage() { return this.http.post<any>(`${environment.apiUrl}/paysys_list`, { "ROLE": this.myData }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };


  rolelistviewpage() { return this.http.post<any>(`${environment.apiUrl}/roles_list`, { "ROLE": this.myData }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };


  userslistpost(users: usersscheme) { return this.http.post<any>(`${environment.apiUrl}/get_User_List`, { "ROLE": users }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  paysyslistpost(paysys: paysysscheme) { return this.http.post<any>(`${environment.apiUrl}/add_paysys`, paysys).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  roleslistpost(croles: createrole) { return this.http.post<any>(`${environment.apiUrl}/create_roles`, croles).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };
  roleslistput(croles: createrole) { return this.http.post<any>(`${environment.apiUrl}/update_roles`, croles).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };


  paysyslistput(paysys: paysysscheme) { return this.http.post<any>(`${environment.apiUrl}/update_paysys`, paysys).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  addzonelistpage() { return this.http.post<any>(`${environment.apiUrl}/zone_list`, { "ROLE": this.myData }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };
  usergrouplistpage() { return this.http.post<any>(`${environment.apiUrl}/userGroupList`, { "ROLE": this.myData,"USER_ID":this.UserId }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  addzonelistpost(addzone: addzonescheme) { return this.http.post<any>(`${environment.apiUrl}/add_zone`, addzone).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  addusergrouplistpost(userg: usergroup) { return this.http.post<any>(`${environment.apiUrl}/addUserGroup`, userg).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };
  addzonelistput(addzone: addzonescheme) { return this.http.post<any>(`${environment.apiUrl}/update_zone_list`, addzone).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };


  addzonedelpage(REF_KEY: string) { return this.http.post<any>(`${environment.apiUrl}/del_zone_list`, { "ROLE": this.myData, "REF_KEY": REF_KEY, "USER_ID": this.UserId, "USER_NAME": this.UserName,"USER_ZONE":this.Userzone }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };


  usergroupdel(REF_KEY: string) { return this.http.post<any>(`${environment.apiUrl}/deleteUserGroup`, { "ROLE": this.myData, "GROUP_ID": REF_KEY, "USER_ID": this.UserId, "USER_NAME": this.UserName,"USER_ZONE":this.Userzone }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  addzonedelapproved(addzone: addzonescheme) { return this.http.post<any>(`${environment.apiUrl}/check_zone_list`, addzone).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

 

  // Blacklist-bic api call start*************************************

  // bicfetch(): Observable<Bicscheme[]> { return this.http.get<Bicscheme[]>(`${environment.apiUrl}/blacklisted_bic`) };

  bicpost(bicblack: Bicscheme) { return this.http.post<any>(`${environment.apiUrl}/add_blacklisted_bic`, bicblack).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  bicput(bicblack: Bicscheme) { return this.http.put<any>(`${environment.apiUrl}/update_blacklistedBic` + `/${bicblack.REF_KEY}`, bicblack).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  bicdelete(REF_KEY: string) { return this.http.delete(`${environment.apiUrl}/del_blacklisted_bic` + `/${REF_KEY}`).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };
  // Blacklist-bic api call end*************************************




  // internallist-defination api call start************************************




  fetchinter() { return this.http.post<any>(`${environment.apiUrl}/internal_list`, { "ROLE": this.myData, "USER_ZONE": this.Userzone, "USER_ID": this.UserId }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };
 



  postinter(interdefs: Interdefination) { return this.http.post<any>(`${environment.apiUrl}/add_internal_list_def`, interdefs).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };


  putinter(interdefs: Interdefination) { return this.http.post<any>(`${environment.apiUrl}/update_internalListDef`, interdefs).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };






  deleteinter(REF_KEY: string) { return this.http.post<any>(`${environment.apiUrl}/del_internal_list`, { "ROLE": this.myData, "REF_KEY": REF_KEY, "USER_ID": this.UserId, "USER_NAME": this.UserName,"USER_ZONE":this.Userzone }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };
  // internallist-defination api call start*************************************


  // internal-watchlist api call start*************************************
  fetchinterwatch() { return this.http.post<any>(`${environment.apiUrl}/internal_watchlist`, { "ROLE": this.myData, "USER_ZONE": this.Userzone, "USER_ID": this.UserId }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };
 
  postinterwatch(interwatch: internalwatchlist) { return this.http.post<any>(`${environment.apiUrl}/add_internal_watch_list`, interwatch).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  putinterwatch(interwatch: internalwatchlist) { return this.http.post<any>(`${environment.apiUrl}/update_internal_watch_list`, interwatch).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  deleteinterwatch(REF_KEY: string) { return this.http.post<any>(`${environment.apiUrl}/del_internal_watch_list`, { "ROLE": this.myData, "REF_KEY": REF_KEY, "USER_ID": this.UserId, "USER_NAME": this.UserName,"USER_ZONE":this.Userzone }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

 
  // internal-watchlist api call start*************************************



  fetchzvg() { return this.http.post<any>(`${environment.apiUrl}/zone_x_global_keywords`, { "ROLE": this.myData, "USER_ZONE": this.Userzone, "USER_ID": this.UserId }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  postzvg(zvg: Zonevsglobal) { return this.http.post<any>(`${environment.apiUrl}/add_zone_global_keywords`, zvg).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  putzvg(zvg: Zonevsglobal) { return this.http.post<any>(`${environment.apiUrl}/update_zoneGlobalKeywords`, zvg).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  deletezvg(REF_KEY: string) { return this.http.post<any>(`${environment.apiUrl}/del_zone_global_keywords`, { "ROLE": this.myData, "REF_KEY": REF_KEY, "USER_ID": this.UserId, "USER_NAME": this.UserName,"USER_ZONE":this.Userzone }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };


  zvgapproved(neuscheme: Neutralscheme) { return this.http.post<any>(`${environment.apiUrl}/check_zone_global_keywords`, neuscheme).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };


  // Zone_vs_global api call start*************************************


  getsensitive() { return this.http.post<any>(`${environment.apiUrl}/sensitive_words`, { "ROLE": this.myData, "USER_ZONE": this.Userzone, "USER_ID": this.UserId }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };


  postsensitive(sensitivescheme: sensitivescheme) { return this.http.post<any>(`${environment.apiUrl}/add_sensitive_words`, sensitivescheme).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };


  putsensitive(sensitivescheme: sensitivescheme) { return this.http.post<any>(`${environment.apiUrl}/update_sensitive_words`, sensitivescheme).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };


  deletesensitive(REF_KEY: string) { return this.http.post<any>(`${environment.apiUrl}/del_sensitive_words`, { "ROLE": this.myData, "REF_KEY": REF_KEY, "USER_ID": this.UserId, "USER_NAME": this.UserName,"USER_ZONE":this.Userzone }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  sensapproved(sensitivescheme: sensitivescheme) { return this.http.post<any>(`${environment.apiUrl}/check_sensitive_words`, sensitivescheme).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };





  getbic() { return this.http.post<any>(`${environment.apiUrl}/blacklisted_bic`, { "ROLE": this.myData, "USER_ZONE": this.Userzone, "USER_ID": this.UserId }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };


  postbic(bic: Bicscheme) { return this.http.post<any>(`${environment.apiUrl}/add_blacklisted_bic`, bic).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };


  putbic(bic: Bicscheme) { return this.http.post<any>(`${environment.apiUrl}/update_blacklisted_bic`, bic).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };


  deletebic(REF_KEY: string) { return this.http.post<any>(`${environment.apiUrl}/del_blacklisted_bic`, { "ROLE": this.myData, "REF_KEY": REF_KEY, "USER_ID": this.UserId, "USER_NAME": this.UserName,"USER_ZONE":this.Userzone }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  bicapproved(bic: Bicscheme) { return this.http.post<any>(`${environment.apiUrl}/check_blacklisted_bic`, bic).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };


  getinterwatch() { return this.http.post<any>(`${environment.apiUrl}/internal_watch_list`, { "ROLE": this.myData, "USER_ZONE": this.Userzone, "USER_ID": this.UserId }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  getinterdef() { return this.http.post<any>(`${environment.apiUrl}/internal_list_def`, { "ROLE": this.myData, "USER_ZONE": this.Userzone, "USER_ID": this.UserId }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };


  postinterdef(interdef: Interdefination) { return this.http.post<any>(`${environment.apiUrl}/add_internal_list_def`, interdef).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };


  putinterdef(interdef: Interdefination) { return this.http.post<any>(`${environment.apiUrl}/update_internal_list_def`, interdef).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };


  deleteinterdef(REF_KEY: string) { return this.http.post<any>(`${environment.apiUrl}/del_internal_list_def`, { "ROLE": this.myData, "REF_KEY": REF_KEY, "USER_ID": this.UserId, "USER_NAME": this.UserName,"USER_ZONE":this.Userzone }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  interdefapproved(interdef: Interdefination) { return this.http.post<any>(`${environment.apiUrl}/check_internal_list_def`, interdef).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  interwatchapproved(interwatch: internalwatchlist) { return this.http.post<any>(`${environment.apiUrl}/check_internal_watch_list`, interwatch).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };




  fetchhrc() {
    return this.http.post<any>(`${environment.apiUrl}/high_risk_country`, { "ROLE": this.myData, "USER_ZONE": this.Userzone, "USER_ID": this.UserId }).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err.message);
  
        //Handle the error here
  
        return throwError(err.statusText);    //Rethrow it back to component
      })
    ) 
  };


  posthrc(hrc: Highriskcountry) { return this.http.post<any>(`${environment.apiUrl}/add_high_risk_country`, hrc).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };


  puthrc(hrc: Highriskcountry) { return this.http.post<any>(`${environment.apiUrl}/update_high_risk_country`, hrc).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };


  deletehrc(REF_KEY: string) { return this.http.post<any>(`${environment.apiUrl}/del_high_risk_country`, { "ROLE": this.myData, "REF_KEY": REF_KEY, "USER_ID": this.UserId, "USER_NAME": this.UserName,"USER_ZONE":this.Userzone }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  hrcapproved(hrc: Highriskcountry) { return this.http.post<any>(`${environment.apiUrl}/check_high_risk_country`, hrc).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };






  fetchsanction() {
    return this.http.post<any>(`${environment.apiUrl}/sanctioned_cities`,{ "ROLE": this.myData, "USER_ZONE": this.Userzone, "USER_ID": this.UserId }).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err.message);
  
        //Handle the error here
  
        return throwError(err.statusText);    //Rethrow it back to component
      })
    ) ;
  };

  fetchcbn() {
    return this.http.post<any>(`${environment.apiUrl}/custome_basic_no_position`, { "ROLE": this.myData, "USER_ZONE": this.Userzone, "USER_ID": this.UserId }).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err.message);
  
        //Handle the error here
  
        return throwError(err.statusText);    //Rethrow it back to component
      })
    ) ;
  };
  postcbn(cbn: cbn) { return this.http.post<any>(`${environment.apiUrl}/add_custome_basic_no_pos`, cbn).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };


  putcbn(cbn: cbn) { return this.http.post<any>(`${environment.apiUrl}/update_custome_basic_no_pos`, cbn).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };


  deletecbn(REF_KEY: string) { return this.http.post<any>(`${environment.apiUrl}/del_custome_basic_no_pos`, { "ROLE": this.myData, "REF_KEY": REF_KEY, "USER_ID": this.UserId, "USER_NAME": this.UserName,"USER_ZONE":this.Userzone }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  cbnapproved(cbn: cbn) { return this.http.post<any>(`${environment.apiUrl}/check_custome_basic_no_pos`, cbn).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  postsanction(sanction: sanctioned) { return this.http.post<any>(`${environment.apiUrl}/add_sanctioned_cities`, sanction).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  


  putsanction(sanction: sanctioned) { return this.http.post<any>(`${environment.apiUrl}/update_sanctioned_cities`, sanction).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };


  deletesanction(REF_KEY: string) { return this.http.post<any>(`${environment.apiUrl}/del_sanctioned_cities`, { "ROLE": this.myData, "REF_KEY": REF_KEY, "USER_ID": this.UserId, "USER_NAME": this.UserName,"USER_ZONE":this.Userzone }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  sanctionapproved(sanction: sanctioned) { return this.http.post<any>(`${environment.apiUrl}/check_sanctioned_cities`, sanction).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };


  fetchpsadk() {
    return this.http.post<any>(`${environment.apiUrl}/ps_fields_adk`, { "ROLE": this.myData, "USER_ZONE": this.Userzone, "USER_ID": this.UserId }).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err.message);
  
        //Handle the error here
  
        return throwError(err.statusText);    //Rethrow it back to component
      })
    ) 
  };


  postpsadk(psadk: Paymentscreenadk) { return this.http.post<any>(`${environment.apiUrl}/add_ps_fields_adk`, psadk).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };


  putpsadk(psadk: Paymentscreenadk) { return this.http.post<any>(`${environment.apiUrl}/update_ps_fields_adk`, psadk).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };


  deletepsadk(REF_KEY: string) { return this.http.post<any>(`${environment.apiUrl}/del_ps_fields_adk`, { "ROLE": this.myData, "REF_KEY": REF_KEY, "USER_ID": this.UserId, "USER_NAME": this.UserName,"USER_ZONE":this.Userzone }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  psadkapproved(psadk: Paymentscreenadk) { return this.http.post<any>(`${environment.apiUrl}/check_ps_fields_adk`, psadk).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };




  fetchms() {
    return this.http.post<any>(`${environment.apiUrl}/match_score_threshold`, { "ROLE": this.myData, "USER_ZONE": this.Userzone, "USER_ID": this.UserId }).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err.message);
  
        //Handle the error here
  
        return throwError(err.statusText);    //Rethrow it back to component
      })
    ) 
  };


  postms(ms: matchscore) { return this.http.post<any>(`${environment.apiUrl}/add_match_score_threshold`, ms).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };


  putms(ms: matchscore) { return this.http.post<any>(`${environment.apiUrl}/update_match_score_threshold`, ms).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };


  deletems(REF_KEY: string) { return this.http.post<any>(`${environment.apiUrl}/del_match_score_threshold`, { "ROLE": this.myData, "REF_KEY": REF_KEY, "USER_ID": this.UserId, "USER_NAME": this.UserName,"USER_ZONE":this.Userzone }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  msapproved(ms: matchscore) { return this.http.post<any>(`${environment.apiUrl}/check_match_score_threshold`, ms).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };




  fetchns() {
    return this.http.post<any>(`${environment.apiUrl}/ns_fields`, { "ROLE": this.myData, "USER_ZONE": this.Userzone, "USER_ID": this.UserId }).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err.message);
  
        //Handle the error here
  
        return throwError(err.statusText);    //Rethrow it back to component
      })
    ) 
  };


  postns(ns: namescreen) { return this.http.post<any>(`${environment.apiUrl}/add_ns_fields`, ns).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };


  putns(ns: namescreen) { return this.http.post<any>(`${environment.apiUrl}/update_ns_fields`, ns).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };


  deletens(REF_KEY: string) { return this.http.post<any>(`${environment.apiUrl}/del_ns_fields`, { "ROLE": this.myData, "REF_KEY": REF_KEY, "USER_ID": this.UserId, "USER_NAME": this.UserName,"USER_ZONE":this.Userzone }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  nsapproved(ns: namescreen) { return this.http.post<any>(`${environment.apiUrl}/check_ns_fields`, ns).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };



  fetchcase(obj) {
    return this.http.post<any>(`${environment.apiUrl}/ps_case_decision`, obj).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err.message);
  
        //Handle the error here
  
        return throwError(err.statusText);    //Rethrow it back to component
      })
    ) 
  };

  
  fetchNscase(obj) {
    return this.http.post<any>(`${environment.apiUrl}/ns_case_decision`, obj).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err.message);
  
        //Handle the error here
  
        return throwError(err.statusText);    //Rethrow it back to component
      })
    ) 
  };

  sendcomment(obj)
  {
    return this.http.post<any>(`${environment.apiUrl}/add_comment_case`, obj).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err.message);
  
        //Handle the error here
  
        return throwError(err.statusText);    //Rethrow it back to component
      })
    ) 
  }
  sendNscomment(obj)
  {
    return this.http.post<any>(`${environment.apiUrl}/ns_add_comment_case`, obj).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err.message);
  
        //Handle the error here
  
        return throwError(err.statusText);    //Rethrow it back to component
      })
    ) 
  }
  routecomment(obj)
  {
    return this.http.post<any>(`${environment.apiUrl}/routeDepartment`, obj).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err.message);
  
        //Handle the error here
  
        return throwError(err.statusText);    //Rethrow it back to component
      })
    ) 
  }

  fetchcount(obj) {
    return this.http.post<any>(`${environment.apiUrl}/get_count`, obj).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err.message);
  
        //Handle the error here
  
        return throwError(err.statusText);    //Rethrow it back to component
      })
    ) 
  };

  postcaseids(cs: casedetail) { return this.http.post<any>(`${environment.apiUrl}/ps_information`, cs).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  postNScaseids(cs: casedetail) { return this.http.post<any>(`${environment.apiUrl}/ns_information`, cs).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };
  postuserids(user: usersscheme) { return this.http.post<any>(`${environment.apiUrl}/get_assign_items`, user).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };
  pep_Change_Type(change_type) { return this.http.post<any>(`${environment.apiUrl}/screen_pep`, change_type).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  getpep() { return this.http.post<any>(`${environment.apiUrl}/screen_pep`, { "ROLE": this.myData, "USER_ZONE": this.Userzone, "USER_ID": this.UserId }).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  putpep(pep: pepscheme) { return this.http.post<any>(`${environment.apiUrl}/update_screen_pep`, pep).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  pepapproved(pep: pepscheme) { return this.http.post<any>(`${environment.apiUrl}/check_screen_pep`, pep).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };



  assigndepartservice(adepart: adepartscheme) { return this.http.post<any>(`${environment.apiUrl}/assign_department`, adepart).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  assignzoneservice(azone: azonescheme) { return this.http.post<any>(`${environment.apiUrl}/assign_zone`, azone).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };
  flagupdate(azone: azonescheme) { return this.http.post<any>(`${environment.apiUrl}/update_assign_userzone`, azone).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  assignpayservice(apay: apayscheme) { return this.http.post<any>(`${environment.apiUrl}/assign_paysyeId`, apay).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };

  unassignitemservice(unasitem: unassignitem) { return this.http.post<any>(`${environment.apiUrl}/unassign_items`, unasitem).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err.message);

      //Handle the error here

      return throwError(err.statusText);    //Rethrow it back to component
    })
  )  };
}
