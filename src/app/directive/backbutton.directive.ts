import { Directive,ElementRef,HostListener } from '@angular/core';
import {Location} from '@angular/common';
@Directive({
  selector: '[appBackbutton]'
})
export class BackbuttonDirective {


  constructor(private element:ElementRef,private _location:Location) { 

  }
  @HostListener("click") click()
  {
    this.backClicked();
  }
  backClicked() {
    this._location.back();
  }
}
