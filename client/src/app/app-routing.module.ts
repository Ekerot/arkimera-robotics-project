import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'app/_guards/auth.guard';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PdfHandlingComponent } from 'app/components/pdf-handling/pdf-handling.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from 'app/components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ExpensesComponent } from 'app/components/pdf-handling/expenses/expenses.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'expenses',
        component: ExpensesComponent
      }

    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
