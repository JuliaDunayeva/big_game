import { UserData } from 'src/app/user-data';
import { UserDataService } from './../services/user-data.service';
import { Component, OnInit, Input } from '@angular/core';
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
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap'
// @Component({
//   selector: 'ngbd-modal-content',
//   template: `
//     <div class="modal-body">
//     <p class="text-danger"> Email already exists</p>
//     </div>
//     <div class="modal-footer">
//       <button type="button" class="btn btn-outline-dark" 
//       (click)="activeModal.close('Close click')">Close</button>
//     </div>
//   `
// })
// export class NgbdModalContent {
//   @Input() name;

//   constructor(public activeModal: NgbActiveModal) { }
// }
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  // colors: Color[] = [];
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

  getColors(): Color[] {
    this.colorService.getColors().subscribe((result) => {
      console.log(result);
      this.allColors = result as Color[];
      console.log('All Colors ' + this.allColors[0].color)
      console.log('All Colors ' + result)
    });
    return this.allColors;
  }

  getBreeds(): Breed[] {
      this.breedService.getBreeds().subscribe((result) => {
      console.log(result)
      this.allBreeds = result as Array<Breed>;
      console.log(this.allBreeds)
      this.skillSelected = this.allBreeds[0].breed;
      console.log(this.skillSelected);
    });
    return this.allBreeds;
  }

  getSkill(event: Event) {
    this.breedIndex = this.allBreeds.map(o => o.breed).indexOf((<HTMLInputElement>event.target).id);
    this.skillSelected = this.allBreeds[0].skill;
    console.log(this.skillSelected)
    this.imagePath = '../../assets/images/horses/';
    this.imagePath += this.allBreeds[this.breedIndex].img_path + '/' + this.allColors[this.colorIndex].img_file;
  }

  getImage(event: Event) {
    this.colorIndex = this.allColors.map(o => o.color).indexOf((<HTMLInputElement>event.target).id);
    this.imagePath = '../../assets/images/horses/';
    this.imagePath += this.allBreeds[this.breedIndex].img_path + '/' + this.allColors[this.colorIndex].img_file;
  }

  onSelectBreed() {
    //getBreedByName()
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