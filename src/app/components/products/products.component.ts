import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpService } from './../../services/http.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProduitService } from './../../services/produit.service';
import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Produit } from 'src/app/models/produits.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, Validators } from '@angular/forms';
import { AddProductsComponent } from './add-products/add-products.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit  , OnChanges{

  constructor(private produitService:ProduitService ,
    private ngxService : NgxUiLoaderService,
    private httpService:HttpService ,
    private _formBuilder: FormBuilder ,
    private dialog: MatDialog) { }

  public produits ! : Produit[] ;

  ngOnInit(): void {

      this.get()

  }

  ngOnChanges(changes: SimpleChanges): void {


    window.addEventListener('scroll',()=>{
      console.log('====================================');
      console.log("test");
      console.log('====================================');
    })
  }

  addProduct() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(AddProductsComponent, dialogConfig);
  }

 isChecked = true;
  formGroup = this._formBuilder.group({
    enableWifi: '',
    acceptTerms: ['', Validators.requiredTrue],
  });



  onFormSubmit() {
    alert(JSON.stringify(this.formGroup.value, null, 2));
  }


  get(){
    this.ngxService.start();

    this.httpService.authGet('product')
    .subscribe((res : any) =>{

      this.produits = res.body

      this.ngxService.stop();

    } )

  }



}

