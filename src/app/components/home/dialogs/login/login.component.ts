import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MustMatch } from 'src/app/helpers/must-match.validators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  constructor(private formBuilder:FormBuilder,
              private dialogRef: MatDialogRef<any>,
              private userService:UsersService,
              private snackBar: MatSnackBar) {
  }
  ngOnInit(): void {
    this.createFormBuild();
  }

  createFormBuild(){
    this.loginForm = this.formBuilder.group({
      nameUser: ['',[Validators.required]],
      lastNameUser: ['',[Validators.required]],
      emailUser: ['',[Validators.required]],
      passwordUser: ['',[Validators.required]],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator })
  }

  login(){
    //console.log('Esto es una prueba', this.loginForm.value);
    if(this.loginForm.invalid){
      return
    }
    else {
      this.userService.createUser(this.loginForm.value).subscribe(res =>{
        if(res){
          this.snackBarSuccess('Se creo el usuario')
          this.closeDialog();
        }
        else{
          this.closeDialog();
        }
      });
      
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }

  /* passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    console.log('Entro al validador')
    const password = control.get('passwordUser');
    const confirmPassword = control.get('confirmPassword');
    console.log('password ', password)
    console.log('confirmPassword ', confirmPassword)
    if (password?.value !== confirmPassword?.value) {
      return { 'passwordMismatch': true };
    }else {
      console.log('No son iguales')
      return null;
    }

  } */

  passwordMatchValidator(group: FormGroup): { [key: string]: any } | null {
    const password = group.get('passwordUser')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if(password === confirmPassword){
      return null
    }
    else {
      return { 'passwordMismatch': true }
    }
    
  }


  snackBarSuccess(message: any){
    this.snackBar.open(`${message}`, '', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['background-snack-info']
    })
  }

  snackBarFailed(message: any){
    this.snackBar.open(`${message}`, '', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['background-snack-warn']
    })
  }

}
