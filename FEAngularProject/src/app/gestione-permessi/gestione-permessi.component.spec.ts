//Orazio Contarino
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionePermessiComponent } from './gestione-permessi.component';

describe('GestionePermessiComponent', () => {
  let component: GestionePermessiComponent;
  let fixture: ComponentFixture<GestionePermessiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionePermessiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionePermessiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
