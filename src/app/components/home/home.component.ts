import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { LoginComponent } from './dialogs/login/login.component';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users/users.service';
import { SkullsService } from 'src/app/services/skulls/skulls.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  SocialAuthService,
  FacebookLoginProvider,
  SocialUser,
  GoogleLoginProvider
} from '@abacritt/angularx-social-login';
import { User } from 'src/app/models/User';
import {BehaviorSubject, Observable} from 'rxjs';

interface FramesSkull {
	value: Number;
	viewValue: string;
  imageUrl: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit{
  loginForm!: FormGroup
  user!: SocialUser
  userData: any;
  socialUser!: SocialUser;
  isLoggedin!: boolean;
  googleAccunt:any;
  loginUserForm!: FormGroup;
  skullForm!: FormGroup

  framesSkulls: FramesSkull[] = [
		{
			value: 1,
			viewValue: 'Marco 1',
      imageUrl: '../../../assets/images/frames/frame1.svg',
		},
		{
      value: 2, 
      viewValue: 'Marco 2',
      imageUrl: '../../../assets/images/frames/frame2.svg'
    },
    {
      value: 3, 
      viewValue: 'Marco 3',
      imageUrl: '../../../assets/images/frames/frame3.svg'
    },
	];

  public currentUserSubject: BehaviorSubject<any>;
	public currentUser: Observable<User>;
  constructor(
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,
    private dialog:MatDialog,
    private userService: UsersService,
    private snackBar: MatSnackBar,
    private router: Router,
    private skullService: SkullsService,

  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
			JSON.parse(localStorage.getItem('currentUser') || '{}') as any
		);
		this.currentUser = this.currentUserSubject.asObservable();
    //console.log(this.isLoggedin);
  }

  async ngOnInit(): Promise<void> {
    this.buildLoginForm(); 
    this.loginGoogleTest();
    this.buildloginUser();
    this.buildSkullForm();
  }

  async loginWithFacebook(): Promise<void> {
    this.userData= await this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).
    then(SocialUser => {
      this.user = SocialUser
      //console.log('this.user: ', this.user.response)
      return this.user;
    });
    console.log('El valor final del usuario es: ', this.userData)
    this.userService.createUser(this.userData).subscribe(res =>{
      console.log('res', res);
      this.router.navigate(['/dashboard']);
    })
  }

  loginGoogleTest(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      this.userService.createUser(this.socialUser).subscribe(res =>{
        this.router.navigate(['/dashboard']);
      })
    });
  }

  /* async testGoogle(): Promise<void> {
    console.log('Entro a inicio de sesión con google')
    this.userData= await this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).
    then(SocialUser => {
      this.user = SocialUser
      //console.log('this.user: ', this.user.response)
      return this.user;
    });
    console.log('El valor final del usuario es: ', this.userData)
      this.userService.createUser(this.userData).subscribe(res =>{
      console.log('res', res);
      this.router.navigate(['/dashboard']);
    }) 
  }  */

  /* loginWithGoogle(): void {
    console.log('Entro aqui perro')
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
    });
  } */
  /* logOut(): void {
    this.socialAuthService.signOut();
  } */

  /* signInWithGoogle(): void {
    console.log('event: ')
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user) => {
        this.user = user;
        console.log('user con google', this.user)
        // Aquí puedes realizar acciones adicionales después del inicio de sesión.
      })
      .catch((error) => {
        console.log(error);
      });
  } */


  openDialog(){ 
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '750px',
			height: '550px',
    });
    dialogRef.afterClosed().subscribe(()=>{
      console.log('test')
    })
  }

  buildLoginForm(){
    this.loginForm = this.formBuilder.group({
      nameUser: ['',[Validators.required]],
      lastNameUser: ['',[Validators.required]],
      emailUser: ['',[Validators.required]],
      passwordUser: ['',[Validators.required]],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator })
  }

  buildloginUser(){
    this.loginUserForm = this.formBuilder.group({
      emailUserLogin: ['',[Validators.required]],
      passwordUserLogin: ['',[Validators.required]],
    })
  }

  buildSkullForm(){
    this.skullForm = this.formBuilder.group({
      skullTitle: ['', [Validators.required]],
      skullText: ['', [Validators.required]],
      acceptTerms:['',[Validators.required]],
      skullImageRoute: ['', [Validators.required]],
    })
  }
  
  createSkull(){
    if(this.skullForm.invalid){
      return
    }
    this.skullService.createSkulls(this.skullForm.value).subscribe(res =>{
      if(res){
        this.snackBarSuccess('Se ha creado tu calaverita')
        this.router.navigate(['/dashboard']);
      }
      else {
        this.snackBarFailed('Error al crear la calaverita')
      }
    })
  }

  login(){
    this.userService.loginUser(this.loginUserForm.value).subscribe(res => {
      console.log('Valor de res', res);
      if(res === 'User not existing'){

        console.log('Sesion no iniciada');
        this.snackBarFailed('El usuario no existe')
      }
      else {
        console.log('Sesion iniciada');
        localStorage.setItem('currentUser', JSON.stringify(res));
        this.currentUserSubject.next(res);
        this.snackBarSuccess('Sesion iniciada')
        this.router.navigate(['/dashboard']);
      }
    })
  }



  register(){
    //console.log('Esto es una prueba', this.loginForm.value);
    if(this.loginForm.invalid){
      return
    }
    else {
      this.userService.createUser(this.loginForm.value).subscribe((res:any) =>{
        if(res.msg === 'Usuario existente'){
          this.snackBarSuccess('El correo ya ha sido registrado, inicio sesión')
          localStorage.setItem('currentUser', JSON.stringify(res.data));
          this.currentUserSubject.next(res);
          //this.snackBarSuccess('Sesion iniciada')
          this.router.navigate(['/dashboard']);
          //this.snackBarSuccess('Se creo el usuario')
          //return
          //this.closeDialog();
        }
        else if(res.msg != 'Usuario existente'){
          this.snackBarSuccess('Usuario creado con exito');
          localStorage.setItem('currentUser', JSON.stringify(res.data));
          this.currentUserSubject.next(res);
          this.router.navigate(['/dashboard']);
        }
      });
      
    }
  }

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

  returnDashboard(){
    this.router.navigate(['/dashboard']);
  }

}
