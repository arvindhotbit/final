import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
@Pipe({
  name: 'customRangeFilter'
})
export class CustomRangeFilterPipe implements PipeTransform {
  pipe: DatePipe;
  transform(items:any[], arg1?:Date, arg2?:Date,) {
    if(!arg1 || !arg2){

    return items;

    }else{
      this.pipe = new DatePipe('en');
      let startDate = new Date(arg1);
      let endDate = new Date(arg2);
      var fromto ={option1:startDate,option2:endDate};
      localStorage.setItem('fromto', JSON.stringify(fromto));
      let a = items.filter(
        item => new Date(item.CREATION_DTTM) >= startDate && new Date(item.CREATION_DTTM) <= endDate
         
      )
      console.log(a);
      return a;
   
    }


  }

}
