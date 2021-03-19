import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '@app/services/user.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {IUser} from '@shared/interfaces/user.interface';
import {take} from 'rxjs/operators';
import {MatDialogRef} from '@angular/material/dialog';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  public userForm: FormGroup;
  public urlPhoto: string | File | ArrayBuffer;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public selectable = true;
  public removable = true;
  public addOnBlur = false;

  constructor(private fb: FormBuilder,
              public userService: UserService,
              private dialogRef: MatDialogRef<CreateUserComponent>) { }

  ngOnInit(): void {
    this.createUserForm();
  }

  public get tags(): FormArray {
    return this.userForm.get('tags') as FormArray;
  }

  private get userObj(): IUser {
    return  {
      age: this.userForm.value.age,
      email: this.userForm.value.email,
      name: this.userForm.value.name,
      picture: this.urlPhoto as string,
      tags: this.tags.value,
      _id: this.uuid(),
      registered: this.userForm.value.registered.toISOString(),
      address: this.userForm.value.address ?? null,
      about: this.userForm.value.about ?? null,
      phone: this.userForm.value.phone ?? null,
      balance: this.userForm.value.balance ? '$' + this.userForm.value.balance : null,
    };
  }

  private createUserForm(): void {
    this.userForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]],
      picture: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      age : ['', [Validators.required, Validators.min(10), Validators.max(100)]],
      balance : ['', []],
      address : ['', []],
      phone: ['', []],
      about: ['', []],
      registered: [new Date(), []],
      tags: this.fb.array([], Validators.required)
    });
  }

  public addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) { this.tags.push(this.fb.control(value.trim())); }
    if (input) { input.value = ''; }
  }

  public removeTag(index: number): void {
    this.tags.removeAt(index);
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  private uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
      .replace(/[xy]/g, (char) => {
      const random = Math.random() * 16 | 0;
      const value = char === 'x' ? random : (random % 4 + 8);
      return value.toString(16);
    });
  }

  public onSelectPhoto(event): void {
    console.warn('please upload small images');
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (value) =>
        this.urlPhoto = value.target.result;
    }
  }

  public addUser(): void {
    this.userService.addUser(this.userObj).pipe(
      take(1),
      untilDestroyed(this)
    ).subscribe(() => {
      this.userService.syncUserList();
      this.cancel();
    });
  }
}
