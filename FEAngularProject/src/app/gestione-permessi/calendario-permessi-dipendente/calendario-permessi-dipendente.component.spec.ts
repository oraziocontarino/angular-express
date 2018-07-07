//Orazio Contarino
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioPermessiDipendenteComponent } from './calendario-permessi-dipendente.component';

describe('CalendarioPermessiDipendenteComponent', () => {
  let component: CalendarioPermessiDipendenteComponent;
  let fixture: ComponentFixture<CalendarioPermessiDipendenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarioPermessiDipendenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioPermessiDipendenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
