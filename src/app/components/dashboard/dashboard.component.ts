import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { SkullsService } from 'src/app/services/skulls/skulls.service';
import { SkullDetailComponent } from './dialogs/skull-detail/skull-detail.component';
import { ConfirmVoteComponent } from './dialogs/confirm-vote/confirm-vote.component';
import { UsersSkullsService } from 'src/app/services/users-skulls/users-skulls.service';
import { User } from 'src/app/models/User';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  
  skullList: any;
  userData!: User;
  hostName: any;

  constructor(
    private skullService: SkullsService, 
    private dialog: MatDialog, 
    private router: Router,
    private snackBar: MatSnackBar,
    private userSkullService: UsersSkullsService
    ){}

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('currentUser') || '{}') as any;
    this.getAllSkulls()
    let hostname = window.location.hostname;
    if(hostname === 'localhost' || hostname === '127.0.0.1' || hostname === 'localhost:4200'){
      this.hostName = `http://${hostname}:4200/skull/`
    }
    else {
      this.hostName = `${hostname}/skull/`
    }
  }

  getAllSkulls(){
    this.skullService.getAllSkulls().subscribe(skull=> {
      //console.log('El valor de skulls es: ', skull)
      this.skullList = skull
    })
  }



  lineBreak(text: any){
    let textBreak = text.replace(/\./g, '.\n');
    console.log(textBreak)
    return textBreak
  }

  shortDescription(text: any) {
    const palabras = text.split(/\s+/);
    const primeras20Palabras = palabras.slice(0, 20);
    const resultado = primeras20Palabras.join(" ");
    return resultado
  }

  openDetail(event: any){
    const dialogRef = this.dialog.open(SkullDetailComponent, {
      width: '50%',
      height: 'auto',
      data: {
        info: event
      }
    });
  }

  openCreateSkull(){
    this.router.navigate(['/createSkull'])
  }

  closeSession(){
    this.router.navigate(['/home']);  
  }
  
  goToRegister(){
    this.router.navigate(['/home'])
  }

  voteSkull(skull: any){
    if(localStorage['currentUser']){
      const dialogRef = this.dialog.open(ConfirmVoteComponent,
        {
          width:'auto',
          height: 'auto'
        }
      );
      dialogRef.afterClosed().subscribe((result) =>{
        if(result === true){
          this.userSkullService.voteSkull(this.userData, skull).subscribe(res =>{
            if(res === 'Duplicate vote'){
              this.snackBarFailed('Ya has votado por esta calaverita')
            }
            else {
              this.snackBarSuccess('Se registro el voto')
            }
          })
        }        
      })
    }
    else {
      this.snackBarFailed('Debe inicar sesión para poder votar')
      return
    }
  }

  snackBarSuccess(message: any){
    this.snackBar.open(`${message}`, '', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['background-snack-info', 'center']
    });
  }

  snackBarFailed(message: any){
    this.snackBar.open(`${message}`, '', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['background-snack-warn']
    });
  }

  shareLink(idSkull: any){
    console.log('Aqui se va a armar el link a compartir', idSkull)

  }

}
