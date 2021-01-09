import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ChatComponent } from './chat/chat.component';
import { UserslistComponent } from './userslist/userslist.component';
import { UserschatComponent } from './userschat/userschat.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterUserPipe } from './pipes/filter-user.pipe';
import { FilterMessagePipe } from './pipes/filter-message.pipe';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AccountCreatedComponent } from './account-created/account-created.component';
import { DelBottomsheetComponent } from './del-bottomsheet/del-bottomsheet.component';





 

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    ChatComponent,
    UserslistComponent,
    UserschatComponent,
    FilterUserPipe,
    FilterMessagePipe,
    LandingPageComponent,
    AccountCreatedComponent,
    DelBottomsheetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
