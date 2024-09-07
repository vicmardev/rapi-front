import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-confirm-vote',
  templateUrl: './confirm-vote.component.html',
  styleUrls: ['./confirm-vote.component.scss']
})
export class ConfirmVoteComponent implements OnInit{
  decisionVote!: boolean;
  
  constructor(private dialogRef: MatDialogRef<any>){

  }
  ngOnInit(): void {
    
  }

  confirmVote(){
    this.decisionVote = true;
    console.log('La desicion que tomo es: ', this.decisionVote);
    this.dialogRef.close(this.decisionVote)
  }

  closeDialog(){
    this.decisionVote = false;
    console.log('this.decisionVote = false', this.decisionVote = false)
    this.dialogRef.close(this.decisionVote)
  }

}
