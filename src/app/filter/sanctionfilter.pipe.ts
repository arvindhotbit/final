import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sanctionfilter'
})
export class SanctionfilterPipe implements PipeTransform {

  transform(items: any[], ZONE_ID: string, ENTRY_TYPE: string, SANCTIONED_CITY: string, OLD_ZONE_ID: string, OLD_ENTRY_TYPE: string, OLD_SANCTIONED_CITY: string, CHANGE_TYPE: string) {
    if (items && items.length) {
      return items.filter(item => {
        if (ZONE_ID && item.ZONE_ID.toLowerCase().indexOf(ZONE_ID.toLowerCase()) === -1) {
          return false;
        }
        if (ENTRY_TYPE && item.ENTRY_TYPE.toLowerCase().indexOf(ENTRY_TYPE.toLowerCase()) === -1) {
          return false;
        }
        if (SANCTIONED_CITY && item.SANCTIONED_CITY.toLowerCase().indexOf(SANCTIONED_CITY.toLowerCase()) === -1) {
          return false;
        }
        if (OLD_ZONE_ID && item.OLD_ZONE_ID.toLowerCase().indexOf(OLD_ZONE_ID.toLowerCase()) === -1) {
          return false;
        }
        if (OLD_ENTRY_TYPE && item.OLD_ENTRY_TYPE.toLowerCase().indexOf(OLD_ENTRY_TYPE.toLowerCase()) === -1) {
          return false;
        }
        if (OLD_SANCTIONED_CITY && item.OLD_SANCTIONED_CITY.toLowerCase().indexOf(OLD_SANCTIONED_CITY.toLowerCase()) === -1) {
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
