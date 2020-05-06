import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-horse-page',
  templateUrl: './horse-page.component.html',
  styleUrls: ['./horse-page.component.css']
})

export class HorsePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public rate=10;
  
  active = 1;

  ctrl = new FormControl(null, Validators.required);

  public preventchange_1:true;

  public readonly = true;

  public value = 0;
  
  //this.ctrl.disable();

  toggle() {
    if (this.ctrl.disabled) {
      this.ctrl.enable();
    } else {
      this.ctrl.disable();
    }
  }

 
 public beforeChange($event: NgbPanelChangeEvent) {

    if ($event.panelId === 'preventchange_1' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

}
