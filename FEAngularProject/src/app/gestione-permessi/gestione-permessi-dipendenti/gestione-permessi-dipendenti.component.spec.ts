//Orazio Contarino
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionePermessiDipendentiComponent } from './gestione-permessi-dipendenti.component';

describe('GestionePermessiDipendentiComponent', () => {
  let component: GestionePermessiDipendentiComponent;
  let fixture: ComponentFixture<GestionePermessiDipendentiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionePermessiDipendentiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionePermessiDipendentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
