import { Router } from '@angular/router';
import { TokenService } from './../../services/token.service';
import { AccountService } from './../../services/account.service';
import { LoginComponent } from './../login/login.component';
import { Component, DoCheck, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public opened: boolean = false;
  public currentActiveTab = 0;
  public currentUser?: null;
  public loggedIn: boolean = false;
  public name!: string;

  constructor(
    private dialog: MatDialog,
    private accountService: AccountService,
    private tokenService: TokenService,
    private router: Router
  ) {}




  ngOnInit(): void {

    this.accountService.authStatus.subscribe((value) => {
      this.loggedIn = value;
      console.log(this.loggedIn);
      this.currentUser = this.tokenService.getInfos();
    });
  }

  signUpAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(SignupComponent, dialogConfig);
  }

  signInAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(LoginComponent, dialogConfig);
  }

  open(e: any) {
    this.opened = !this.opened;

    e.toggle();
  }

  logout() {
    this.opened = false;
    this.tokenService.remove();
    this.accountService.changeStatus(false);
    this.router.navigateByUrl('/');
  }

  change(index: any) {
    this.currentActiveTab = index;
  }
}
