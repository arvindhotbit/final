import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sensitivefilter'
})
export class SensitivefilterPipe implements PipeTransform {

  transform(items: any[],ZONE_ID: string,SENSITIVE_WORDS:string,CHANGE_TYPE:string) {
    if (items && items.length){
      return items.filter(item =>{
        if (ZONE_ID && item.ZONE_ID.toLowerCase().indexOf(ZONE_ID.toLowerCase()) === -1){
          return false;
      }
          if (SENSITIVE_WORDS && item.SENSITIVE_WORDS.toLowerCase().indexOf(SENSITIVE_WORDS.toLowerCase()) === -1){
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
