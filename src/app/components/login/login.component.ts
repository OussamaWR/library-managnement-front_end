import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DialogRef } from '@angular/cdk/dialog';
import { SnackbarService } from './../../services/snackbar.service';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { AuthService } from 'src/app/services/auth.service';
import { AccountService } from 'src/app/services/account.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userFormGroup !: FormGroup;
  responseMessage : any;

  constructor(
    private route:Router,
     private userService :UserService ,
     private fb : FormBuilder,
     private snackbar: SnackbarService,
     private dialogRef : DialogRef<LoginComponent>,
     private ngxService : NgxUiLoaderService,
     private dialog : MatDialog ,
     private authService : AuthService ,
     private account : AccountService,
     private token: TokenService,
     ) { }


  ngOnInit(): void {
    this.userFormGroup=this.fb.group({
      email : new FormControl('',[Validators.required ,Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")]),
      password : new FormControl('', [Validators.required,Validators.minLength(8) ,Validators.maxLength(10)])
    })
  }

  handleResponse(data:any) {
    this.token.handle(data);
    this.account.changeStatus(true); // is connected

  }



  signIn(){
    this.ngxService.start();
    this.authService.login(this.userFormGroup.value).subscribe(
      res =>{
        this.ngxService.stop();
        this.handleResponse(res);
        this.snackbar.openSnackBar("Wait when  the  admin accept your demande ","success");
        this.dialogRef.close();
        this.route.navigate(["/"]);
      }
    )
  }


  close(){
    this.dialogRef.close();
  }

  forgotPasswordAction(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.width="570px";
    dialogConfig.height="50%";

    this.dialog.open(ForgotPasswordComponent,dialogConfig);
  }







}
