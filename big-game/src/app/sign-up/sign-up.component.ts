
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
import { AuthService } from '../services/auth.service';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  allColors: Color[];
  allBreeds: Breed[];
  allSkills: string[];
  skillSelected: string;
  imagePath: string = '../../assets/images/horses/akhal_teke/alz-b.png';
  breedIndex: number = 0;
  colorIndex: number = 0;
  public validEmail: boolean = true;
  public horseid: any;
  breedSelected: Breed;
  colorSelected: Color;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    public colorService: ColorService,
    public breedService: BreedService,
    public userService: UserDataService,
    public horseService: HorseDataService,
    public authService: AuthService,
    private modalService: NgbModal
  ) { }

  signupForm = this.fb.group({
    username: [null, [Validators.required, Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.email,]],
    password: [
      null,
      [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-zd$@$!%*?&].{8,}')]
    ],
    checkbox: [null, [Validators.requiredTrue]],
    confirmpassword: [null, [Validators.required]],
    breed: 'Akhal-Teke',
    color: 'Chestnut'
  });

  ngOnInit() {
    this.getColors();
    this.getBreeds();
  }

  getBreeds() {
      this.breedService.getBreeds().subscribe((result) => {
      this.allBreeds = result as Array<Breed>;
      console.log(this.allBreeds)
      this.breedSelected = this.allBreeds[0];
      this.skillSelected = this.breedSelected.skill
    });
  }

  getColors(){
    this.colorService.getColors().subscribe((result) => {
      this.allColors = result as Color[];
      this.colorSelected = this.allColors[0];
    });
  }

  getSkill(breed: Breed) {
    // this.breedIndex = this.allBreeds.map(o => o.breed).indexOf((<HTMLInputElement>event.target).id);
    this.breedSelected = breed;
    this.skillSelected = this.breedSelected.skill;
    this.imagePath = '../../assets/images/horses/';
    // this.imagePath += this.allBreeds[this.breedIndex].img_path + '/' + this.allColors[this.colorIndex].img_file;
    this.imagePath +=  `${this.breedSelected.img_path}/${this.colorSelected.img_file}`;
    
  }

  getImage(color: Color) {
    // this.colorIndex = this.allColors.map(o => o.color).indexOf((<HTMLInputElement>event.target).id);
    this.colorSelected = color;
    this.imagePath = '../../assets/images/horses/';
    // this.imagePath += this.allBreeds[this.breedIndex].img_path + '/' + this.allColors[this.colorIndex].img_file;
    this.imagePath +=  `${this.breedSelected.img_path}/${this.colorSelected.img_file}`;
  }

  onSelectBreed() {
    this.signupForm.value.breed
  }

  onSelectColor() { }

  onSubmit() {
    let user = this.userService.signUpUser(this.signupForm).subscribe((a) => {

      if (a.length == 0) {
        this.validEmail = true;
        this.userService.createUser(this.signupForm.value).then((res) => {
         sessionStorage.setItem('uid', res.id)
          
          this.horseService
            .createRandomHorse(this.signupForm.value, this.skillSelected, res.id)
            .subscribe((e) => {
              this.router.navigate(['horse-list']);
            });
        })
        
      } else {
        this.validEmail = false;
        // this.open();
      }
      return a;
    });
  }

  // open() {
  //   const modalRef = this.modalService.open(NgbdModalContent);
  //   modalRef.componentInstance.name = 'World';
  // }
}