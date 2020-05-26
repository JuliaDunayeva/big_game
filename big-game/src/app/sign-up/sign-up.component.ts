import { UserDataService } from './../services/user-data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Color } from '../color';
import { ColorService } from '../services/color.service';
import { BreedService } from '../services/breed.service';
import { Breed } from '../breed';
import { FormBuilder, Validators } from '@angular/forms';
import { HorseDataService } from '../services/horse-data.service';
import { Command } from 'protractor';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: [ './sign-up.component.css' ]
})

export class SignUpComponent implements OnInit {
	colors: Color[] = [];
	allColors: Color[];
	allBreeds: Breed[];
	allSkills: string[];
	skillSelected: string;
	imagePath: string = '../../assets/images/horses/akhal_teke/alz-b.png';
	breedIndex: number = 0;
	colorIndex: number = 0;

	public horseid: any;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private http: HttpClient,
		public colorService: ColorService,
		public breedService: BreedService,
		public userService: UserDataService,
		public horseService: HorseDataService,
		public authService: AuthService
	) {}

	signupForm = this.fb.group({
		username: [ null, [ Validators.required, Validators.minLength(8) ] ],
		email: [ '', [ Validators.required, Validators.email ] ],
		password: [
			null,
			[ Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-zd$@$!%*?&].{8,}') ]
		],
		checkbox: [ null, [ Validators.requiredTrue ] ],
		confirmpassword: [ null, [ Validators.required ] ],
		breed: 'Akhal-Teke',
		color: 'Chestnut'
	});

	ngOnInit() {
		this.getColors();
		this.getBreeds();
	}

	getColors(): Color[] {
		this.colorService.getColors().subscribe((result) => {
			console.log(result);
			this.allColors = result as Array<Color>;
		});
		return this.colors;
	}

	getBreeds(): Breed[] {
		this.breedService.getBreeds().subscribe((result) => {
			console.log(result);
			this.allBreeds = result as Array<Breed>;
			this.skillSelected = this.allBreeds[0].skill;
			console.log(this.allBreeds[0].skill);
		});
		return;
	}

	getSkill(event: Event) {
		this.breedIndex = this.allBreeds.map((o) => o.breed).indexOf((<HTMLInputElement>event.target).id);
		this.skillSelected = this.allBreeds[this.breedIndex].skill;
		this.imagePath = '../../assets/images/horses/';
		this.imagePath += this.allBreeds[this.breedIndex].img_path + '/' + this.allColors[this.colorIndex].img_file;
	}

	getImage(event: Event) {
		this.colorIndex = this.allColors.map((o) => o.color).indexOf((<HTMLInputElement>event.target).id);
		this.imagePath = '../../assets/images/horses/';
		this.imagePath += this.allBreeds[this.breedIndex].img_path + '/' + this.allColors[this.colorIndex].img_file;
	}

	onSubmit() {

		this.userService	
			.createUser(this.signupForm.value)	
			.then((res) => {			
				console.log(res.id);
				this.horseService						
					.createRandomHorse(this.signupForm.value, this.skillSelected, res.id)	
						.subscribe((e) => {
						this.router.navigate([ 'horse-page/' + e.id ]);							
						//this.userService
						
					});
					//.createUser(this.signupForm.value,e.id);
			})	

		/*
		this.horseService
			.createRandomHorse(this.signupForm.value, this.skillSelected, '') //res.id)
			.subscribe((e) => {
				this.userService.createUser(this.signupForm.value, e.id);
				new AuthService();
				this.horseid = this.userService.horse1_id;
				//console.log(e.p);
				this.router.navigate([ 'horse-page/' + e.id ]);
			});

		//console.log(this.userService.horse1_id);
		//this.router.navigate([ 'horse-page/' + this.userService.horse1_id]);

		//.then((res) => {

		/*})
			.catch((error) => {
				console.log(error);
			});*/
	}
}
