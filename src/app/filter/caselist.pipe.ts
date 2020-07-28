import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'caselist'
})
export class CaselistPipe implements PipeTransform {

  transform(items: any[], term1:string, term2:string, term3:any, term4:string, term5:string, term6:string, term7:string):any{

     

    if (items && items.length){
        return items.filter(item =>{
            if (term1 && item.ECM_CASE_ID.toLowerCase().indexOf(term1.toLowerCase()) === -1){
                return false;
            }
            if (term2 && item.ORDERING_CUSTOMER_NAME.toLowerCase().indexOf(term2.toLowerCase()) === -1){
                return false;
            }
            if (term3 && item.SNDR_INST_BIC.toLowerCase().indexOf(term3.toLowerCase()) === -1){
                console.log(term3,item.SNDR_INST_BIC);
                return false;
            }
            if (term4 && item.RECVR_INST_BIC.toLowerCase().indexOf(term4.toLowerCase()) === -1){
              return false;
          }
          if (term5 && item.PAYSYS_ID.toLowerCase().indexOf(term5.toLowerCase()) === -1){
              return false;
          }
          if (term6 && item.SRC_CHANNEL.toLowerCase().indexOf(term6.toLowerCase()) === -1){
              return false;
          }
          if (term7 && item.TRANSFER_AMOUNT.toLowerCase().indexOf(term7.toLowerCase()) === -1){
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