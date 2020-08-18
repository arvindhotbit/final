import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bicfilter'
})
export class BicfilterPipe implements PipeTransform {


  transform(items: any[], ZONE_ID: string, BIC: string, BIC8: string, CITY: string, COUNTRY: string, WATCHLIST_NAME: string,WATCHLIST_TYPE:string, CHANGE_TYPE: string) {
    if (items && items.length) {
      return items.filter(item => {
        if (ZONE_ID && item.ZONE_ID.toLowerCase().indexOf(ZONE_ID.toLowerCase()) === -1) {
          return false;
        }
        if (BIC && item.BIC.toLowerCase().indexOf(BIC.toLowerCase()) === -1) {
          return false;
        }
        if (BIC8 && item.BIC8.toLowerCase().indexOf(BIC8.toLowerCase()) === -1) {
          return false;
        }
        if (CITY && item.CITY.toLowerCase().indexOf(CITY.toLowerCase()) === -1) {
          return false;
        }
        if (COUNTRY && item.COUNTRY.toLowerCase().indexOf(COUNTRY.toLowerCase()) === -1) {
          return false;
        }
        if (WATCHLIST_NAME && item.WATCHLIST_NAME.toLowerCase().indexOf(WATCHLIST_NAME.toLowerCase()) === -1) {
          return false;
        }
        if (WATCHLIST_TYPE && item.WATCHLIST_TYPE.toLowerCase().indexOf(WATCHLIST_TYPE.toLowerCase()) === -1) {
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
