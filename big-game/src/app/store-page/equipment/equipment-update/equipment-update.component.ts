import { Component, OnInit } from '@angular/core';
import { Equipment } from '../../../equipment';
import { SaddlesService } from './../../../services/saddles.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-equipment-update',
  templateUrl: './equipment-update.component.html',
  styleUrls: ['./equipment-update.component.css']
})
export class EquipmentUpdateComponent implements OnInit {
  abilities = ['0','1','2', '3', '4', '5'];
  colors = ['black','blue','brown', 'tan', 'turquoise', 'white', 'violet', 'zebra','b & w', 'b & bl'];
  groups = ['TBD','western', 'italian', 'competition', 'fox-hunt']
  categories = ['blanket', 'bridal', 'cap', 'cover', 'halter', 'knee pads', 'reins', 'saddle',  'wrap']
  success = 'Equipment has been updated';
  fail = 'Nothing updated, incomplete fields';
  updateEquipment: FormGroup;
  allEquipment: Equipment[];
  selectId: boolean = false;
  itemsUpdated: Array<Equipment> = [];

  constructor(private saddlesService: SaddlesService,
    private fb: FormBuilder) {}

  ngOnInit(): void {
  }

  updateSaddle(
    name: string,
		color: string, 
    equipment: string,
    img_file: string,
    id: string,
    group: string,
    dressage_: number,
    gallop_: number,
    jumping_: number,
    speed_: number,
    stamina_: number,
    trot_: number,
    cost: number,
    ) {
      this.saddlesService.updateSaddle(name, color, equipment, img_file, id, group, dressage_, gallop_, jumping_, speed_, stamina_, trot_, cost);
		return alert(this.success);
    }

  onSelectItem(ind) {
    if (this.itemsUpdated.includes(this.allEquipment[ind])) {
      let indToRemove: number = this.itemsUpdated.indexOf(this.allEquipment[ind]);
      this.itemsUpdated.splice(indToRemove, 1);
      // console.log('Items to be removed ', this.itemsRemoved);
    } else {
      this.itemsUpdated.push(this.allEquipment[ind])
      // console.clear();
      // console.log('Items to be removed ', this.itemsRemoved);
    }
  }

}
