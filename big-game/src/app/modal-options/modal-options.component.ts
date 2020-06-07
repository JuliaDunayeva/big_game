import { Component, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-options',
  templateUrl: './modal-options.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./modal-options.component.css']
})
export class ModalOptionsComponent  {
  closeResult: string;

  constructor(private modalService: NgbModal) {}
  
  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }


}
