import { Component, OnInit } from '@angular/core';
//import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SkullsService } from 'src/app/services/skulls/skulls.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

interface FramesSkull {
	value: Number;
	viewValue: string;
  imageUrl: string;
}

@Component({
  selector: 'app-create-skull',
  templateUrl: './create-skull.component.html',
  styleUrls: ['./create-skull.component.scss']
})

export class CreateSkullComponent implements OnInit{
  skullForm!: FormGroup
  framesSkulls: FramesSkull[] = [
		{
			value: 1,
			viewValue: 'frame1',
      imageUrl: '../../../assets/images/frames/frame1.svg',
		},
		{
      value: 2, 
      viewValue: 'frame2',
      imageUrl: '../../../assets/images/frames/frame2.svg'
    },
    {
      value: 2, 
      viewValue: 'frame3',
      imageUrl: '../../../assets/images/frames/frame3.svg'
    },
	];

  constructor(
    private formBuilder: FormBuilder,
    //private dialogRef: MatDialogRef<any>,
    private skullService: SkullsService,
    private snackBar: MatSnackBar,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.buildSkullform()
  }

  buildSkullform(){
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

  goToInspiration(){
    this.router.navigate(['/skull/1']);
  }
}
