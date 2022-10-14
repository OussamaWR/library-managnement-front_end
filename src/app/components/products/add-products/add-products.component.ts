import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DialogRef } from '@angular/cdk/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpService } from './../../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {


  productFormGroup !: FormGroup;
  responseMessage : any;
  categories !: Category[];


  constructor( private httpService:HttpService ,
    private fb : FormBuilder,
    private snackbar: SnackbarService,
    private dialogRef : DialogRef<AddProductsComponent>,
    private ngxService : NgxUiLoaderService
    ) { }

  ngOnInit(): void {

    this.getAllCategories();

    this.productFormGroup=this.fb.group({
      name : new FormControl('', [Validators.required ,Validators.minLength(4)] ),
      image : new FormControl('', [Validators.required ] ),
      category :  new FormControl('', Validators.required  ),
      description : new FormControl('',Validators.required ),
      price : new FormControl('', [Validators.required])
    })
  }




  getAllCategories(){
    this.httpService.authGet('category').subscribe((res:any)=>{
      this.categories=res.body
      console.log("category",this.categories)
    } )
  }


  close(){
    this.dialogRef.close();
  }

  save(){
    this.ngxService.start();

     this.httpService.authPost('product',{...this.productFormGroup.value , category:{id:this.productFormGroup.value.category}}).subscribe(
      (response:any)=>{ // response dyal requet
        this.ngxService.stop();
        this.responseMessage=response?.message;
        this.snackbar.openSnackBar(this.responseMessage,"success");
        this.dialogRef.close();

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
    // console.log("data is :",{...this.productFormGroup.value , category:{id:this.productFormGroup.value.category}});
}



}
