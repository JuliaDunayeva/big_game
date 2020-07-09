import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-tack-data',
  templateUrl: './tack-data.component.html',
  styleUrls: ['./tack-data.component.css']
})
export class TackDataComponent implements OnInit {
  @Input() list: [];

  constructor() { }

  public imgpath = "assets/images/tack-page/";

  buildpath(file: string): string {
    return this.imgpath + file;
  }

  ngOnInit(): void {
  }

} 
