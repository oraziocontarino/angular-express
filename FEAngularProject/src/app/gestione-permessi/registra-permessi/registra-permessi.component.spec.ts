//Orazio Contarino
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistraPermessiComponent } from './registra-permessi.component';

describe('RegistraPermessiComponent', () => {
  let component: RegistraPermessiComponent;
  let fixture: ComponentFixture<RegistraPermessiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistraPermessiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistraPermessiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
