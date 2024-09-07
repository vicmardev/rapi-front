import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/User';
import { ConfirmVoteComponent } from '../confirm-vote/confirm-vote.component';
import { UsersSkullsService } from 'src/app/services/users-skulls/users-skulls.service';
import { FacebookService } from 'src/app/services/facebook.service';
import { ShareSkullComponent } from '../share-skull/share-skull.component';

@Component({
  selector: 'app-skull-detail',
  templateUrl: './skull-detail.component.html',
  styleUrls: ['./skull-detail.component.scss']
})
export class SkullDetailComponent implements OnInit{
  userData!: User;
  urlSkull: string = '';
  urlDinamica: string = "";
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<any>,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private userSkullService: UsersSkullsService
  ){

  }

  get user (){
    this.userData = JSON.parse(localStorage.getItem('currentUser') || '{}' ) as any;
    console.log('El usuario es: ', this.userData)
    return this.userData
  }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('currentUser') || '{}' ) as any;
    this.urlDinamica = this.validateEnvironment()
    //this.urlDinamica = "http://198.71.57.99/home"
    console.log('Valor de la urlDinamica: ', this.urlDinamica)
    /* console.log('El usuario es: ', this.userData)
    console.log('El valor de data es: ', this.data.info) */
  }

  voteSkull(){
    const dialogRef = this.dialog.open(ConfirmVoteComponent,{
      width: 'auto',
      height: 'auto'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true){
        console.log('La desicion fue true')
        this.userSkullService.voteSkull(this.userData, this.data.info).subscribe(res =>{
          if(res === 'Duplicate vote'){
            this.snackBarFailed('Ya has votado por esta calaverita')
          }
          else {
            this.snackBarSuccess('Se registro el voto')
          }
        })
      }
      else {
        console.log('Cancelo')
      }
    })
  }

  /* shareSkull(){
    const idSkull = this.data.info.idSkull
    console.log('El Id de la calaverita es: ', idSkull)
    const hostname = window.location.hostname
    const dialogRef = this.dialog.open(ShareSkullComponent, {
      width:'auto',
      height: 'auto'
    });
    if(hostname === 'localhost' || hostname === '127.0.0.1' || hostname === 'localhost:4200'){
      //console.log('Estamos en un ambiente de desarrollo', hostname)
      this.urlSkull = `http://${hostname}:4200/skull?idSkull=${idSkull}`
      console.log('Estamos en un ambiente de desarrollo', this.urlSkull )
    }

    else {
      console.log('Estamos en un ambiente de produccion', hostname)
      this.urlSkull = `${hostname}/skull&idSkull=${idSkull}`
    }

  } */

  validateEnvironment(){
    const idSkull = this.data.info.idSkull
    const hostname = window.location.hostname
    console.log('hostname: ', hostname)
    //http://localhost:4200/dashboard
    if(hostname === 'localhost' || hostname === '127.0.0.1' || hostname === 'localhost:4200'){
      console.log('Estamos en un ambiente de desarrollo', this.urlSkull )
      return this.urlSkull = `http://${hostname}:4200/skull/${idSkull}`
    }
    else {
      console.log('Estamos en un ambiente de produccion', hostname)
      return this.urlSkull = `${hostname}/skull/${idSkull}`
    }
  }

  shareOnFacebook(){
    console.log('Valor de url', this.urlSkull)
    const urlCompartir = encodeURIComponent(this.urlDinamica);
    const enlaceCompartir = 'https://www.facebook.com/sharer/sharer.php?u=' + urlCompartir;
    window.open(enlaceCompartir, '_blank');
  }

  sharedFacebook() {
    console.log('Valor de url',this.urlSkull)
    const enlaceCompartir = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(this.urlDinamica);
    window.open(enlaceCompartir, 'Compartir en Facebook', 'width=600,height=400');
  }

  compartirURLTwitter() {
    const urlCompartir = encodeURIComponent(this.urlDinamica);
    const enlaceCompartir = 'https://twitter.com/intent/tweet?url=' + urlCompartir;
    window.open(enlaceCompartir, '_blank');
  }

  sharedTwitter() {
    const enlaceCompartir = 'https://twitter.com/intent/tweet?url=' + encodeURIComponent('https://www.youtube.com/watch?v=JTlfZ-iejnM') + '&text=' + encodeURIComponent('Sigueme');
    window.open(enlaceCompartir, 'Compartir en Twitter', 'width=600,height=400');
  }

  snackBarSuccess(message: any){
    this.snackBar.open(`${message}`, '', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['background-snack-info']
    });
  }

  snackBarFailed(message: any){
    this.snackBar.open(`${message}`, '', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['background-snack-warn']
    });
  }


}
