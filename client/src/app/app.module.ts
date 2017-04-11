import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppRoutingModule } from 'app/app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { PdfComponent } from './components/pdf/pdf.component';

import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { ProfitAndLossComponent } from './components/dashboard/profit-and-loss/profit-and-loss.component';
import { StatisticsComponent } from './components/dashboard/statistics/statistics.component';
import { ExpensesDashboardComponent } from './components/dashboard/expenses-dashboard/expenses-dashboard.component';
import { IncomeDashboardComponent } from './components/dashboard/income-dashboard/income-dashboard.component';
import {CreateGraph} from './components/dashboard/create-graph';

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
    ProfitAndLossComponent,
    StatisticsComponent,
    ExpensesDashboardComponent,
    IncomeDashboardComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [CreateGraph],
  bootstrap: [AppComponent]
})
export class AppModule { }
