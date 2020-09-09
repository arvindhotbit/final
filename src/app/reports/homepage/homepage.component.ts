import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  features = [];
  constructor() { }

  ngOnInit(): void {
    this.features = [
      {"name": "Admin Reports", "icon": "fa-minus-circle", "pagelink": "/report/admin-report", "visible":true},
      {"name": "Compliance Reports", "icon": "fa-minus-circle", "pagelink": "/report/compliance-report", "visible":true},
      {"name": "Operation Reports", "icon": "fa-minus-circle", "pagelink": "/report/operation-report", "visible":true}
    ]
  }


}
