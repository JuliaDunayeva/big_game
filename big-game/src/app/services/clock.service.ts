import { Injectable } from '@angular/core';

interface time {
  currentHour: string,
  currentMinute: string
}

@Injectable({
  providedIn: 'root'
})
export class ClockService{
  private hours: number;
  private minutes: number;
  private seconds: number;
  private currentSeconds: number = 86400
  private time = {currentHour: "24", currentMinute: "00"}
  

  constructor() {}

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

    this.currentSeconds -= this.seconds
    this.time.currentHour = Math.floor((this.currentSeconds / 3600)).toString()
    this.time.currentMinute = Math.floor(((this.currentSeconds % 3600) + (this.minutes)) / 60).toString()
    
    if (this.time.currentMinute.length == 1) {
      this.time.currentMinute = "0" + this.time.currentMinute;
    }
    
    if (this.time.currentHour.length == 1) {
      this.time.currentHour = "0" + this.time.currentHour;
    }

    console.log(this.time)
  }
}
