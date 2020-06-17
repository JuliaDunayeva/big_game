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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  allBreeds: Breed[];
  allColors: Color[];
  allSkills: string[];
  breedSelected: Breed;
  colorSelected: Color;
  skillSelected: string;
  breedIdSelected: string;
  colorIdSelected: string;
  imagePath: string = '../../assets/images/horses/akhal_teke/alz-b.png';
  public validEmail: boolean = true;
  public horseid: any;

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
    username: [null, [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email,]],
    password: [null,
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
    this.breedService.getBreeds().subscribe((brd) => {
      this.allBreeds = brd.map(res => {
        return {
          id: res.payload.doc.id,
          breed: res.payload.doc.data()['breed'],
          skill: res.payload.doc.data()['skill'],
          img_path: res.payload.doc.data()['img_path']
        }
      });
      this.breedSelected = this.allBreeds[0];
      this.breedIdSelected = this.allBreeds[0].id
      this.skillSelected = this.breedSelected.skill
    });
  }

  getColors() {
    this.colorService.getColors().subscribe(clr => {
      this.allColors = clr.map(res => {
        return {
          id: res.payload.doc.id,
          color: res.payload.doc.data()['color'],
          img_file: res.payload.doc.data()['img_file']
        }
      });
      this.colorSelected = this.allColors[0];
      this.colorIdSelected = this.allColors[0].id
    });
  }

  getSkill(breed: Breed) {
    this.breedSelected = breed;
    this.skillSelected = this.breedSelected.skill;
    this.breedIdSelected = breed.id;
    this.imagePath = '../../assets/images/horses/';
    this.imagePath += `${this.breedSelected.img_path}/${this.colorSelected.img_file}`;
  }

  getImage(color: Color) {
    this.colorSelected = color;
    console.log(this.colorSelected);
    this.colorIdSelected = color.id
    this.imagePath = '../../assets/images/horses/';
    this.imagePath += `${this.breedSelected.img_path}/${this.colorSelected.img_file}`;
  }

  onSubmit() {
    let user = this.userService.signUpUser(this.signupForm).subscribe((a) => {
      if (a.length == 0) {
        this.validEmail = true;
        this.userService.createUser(this.signupForm.value).then((res) => {
          sessionStorage.setItem('uid', res.id)
          console.log(this.breedIdSelected, this.colorIdSelected, this.skillSelected)
          this.horseService
            .createRandomHorse(this.signupForm.value, res.id, this.breedIdSelected, this.colorIdSelected, this.skillSelected, "New Horse")
            .subscribe((e) => {
              this.router.navigate(['horse-list']);
            });
        })

      } else {
        this.validEmail = false;
      }
      return a;
    });
  }
}
