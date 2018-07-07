import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistraUtenteComponent } from './registra-utente.component';

describe('RegistraUtenteComponent', () => {
  let component: RegistraUtenteComponent;
  let fixture: ComponentFixture<RegistraUtenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistraUtenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistraUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
