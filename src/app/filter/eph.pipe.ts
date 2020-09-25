import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eph'
})
export class EphPipe implements PipeTransform {

  transform(items: any[], field_label: string, scan: string, old_field_label : string,old_scan: string  ){
    if (items && items.length){
        return items.filter(item =>{
            if (field_label && item.FIELD_LABEL.toLowerCase().indexOf(field_label.toLowerCase()) === -1){
              console.log(field_label,item.FIELD_LABEL);
                return false;
            }
            if (scan && item.SCAN.toLowerCase().indexOf(scan.toLowerCase()) === -1){
               
                return false;
            }
            if (old_field_label && item.OLD_FIELD_LABEL.toLowerCase().indexOf(old_field_label.toLowerCase()) === -1){
                return false;
            }
            if (old_scan && item.OLD_SCAN.toLowerCase().indexOf(old_scan.toLowerCase()) === -1){
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
