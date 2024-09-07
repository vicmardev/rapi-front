import { NgModule, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import {  GoogleSigninButtonModule, GoogleSigninButtonDirective } from '@abacritt/angularx-social-login';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import { MaterialModule } from './material/material/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/home/dialogs/login/login.component';
import { TestComponent } from './components/test/test.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SkullDetailComponent } from './components/dashboard/dialogs/skull-detail/skull-detail.component';
import { SharedSkullComponent } from './components/dashboard/shared-skull/shared-skull.component';
import { ConfirmVoteComponent } from './components/dashboard/dialogs/confirm-vote/confirm-vote.component';
import { CreateSkullComponent } from './components/dashboard/dialogs/create-skull/create-skull.component';
import { ShareSkullComponent } from './components/dashboard/dialogs/share-skull/share-skull.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    TestComponent,
    SkullDetailComponent,
    SharedSkullComponent,
    ConfirmVoteComponent,
    CreateSkullComponent,
    ShareSkullComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MaterialModule,
    HttpClientModule,
    GoogleSigninButtonModule,
    MatIconModule
  ],
  schemas:[
		CUSTOM_ELEMENTS_SCHEMA,
		NO_ERRORS_SCHEMA
	],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '430162545403-delr0sfitq6ouv3m0ifjhpnvvtm2auu0.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('3146660332309085')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
