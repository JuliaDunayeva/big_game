import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'big-game';
  public isCollapsed = false;

  ctrl = new FormControl(null, Validators.required);
  
  //this.ctrl.disable();

  toggle() {
 //   if (this.ctrl.disabled) {
  //    this.ctrl.enable();
  //  } else {
      this.ctrl.disable();
   // }
  }
}
