import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {AuthserviceService} from '../auth/authservice.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public myData: string;
  public UserId: string;
  public UserName: string;
  public Userzone: string;
  constructor(public _authservice:AuthserviceService) {
    this.myData = localStorage.getItem('Role');
    this.UserId = localStorage.getItem('Id');
    this.UserName = localStorage.getItem('Username');
    this.Userzone = localStorage.getItem('UserZone');
   }

  ngOnInit(): void {
  }

}
