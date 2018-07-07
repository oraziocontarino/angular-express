//Orazio Contarino
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionePermessiManagerComponent } from './gestione-permessi-manager.component';

describe('GestionePermessiManagerComponent', () => {
  let component: GestionePermessiManagerComponent;
  let fixture: ComponentFixture<GestionePermessiManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionePermessiManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionePermessiManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
