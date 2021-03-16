import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ExternalService } from '../../services/external.service';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public services: ExternalService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  logout(){
    const dialogRef = this.dialog.open(LogoutComponent, {
      data: {},
      width: '40%',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(r=> {});
  }

}
