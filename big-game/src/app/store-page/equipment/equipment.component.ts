import { Component, OnInit } from '@angular/core';
import { Equipment } from './../../equipment';
import { SaddlesService } from './../../services/saddles.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {
  abilities = ['0','1','2', '3', '4', '5'];
  success = 'New Equipment has been added';
  fail = 'Nothing added, incomplete fields';
  newEquipment: FormGroup;
  allEquipment: Equipment[];


  constructor(private saddlesService: SaddlesService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getEquipmentList()
  }

  getEquipmentList() {
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
            cost: res.payload.doc.data()['cost '],
          }
        })
      })
  }

}
