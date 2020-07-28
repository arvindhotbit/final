import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-good-guy',
  templateUrl: './delete-good-guy.component.html',
  styleUrls: ['./delete-good-guy.component.css']
})
export class DeleteGoodGuyComponent implements OnInit {
  listtitle:string = "good guy list";
  p:string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
