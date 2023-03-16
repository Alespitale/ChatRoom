import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { ChatComponent } from './components/chat/chat.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { SmsValidationComponent } from './components/sms-validation/sms-validation.component';
import { ForgotPwdComponent } from './components/forgot-pwd/forgot-pwd.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',
    component: LogInComponent,
    ...canActivate(() => redirectLoggedInTo(['/sms-validation'])),
    
  },
  { path: 'register',
    component: RegisterComponent,
    ...canActivate(() => redirectLoggedInTo(['/sms-validation']))
  },
  { path: 'chat', 
    component: ChatComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/sms-validation'])),
    loadChildren: () => import('./components/chat/chat.module').then(m => m.ChatModule),
  },
  {
    path: 'sms-validation',
    component: SmsValidationComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'forgot-pwd', component: ForgotPwdComponent
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
