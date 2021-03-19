import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IUser} from '@shared/interfaces/user.interface';
import {UserService} from '@app/services/user.service';
import {take} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public user: IUser,
              private dialogRef: MatDialogRef<DeleteUserComponent>,
              private userService: UserService) {
  }

  ngOnInit(): void {
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public handleDeleteUser(user: IUser): void {
    this.userService.removeUser(user._id)
      .pipe(
        take(1),
        untilDestroyed(this)
      ).subscribe(() => this.cancel());
  }
}
