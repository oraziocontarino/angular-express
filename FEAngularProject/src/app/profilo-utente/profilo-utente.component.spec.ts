import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiloUtenteComponent } from './profilo-utente.component';

describe('ProfiloUtenteComponent', () => {
  let component: ProfiloUtenteComponent;
  let fixture: ComponentFixture<ProfiloUtenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfiloUtenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfiloUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
