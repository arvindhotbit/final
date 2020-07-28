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

  transform(items: any[], PROGRAM_KEYWORD: string, PROGRAM_KEYWORD_DESC: string, CHANGE_TYPE : string,OLD_PROGRAM_KEYWORD: string, OLD_PROGRAM_KEYWORD_DESC: string,  ){
    if (items && items.length){
        return items.filter(item =>{
            if (PROGRAM_KEYWORD && item.PROGRAM_KEYWORD.toLowerCase().indexOf(PROGRAM_KEYWORD.toLowerCase()) === -1){
                return false;
            }
            if (PROGRAM_KEYWORD_DESC && item.PROGRAM_KEYWORD_DESC.toLowerCase().indexOf(PROGRAM_KEYWORD_DESC.toLowerCase()) === -1){
                console.log(PROGRAM_KEYWORD_DESC);
                return false;
            }
            if (CHANGE_TYPE && item.CHANGE_TYPE.toLowerCase().indexOf(CHANGE_TYPE.toLowerCase()) === -1){
                return false;
            }
            if (OLD_PROGRAM_KEYWORD && item.OLD_PROGRAM_KEYWORD.toLowerCase().indexOf(OLD_PROGRAM_KEYWORD.toLowerCase()) === -1){
                return false;
            }
            if (OLD_PROGRAM_KEYWORD_DESC && item.OLD_PROGRAM_KEYWORD_DESC.toLowerCase().indexOf(OLD_PROGRAM_KEYWORD_DESC.toLowerCase()) === -1){
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
