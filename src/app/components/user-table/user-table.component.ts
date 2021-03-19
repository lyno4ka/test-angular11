import {Component, OnInit} from '@angular/core';
import {UserService} from '@app/services/user.service';
import {IUser} from '@shared/interfaces/user.interface';
import {MatDialog} from '@angular/material/dialog';
import {CreateUserComponent} from '@app/parts/create-user/create-user.component';
import {DeleteUserComponent} from '@app/parts/delete-user/delete-user.component';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  public users$: Observable<IUser[]>;
  public displayedColumns: string[] = ['name', 'gender', 'age', 'company', 'phone', 'delete'];

  constructor(public userService: UserService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.users$ = this.userService.users$;
  }

  public addNewUser(): void {
    this.dialog.open(CreateUserComponent, {
      panelClass: 'modal-panel',
      width: '600px'
    });
  }

  public deleteUser(user: IUser): void {
    this.dialog.open(DeleteUserComponent, {
      panelClass: 'modal-panel',
      width: '500px',
      data: user
    });
  }
}
