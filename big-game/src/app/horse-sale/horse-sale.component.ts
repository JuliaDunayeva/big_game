import { Component, OnInit } from '@angular/core';
import { UserData } from '../user-data';
import { UserDataService } from '../services/user-data.service';
import { HorseData } from '../horse-data';
import { HorseDataService} from '../services/horse-data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-horse-sale',
  templateUrl: './horse-sale.component.html',
  styleUrls: ['./horse-sale.component.css']
})
export class HorseSaleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
