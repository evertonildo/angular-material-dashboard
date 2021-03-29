import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExternalService } from '../../services/external.service';
import { AccessComponent } from '../dialog/access.component';

@Component({
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private services: ExternalService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<LogoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  onClick() {
    this.services.clearUserData();

    const _dialogRef = this.dialog.open(AccessComponent, {
      data: {},
      width: '40%',
      disableClose: true,
    });
    _dialogRef.afterClosed().subscribe(r => {
      this.dialogRef.close();
      console.log('r', r);
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
