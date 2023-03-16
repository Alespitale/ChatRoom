import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

import { CommonModule } from '@angular/common';
import{
  AngularFireModule,
  FIREBASE_OPTIONS,
} from '@angular/fire/compat';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// Components
import { LogInComponent } from './components/log-in/log-in.component';
import { SmsValidationComponent } from './components/sms-validation/sms-validation.component';
import { ForgotPwdComponent } from './components/forgot-pwd/forgot-pwd.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    SmsValidationComponent,
    ForgotPwdComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    RouterModule,
    AngularFireModule,
    AngularFirestoreModule.enablePersistence(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [ { provide: FIREBASE_OPTIONS, useValue: environment.firebase}],
  bootstrap: [AppComponent],
})
export class AppModule {}

