import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { ChatComponent } from './components/chat/chat.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { SmsValidationComponent } from './components/sms-validation/sms-validation.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'chat',
    component: ChatComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'sms-validation',
    component: SmsValidationComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
