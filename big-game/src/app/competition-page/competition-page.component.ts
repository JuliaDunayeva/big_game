import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { HorseData } from '../horse-data';
import { HorseDataService} from '../services/horse-data.service';

@Component({
  selector: 'app-competition-page',
  templateUrl: './competition-page.component.html',
  styleUrls: ['./competition-page.component.css']
})
export class CompetitionPageComponent implements OnInit {
  allSkills: string[];
  allHorseData: HorseData[];
  public horse: HorseData;
  public id: string;
  public readonly = true;
  public rate:number;

  ctrl = new FormControl(null, Validators.required);

  constructor(private router: ActivatedRoute, 
    public horseDataService: HorseDataService) {
   // this.id = this.router.snapshot.params.id;
   this.id=sessionStorage.getItem('horseid');
  }

  ngOnInit(): void {
    setTimeout(() => 
	{
    this.horseDataService.getHorseById(this.id).subscribe(res => {
      this.horse = res;
  });
}, 750);
}

  getHorseData(): HorseData[] {
    this.horseDataService.getHorseData().subscribe(
            result =>{
              this.allHorseData = result as Array<HorseData>;
            }
        );
	return this.allHorseData;
  }

  toggle() {
    if (this.ctrl.disabled) {
      this.ctrl.enable();
    } else {
      this.ctrl.disable();
    }
  } 
}
