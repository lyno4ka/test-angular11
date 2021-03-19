import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {MaterialModule} from './modules/material.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CreateUserComponent} from './parts/create-user/create-user.component';
import {DeleteUserComponent} from './parts/delete-user/delete-user.component';
import {HeaderBlockComponent} from '@app/components/users-page/header-block/header-block.component';
import {UsersPageComponent} from '@app/components/users-page/users-page.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderBlockComponent,
    CreateUserComponent,
    DeleteUserComponent,
    UsersPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
