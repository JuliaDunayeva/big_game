import { Component, OnInit } from '@angular/core';
import { EqCenterService } from 'src/app/services/eq-center-service.service';
import { EqCenters } from '../eq-centers';
import { HorseData } from '../horse-data';
import { HorseDataService } from '../services/horse-data.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-eqcenter',
  templateUrl: './eqcenter.component.html',
  styleUrls: ['./eqcenter.component.css']
})

export class EqcenterComponent implements OnInit {
  public id: string;

  constructor( public horseDataService: HorseDataService, private authService: AuthService, private eqcenterService: EqCenterService) {
    this.id = this.authService.getHorseId();
  }

  ngOnInit(): void {
  }

}
