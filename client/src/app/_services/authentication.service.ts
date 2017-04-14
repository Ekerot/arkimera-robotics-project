import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MdDialog } from '@angular/material';

import { User } from 'app/_models/user';

import { LoginComponent } from 'app/components/login/login.component';

@Injectable()
export class AuthenticationService {

  constructor(public dialog: MdDialog) { }

  login(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.debug('RESULT:', result);
    });
  }

}
