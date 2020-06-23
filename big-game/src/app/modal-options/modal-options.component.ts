import { Component, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Equipment } from './../equipment';
import { SaddlesService } from './../services/saddles.service';

@Component({
  selector: 'app-modal-options',
  templateUrl: './modal-options.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./modal-options.component.css']
})

export class ModalOptionsComponent  {
  allEquipment: Equipment[];
  path: string = 'assets/images/tack-page/'

  constructor(public modalService: NgbModal, public saddlesService: SaddlesService  ) {}
   
  ngOnInit(): void {
    this.showlist()

   }

   showlist() {
    this.saddlesService.getSaddlesList()
      .subscribe(data => {
        this.allEquipment = data.map(res => {
          //console.log('saddles', res)
          return{
            saddleId: res.payload.doc.id,
            name: res.payload.doc.data()['name'],
            color: res.payload.doc.data()['color'],
            equipment: res.payload.doc.data()['equipment'],
            img_file: res.payload.doc.data()['img_file'],
            id: res.payload.doc.data()['id'],
            group: res.payload.doc.data()['group'],
            dressage_: res.payload.doc.data()['dressage_'],
            gallop_: res.payload.doc.data()['gallop_'],
            jumping_: res.payload.doc.data()['jumping_'],
            speed_: res.payload.doc.data()['speed_'],
            stamina_: res.payload.doc.data()['stamina_'],
            trot_: res.payload.doc.data()['trot_'],
          }
        })
      })
  }
}
