import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '@app/services/user.service';
import {Observable} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';
import {IUser} from '@shared/interfaces/user.interface';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public user$: Observable<IUser>;

  constructor(private activeRoute: ActivatedRoute,
              public userService: UserService) { }

  ngOnInit(): void {
    this.user$ = this.activeRoute.params.pipe(
      filter(isNotNullOrUndefined),
      switchMap(params => this.userService.getUserById(params.id)),
      map(user => {
        const updateDate = user.registered.split(' ').join('');
        const registered = new Date(updateDate).toString();
        return {...user, registered};
      })
    );
  }
}

