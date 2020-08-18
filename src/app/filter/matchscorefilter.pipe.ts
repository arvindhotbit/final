import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'matchscorefilter'
})
export class MatchscorefilterPipe implements PipeTransform {

  transform(items: any[],ZONE_ID: string, MATCHSCORE_THRESHOLD:string,OLD_ZONE_ID:string,PAYSYS_ID:string,OLD_MATCHSCORE_THRESHOLD:string,OLD_PAYSYS_ID:string,CHANGE_TYPE:string) {
    if (items && items.length){
      return items.filter(item =>{
          if (ZONE_ID && item.ZONE_ID.toLowerCase().indexOf(ZONE_ID.toLowerCase()) === -1){
              return false;
          }
          if (MATCHSCORE_THRESHOLD && item.MATCHSCORE_THRESHOLD.toLowerCase().indexOf(MATCHSCORE_THRESHOLD.toLowerCase()) === -1){
              return false;
          }
          if (PAYSYS_ID && item.PAYSYS_ID.toLowerCase().indexOf(PAYSYS_ID.toLowerCase()) === -1){
            return false;
        }
        if (OLD_ZONE_ID && item.OLD_ZONE_ID.toLowerCase().indexOf(OLD_ZONE_ID.toLowerCase()) === -1){
          return false;
      }
      if (OLD_MATCHSCORE_THRESHOLD && item.OLD_MATCHSCORE_THRESHOLD.toLowerCase().indexOf(OLD_MATCHSCORE_THRESHOLD.toLowerCase()) === -1){
        return false;
    }
    if (OLD_PAYSYS_ID && item.OLD_PAYSYS_ID.toLowerCase().indexOf(OLD_PAYSYS_ID.toLowerCase()) === -1){
      return false;
  }
  if (CHANGE_TYPE && item.CHANGE_TYPE.toLowerCase().indexOf(CHANGE_TYPE.toLowerCase()) === -1){
    return false;
}
                     return true;
     })
  }
  else{
      return items;
  }
}

}
