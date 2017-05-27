import 'hammerjs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';

import { AppMaterialModule } from 'app/app-material.module';
import { AppRoutingModule } from 'app/app-routing.module';
import { AuthGuard } from 'app/_guards/auth.guard';
import { SidenavModule } from './components/sidenav/sidenav.module';

import { StatisticsService } from 'app/_services/statistics.service';
import { AuthService, HttpService, WebSocketService } from 'app/_services';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ExpensesComponent } from './components/pdf-handling/expenses/expenses.component';
import { PdfComponent } from './components/pdf-handling/pdf/pdf.component';

import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { AccountComponent } from './components/pdf-handling/account/account.component';
import { ProfitAndLossComponent } from './components/dashboard/profit-and-loss/profit-and-loss.component';
import { StatisticsComponent } from './components/dashboard/statistics/statistics.component';
import { ExpensesDashboardComponent } from './components/dashboard/expenses-dashboard/expenses-dashboard.component';
import { IncomeDashboardComponent } from './components/dashboard/income-dashboard/income-dashboard.component';
import { CreateGraph } from './components/dashboard/create-graph';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/login/register/register.component';
import { Md2Module } from 'md2';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
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
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    SidenavModule,
    Md2Module.forRoot(),
    AppMaterialModule,
    FlexLayoutModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    CreateGraph,
    HttpService,
    StatisticsService,
    WebSocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
