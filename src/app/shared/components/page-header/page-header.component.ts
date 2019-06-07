import { Component, OnInit, Input } from '@angular/core';

interface ButtonsHeader {
  text: string;
  link?: string;
  class?: string;
}

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  @Input('page-title') pageTitle: string;
  @Input('show-btn') showButton: boolean = true; 
  @Input() buttons: Array<ButtonsHeader> = [];

  constructor() { }

  ngOnInit() { }

}
