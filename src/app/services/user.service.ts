import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {IUser} from '@shared/interfaces/user.interface';

const defaultUsers = require('../../data/users.json');

export const userStorageKey = 'userList';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userList$ = new BehaviorSubject<IUser[]>([]);
  public users$ = this.userList$.asObservable();

  get userList(): IUser[] {
    return JSON.parse(localStorage.getItem(userStorageKey));
  }

  set userList(value: IUser[]) {
    localStorage.setItem(userStorageKey, JSON.stringify(value));
  }

  constructor() {
    this.syncUserList();
  }

  public syncUserList(): void {
    const hasSavedUsers = !!this.userList;
    if (!hasSavedUsers) { this.userList = defaultUsers; }
    this.userList$.next(this.userList);
  }

  public getUserById(id: string): Observable<IUser> {
    const user = this.userList$.getValue().find(u => u._id === id);

    return of(user);
  }

  public removeUser(id: string): Observable<IUser[]> {
    const newList = this.userList$.getValue().filter(user => user._id !== id);
    this.userList = newList;
    this.userList$.next(newList);

    return of(newList);
  }

  public addUser(user: IUser): Observable<IUser[]> {
    const currentUsers = this.userList$.getValue();
    currentUsers.push(user);

    this.userList = currentUsers;
    this.userList$.next(currentUsers);

    return of(currentUsers);
  }
}
