import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HorseData } from '../horse-data';
import { HorseDataService} from '../services/horse-data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-competition-page',
  templateUrl: './competition-page.component.html',
  styleUrls: ['./competition-page.component.css']
})
export class CompetitionPageComponent implements OnInit {
  allSkills: string[];
  allHorseData: HorseData[];
  public horse: HorseData;
  public id?: string;
  public readonly = true;
  public rate:number;

  ctrl = new FormControl(null, Validators.required);

  constructor(private router: ActivatedRoute, 
    public horseDataService: HorseDataService,private authService:AuthService) {
    this.id=this.authService.getHorseId();
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
    this.horseDataService.getHorseData().subscribe(result =>{
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
