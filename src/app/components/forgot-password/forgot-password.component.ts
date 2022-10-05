import { LoginComponent } from './../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DialogRef } from '@angular/cdk/dialog';
import { SnackbarService } from './../../services/snackbar.service';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  userFormGroup !: FormGroup;
  responseMessage : any;

  constructor(private route:Router,
     private userService :UserService ,
     private fb : FormBuilder,
     private snackbar: SnackbarService,
     private dialogRef : DialogRef<LoginComponent>,
     private ngxService : NgxUiLoaderService,
     private dialog : MatDialog
     ) { }


  ngOnInit(): void {
    this.userFormGroup=this.fb.group({
      email : new FormControl('',[Validators.required ,Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")])
    })
  }

  send(){
    this.ngxService.start();
    this.userService.forgotPassword(this.userFormGroup.value).subscribe(
      (response:any)=>{ // response dyal requet
        this.ngxService.stop();
        this.responseMessage=response?.message;
        this.snackbar.openSnackBar(this.responseMessage,"success");
        this.dialogRef.close();
        this.route.navigate(["/"]);
      } ,
      (error)=>{
        this.ngxService.stop();
       if(error.error?.message){
        this.responseMessage=error.error?.message;

       }else{
        this.responseMessage="Something  is wrong , check your information !!";

       }
        this.snackbar.openSnackBar(this.responseMessage,"error");

      }
    )
  }

  close(){
    this.dialogRef.close();
  }


}
