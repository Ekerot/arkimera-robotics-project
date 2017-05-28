import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ExpensesComponent } from './expenses.component';
import { MockComponent } from 'app/_helpers/mock-component';
import { AuthService, HttpService, WebSocketService } from 'app/_services';
import { Observable } from 'rxjs/Rx';

describe('ExpensesComponent', () => {
  let component: ExpensesComponent;
  let fixture: ComponentFixture<ExpensesComponent>;
  let wsService: WebSocketService;
  let authService: AuthService;
  let httpService: HttpService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: { getLoggedInUsername: () => { Observable.of() } } },
        {
          provide: HttpService, useValue: {
            getExtractedData: () => { Observable.of() },
            getFilesReadyForExtraction: () => { Observable.of() }
          }
        },
        { provide: WebSocketService, useValue: { getMessages: () => { Observable.of() } } }
      ],
      declarations: [
        ExpensesComponent,
        MockComponent({ selector: 'app-pdf', inputs: ['pdfSrc'] }),
        MockComponent({ selector: 'app-account', inputs: ['selectedFile'] })
      ],
      imports: [
        BrowserModule,
        FormsModule,
        MaterialModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesComponent);
    component = fixture.componentInstance;

    authService = fixture.debugElement.injector.get(AuthService);
    spyOn(authService, 'getLoggedInUsername').and.returnValue({ subscribe: () => { } });

    httpService = fixture.debugElement.injector.get(HttpService);
    spyOn(httpService, 'getExtractedData').and.returnValue({ subscribe: () => { } });
    spyOn(httpService, 'getFilesReadyForExtraction').and.returnValue({ subscribe: () => { } });

    wsService = fixture.debugElement.injector.get(WebSocketService);
    spyOn(wsService, 'getMessages').and.returnValue({ subscribe: () => { } });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
