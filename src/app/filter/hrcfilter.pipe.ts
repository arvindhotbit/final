import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hrcfilter'
})
export class HrcfilterPipe implements PipeTransform {

 
  transform(items: any[], ZONE_ID: string, RISK_LEVEL: string, SANCTIONED_FLAG: string, COUNTRY_CODE: string, COUNTRY_NAME: string, WATCHLIST_NAME: string,WATCHLIST_TYPE:string,INITIAL_LOAD_FLAG:string, CHANGE_TYPE: string) {
    if (items && items.length) {
      return items.filter(item => {
        if (ZONE_ID && item.ZONE_ID.toLowerCase().indexOf(ZONE_ID.toLowerCase()) === -1) {
          return false;
        }
        if (RISK_LEVEL && item.RISK_LEVEL.toLowerCase().indexOf(RISK_LEVEL.toLowerCase()) === -1) {
          return false;
        }
        if (SANCTIONED_FLAG && item.SANCTIONED_FLAG.toLowerCase().indexOf(SANCTIONED_FLAG.toLowerCase()) === -1) {
          return false;
        }
        if (COUNTRY_CODE && item.COUNTRY_CODE.toLowerCase().indexOf(COUNTRY_CODE.toLowerCase()) === -1) {
          return false;
        }
        if (COUNTRY_NAME && item.COUNTRY_NAME.toLowerCase().indexOf(COUNTRY_NAME.toLowerCase()) === -1) {
          return false;
        }
        if (WATCHLIST_NAME && item.WATCHLIST_NAME.toLowerCase().indexOf(WATCHLIST_NAME.toLowerCase()) === -1) {
          return false;
        }
        if (WATCHLIST_TYPE && item.WATCHLIST_TYPE.toLowerCase().indexOf(WATCHLIST_TYPE.toLowerCase()) === -1) {
          return false;
        }
        if (INITIAL_LOAD_FLAG && item.INITIAL_LOAD_FLAG.toLowerCase().indexOf(INITIAL_LOAD_FLAG.toLowerCase()) === -1) {
          return false;
        }
        if (CHANGE_TYPE && item.CHANGE_TYPE.toLowerCase().indexOf(CHANGE_TYPE.toLowerCase()) === -1) {
          return false;
        }
        return true;
      })
    }
    else {
      return items;
    }
  }

}
