import { BlackSaddles } from './../black-saddles';
import { BlackSaddleService } from './../services/black-saddle.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-options',
  templateUrl: './modal-options.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./modal-options.component.css']
})
export class ModalOptionsComponent  {
  blackSaddles: BlackSaddles[];

  constructor(private modalService: NgbModal, private blackSaddleService: BlackSaddleService  ) {}
   
  ngOnInit(): void {
    this.showlist()
   }

   showlist(){
    this.blackSaddleService.getBlackSaddles().subscribe(data =>{
   
      this.blackSaddles = data.map(res =>{
        return{
          id: res.payload.doc.id,
          name: res.payload.doc.data()['name'],
          dressage: res.payload.doc.data()['dressage'],
          gallop: res.payload.doc.data()['gallop'],
          jumping: res.payload.doc.data()['jumping'],
          speed: res.payload.doc.data()['speed'],
          stamina: res.payload.doc.data()['stamina'],
          trot: res.payload.doc.data()['trot'],
       }
      })
    })

  }


}
