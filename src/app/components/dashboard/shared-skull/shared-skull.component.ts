import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { SkullsService } from 'src/app/services/skulls/skulls.service';
import { ConfirmVoteComponent } from '../dialogs/confirm-vote/confirm-vote.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UsersSkullsService } from 'src/app/services/users-skulls/users-skulls.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-shared-skull',
  templateUrl: './shared-skull.component.html',
  styleUrls: ['./shared-skull.component.scss']
})
export class SharedSkullComponent implements OnInit{
  [x: string]: any;
  skullData:any
  urlSkull: string = '';
  urlDinamica: string = "";
  userData!: User;
  idSkull: any;
  constructor(private router: ActivatedRoute,
    private routing: Router,
    private skullService: SkullsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private userSkullService: UsersSkullsService,
    ){
}

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('currentUser') || '{}' ) as any;
    console.log('Entro a la pagina de la calavaerita')
    console.log(this.router.snapshot.paramMap.get('idSkull'))
    this.idSkull = this.router.snapshot.paramMap.get('idSkull');
    this.skullService.getSkullById(this.idSkull).subscribe(res =>{
      this.skullData = res
      console.log('Valor de res ', res)
    })
    this.urlDinamica = this.validateEnvironment(this.idSkull)
  }

  validateEnvironment(idSkull:any){
    console.log('Environmente', idSkull)
    //const idSkull = this.idSkull
    const hostname = window.location.hostname
    console.log('hostname: ', hostname)
    if(hostname === 'localhost' || hostname === '127.0.0.1' || hostname === 'localhost:4200'){
      console.log('Estamos en un ambiente de desarrollo', this.urlSkull )
      return this.urlSkull = `http://${hostname}:4200/skull/${idSkull}`
    }
    else {
      console.log('Estamos en un ambiente de produccion', hostname)
      return this.urlSkull = `${hostname}/skull/${idSkull}`
    }
  }

  lineBreak(text: any){
    let textBreak = text.replace(/\./g, '.\n');
    console.log(textBreak)
    return textBreak
  }
  
  voteSkull(){
    const dialogRef = this.dialog.open(ConfirmVoteComponent,{
      width: 'auto',
      height: 'auto'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true){
        console.log('La desicion fue true')
        this.userSkullService.voteSkull(this.userData, this.skullData).subscribe(res =>{
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

  shareOnFacebook(){
    console.log('Valor de url', this.urlDinamica);

    const urlCompartir = encodeURIComponent(this.urlDinamica);
    const enlaceCompartir = 'https://www.facebook.com/sharer/sharer.php?u=' + urlCompartir;
    window.open(enlaceCompartir, '_blank');
  }

  sharedFacebook() {
    console.log('Valor de url',this.urlDinamica)
    const enlaceCompartir = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(this.urlDinamica);
    window.open(enlaceCompartir, 'Compartir en Facebook', 'width=600,height=400');
  }

  sharedTwitter() {
    console.log('Valor de url',this.urlDinamica)
    const enlaceCompartir = 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(this.urlDinamica);
    window.open(enlaceCompartir, 'Compartir en Twitter', 'width=600,height=400');
  }

  returnDashboard(){
    this.routing.navigate(['/dashboard']);
  }
}
