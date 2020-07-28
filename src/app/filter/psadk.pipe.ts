import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'psadk'
})
export class PsadkPipe implements PipeTransform {

  transform(items: any[], MTXXX_TYPE: string, FIELD_LABEL: string, SCAN : string,TAG_A: string, TAG: string, OLD_MTXXX_TYPE: string, OLD_FIELD_LABEL: string, OLD_SCAN : string,OLD_TAG_A: string, OLD_TAG: string,CHANGE_TYPE:string  ){
    if (items && items.length){
        return items.filter(item =>{
            if (MTXXX_TYPE && item.MTXXX_TYPE.toLowerCase().indexOf(MTXXX_TYPE.toLowerCase()) === -1){
                return false;
            }
            if (FIELD_LABEL && item.FIELD_LABEL.toLowerCase().indexOf(FIELD_LABEL.toLowerCase()) === -1){
            
              return false;
          
          }
            if (SCAN && item.SCAN.toLowerCase().indexOf(SCAN.toLowerCase()) === -1){
                return false;
            }
            if (TAG_A && item.TAG_A.toLowerCase().indexOf(TAG_A.toLowerCase()) === -1){
                return false;
            }
            if (TAG && item.TAG.toLowerCase().indexOf(TAG.toLowerCase()) === -1){
                return false;
            }
            if (OLD_MTXXX_TYPE && item.OLD_MTXXX_TYPE.toLowerCase().indexOf(OLD_MTXXX_TYPE.toLowerCase()) === -1){
              return false;
          }
          if (OLD_FIELD_LABEL && item.OLD_FIELD_LABEL.toLowerCase().indexOf(OLD_FIELD_LABEL.toLowerCase()) === -1){

              return false;
          }
          if (OLD_SCAN && item.OLD_SCAN.toLowerCase().indexOf(OLD_SCAN.toLowerCase()) === -1){
              return false;
          }
          if (OLD_TAG_A && item.OLD_TAG_A.toLowerCase().indexOf(OLD_TAG_A.toLowerCase()) === -1){
              return false;
          }
          if (OLD_TAG && item.OLD_TAG.toLowerCase().indexOf(OLD_TAG.toLowerCase()) === -1){
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