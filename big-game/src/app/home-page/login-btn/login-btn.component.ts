import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-btn',
  templateUrl: './login-btn.component.html',
  styleUrls: ['./login-btn.component.css']
})
export class LoginBtnComponent implements OnInit {

  constructor(private router: Router) { }

  logIn() {
    this.router.navigate(['/horse-page'])
  }
  ngOnInit(): void {
  }

}
