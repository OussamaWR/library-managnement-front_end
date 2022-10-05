import { Router } from '@angular/router';
import { SnackbarService } from './../../services/snackbar.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { DialogRef } from '@angular/cdk/dialog';
import {NgxUiLoaderService} from 'ngx-ui-loader'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userFormGroup !: FormGroup;
  responseMessage : any;

  constructor(private route:Router,
     private userService :UserService ,
     private fb : FormBuilder,
     private snackbar: SnackbarService,
     private dialogRef : DialogRef<SignupComponent>,
     private ngxService : NgxUiLoaderService
     ) { }

  //  = new FormGroup


  ngOnInit(): void {
    this.userFormGroup=this.fb.group({
        name : new FormControl('', [Validators.required ,Validators.minLength(4)] ),
        contactNumber : new FormControl('', [Validators.required ,Validators.minLength(10),Validators.maxLength(13)] ),
        email : new FormControl('',[Validators.required ,Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")]),
        password : new FormControl('', [Validators.required,Validators.minLength(8) ,Validators.maxLength(10)])
      })
  }

  
  close(){
    this.dialogRef.close();
  }



 save(){
  this.ngxService.start();

     this.userService.signup(this.userFormGroup.value).subscribe(
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


}
