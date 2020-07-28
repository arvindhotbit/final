import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'namescreen'
})
export class NamescreenPipe implements PipeTransform {

  transform(items: any[], FIELD_LABEL: string, SCAN: string, OLD_FIELD_LABEL : string,OLD_SCAN: string, CHANGE_TYPE: string ){
    if (items && items.length){
        return items.filter(item =>{
            if (FIELD_LABEL && item.FIELD_LABEL.toLowerCase().indexOf(FIELD_LABEL.toLowerCase()) === -1){
                return false;
            }
            if (SCAN && item.SCAN.toLowerCase().indexOf(SCAN.toLowerCase()) === -1){
            
              return false;
          
          }
            if (OLD_FIELD_LABEL && item.OLD_FIELD_LABEL.toLowerCase().indexOf(OLD_FIELD_LABEL.toLowerCase()) === -1){
                return false;
            }
            if (OLD_SCAN && item.OLD_SCAN.toLowerCase().indexOf(OLD_SCAN.toLowerCase()) === -1){
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