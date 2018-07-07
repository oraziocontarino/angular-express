import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiloUtenteDatiPersonaliComponent } from './profilo-utente-dati-personali.component';

describe('ProfiloUtenteDatiPersonaliComponent', () => {
  let component: ProfiloUtenteDatiPersonaliComponent;
  let fixture: ComponentFixture<ProfiloUtenteDatiPersonaliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfiloUtenteDatiPersonaliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfiloUtenteDatiPersonaliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
