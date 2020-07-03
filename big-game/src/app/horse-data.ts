import { Color } from './color';
import { Breed } from './breed';

export class HorseData {
	id: string;
	breed: string;
	color: string;
	skill: string;
	energy: number;
	gallop: number;
	gender: string;
	health: number;
	jumping: number;
	dressage: number;
	morale: number;
	name: string;
	speed: number;
	stamina: number;
	dayTime: number;
	dob: any;
	months: number;
	years: number;
	height: number;
	weight: number;
	tr_gallop: number;
	tr_jumping: number;
	tr_speed: number;
	tr_stamina: number;
	tr_trot: number;
	tr_dressage: number;
	trot: number;
	c: Color;
	b: Breed;
	isInBed: boolean;
	time: { currentHourString: string, currentMinuteString: string };
	age?: { year: number, month: number, day: number }
	toSell: boolean;
	stud: boolean;
}
