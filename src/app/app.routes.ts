import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SessionsComponent } from "./pages/sessions/sessions.component";
import { SessionsFormComponent } from './pages/sessions-form/sessions-form.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'session/:uri', component: SessionsComponent },
  { path: 'session', component: SessionsFormComponent }
];
