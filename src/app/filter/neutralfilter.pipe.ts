import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'neutralfilter'
})
export class NeutralfilterPipe implements PipeTransform {

  transform(items: any[],ZONE_ID: string, NOISE_WORD:string,OLD_ZONE_ID:string,OLD_NOISE_WORD:string,CHANGE_TYPE:string) {
    if (items && items.length){
      return items.filter(item =>{
          if (ZONE_ID && item.ZONE_ID.toLowerCase().indexOf(ZONE_ID.toLowerCase()) === -1){
              return false;
          }
          if (NOISE_WORD && item.NOISE_WORD.toLowerCase().indexOf(NOISE_WORD.toLowerCase()) === -1){
              return false;
          }
          if (OLD_ZONE_ID && item.OLD_ZONE_ID.toLowerCase().indexOf(OLD_ZONE_ID.toLowerCase()) === -1){
            return false;
        }
        if (OLD_NOISE_WORD && item.OLD_NOISE_WORD.toLowerCase().indexOf(OLD_NOISE_WORD.toLowerCase()) === -1){
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
