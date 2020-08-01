import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  // transform(value: any, PROGRAM_KEYWORD: any): any {
  //  if(value.length===0)
  //  {
  //    return value;
  //  }
  //  return value.filter(function(search){
  //    return search.PROGRAM_KEYWORD.toLowerCase().indexOf(PROGRAM_KEYWORD.toLowerCase()) > -1
     
  //  });
  // }

  transform(items: any[], pkey: string, pkeyw: string, oldpkey : string,oldpkeyword: string, changetype: string,  ){
    if (items && items.length){
        return items.filter(item =>{
            if (pkey && item.PROGRAM_KEYWORD.toLowerCase().indexOf(pkey.toLowerCase()) === -1){
                return false;
            }
            if (pkeyw && item.PROGRAM_KEYWORD_DESC.toLowerCase().indexOf(pkeyw.toLowerCase()) === -1){
               
                return false;
            }
            if (changetype && item.CHANGE_TYPE.toLowerCase().indexOf(changetype.toLowerCase()) === -1){
                return false;
            }
            if (oldpkey && item.OLD_PROGRAM_KEYWORD.toLowerCase().indexOf(oldpkey.toLowerCase()) === -1){
                return false;
            }
            if (oldpkeyword && item.OLD_PROGRAM_KEYWORD_DESC.toLowerCase().indexOf(oldpkeyword.toLowerCase()) === -1){
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
