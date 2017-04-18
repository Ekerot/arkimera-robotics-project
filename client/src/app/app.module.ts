import 'hammerjs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppRoutingModule } from 'app/app-routing.module';

import { AuthenticationService } from 'app/_services/authentication.service';
import { HttpService } from 'app/_services/http.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { PdfComponent } from './components/pdf/pdf.component';

import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { AccountComponent } from './components/account/account.component';
import { ProfitAndLossComponent } from './components/dashboard/profit-and-loss/profit-and-loss.component';
import { StatisticsComponent } from './components/dashboard/statistics/statistics.component';
import { ExpensesDashboardComponent } from './components/dashboard/expenses-dashboard/expenses-dashboard.component';
import { IncomeDashboardComponent } from './components/dashboard/income-dashboard/income-dashboard.component';
import { CreateGraph } from './components/dashboard/create-graph';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    HomeComponent,
    PageNotFoundComponent,
    SidenavComponent,
    ExpensesComponent,
    PdfComponent,
    PdfViewerComponent,
    AccountComponent,
    ProfitAndLossComponent,
    StatisticsComponent,
    ExpensesDashboardComponent,
    IncomeDashboardComponent,
    LoginComponent
  ],
  entryComponents: [
    LoginComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule.forRoot()
  ],
  providers: [
    AuthenticationService,
    CreateGraph,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
