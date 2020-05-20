import { UserDataService } from './../services/user-data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Color } from '../color';
import { ColorService } from '../services/color.service';
import { BreedService } from '../services/breed.service';
import { Breed } from '../breed'; 
import { FormBuilder, Validators }  from '@angular/forms'
import { HorseDataService } from '../services/horse-data.service';



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
	skill: string;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private http: HttpClient,
		public colorService: ColorService,
		public breedService: BreedService,
    public userService: UserDataService,
    public horseService: HorseDataService
	) {}

	signupForm = this.fb.group({
		username: [null, [Validators.required, Validators.maxLength(4)]],
		email: ['', [Validators.required, Validators.email]],
		password: [null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%*?&].{8,}')]],
		breed: [null],
		color: [null]
	})

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
			this.skill = this.allBreeds[0].skill;
			console.log(this.allBreeds[0].skill);
		});
		return;
	}

	getSkill(event: Event) {
		var index = this.allBreeds.map((o) => o.breed).indexOf((<HTMLInputElement>event.target).value);
		console.log(index);
		this.skill = this.allBreeds[index].skill;
		console.log(this.skill);
	}
	onSubmit() {
		this.userService.createUser(this.signupForm.value).then(res => {
			this.horseService.createRandomHorse(this.signupForm.value, res.id).subscribe(e => {
        console.log('Success')
      });
		}).catch(error => {
			console.log(error)
		});
	  }
}

