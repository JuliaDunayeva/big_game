import { Injectable } from '@angular/core';
import { HorseDataService } from './horse-data.service';

interface time {
  currentHourString: string,
  currentMinuteString: string
}

@Injectable({
  providedIn: 'root'
})
export class ClockService{
  private hours: number;
  private minutes: number;
  private seconds: number;
  private currentSeconds: number = 86400
  private time: {currentHourString: string, currentMinuteString: string} = {currentHourString:"24", currentMinuteString: "00"}

  constructor(private horseService: HorseDataService) {}

   getSeconds(){
     return this.seconds
   }

   getCurrentTime() {
     return this.time
   }

   updateTime(hours: number, minutes: number) {
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = (hours*3600) + (minutes * 60)

    let currentHour: number;
    let currentMinute: number;

    this.currentSeconds -= this.seconds
    currentHour = Math.floor((this.currentSeconds / 3600));
    currentMinute = Math.floor((this.currentSeconds % 3600) /60);
    
    if (currentHour > 0) {
      this.time.currentHourString = currentHour.toString()
    } else {
      this.time.currentHourString = "24"
    }

    this.time.currentMinuteString = currentMinute.toString()
    
    if (this.time.currentMinuteString.length == 1) {
      this.time.currentMinuteString = "0" + this.time.currentMinuteString;
    }
    
    if (this.time.currentHourString.length == 1) {
      this.time.currentHourString = "0" + this.time.currentHourString;
    }

    this.updateFirebase();
  }

  updateFirebase() {
    this.horseService.updateHorseTime(this.time)
  }
}
