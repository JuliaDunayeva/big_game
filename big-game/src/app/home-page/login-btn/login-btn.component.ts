import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-btn',
  templateUrl: './login-btn.component.html',
  styleUrls: ['./login-btn.component.css']
})
export class LoginBtnComponent implements OnInit {

  constructor(private router: Router) {}
  
  ngOnInit(): void {
  }
  
  logIn(form: NgForm) {
    this.router.navigate(['horse-page/:id'])
  }

}
