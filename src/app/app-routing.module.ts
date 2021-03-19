import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersPageComponent} from '@app/components/users-page/users-page.component';


const routes: Routes = [
  {path: '', component: UsersPageComponent,
    children: [
      {path: '', loadChildren: () => import('@app/components/user-table/user-table.module').then(m => m.UserTableModule)},
      {path: 'users', loadChildren: () => import('@app/components/user/user.module').then(m => m.UserModule)},
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
