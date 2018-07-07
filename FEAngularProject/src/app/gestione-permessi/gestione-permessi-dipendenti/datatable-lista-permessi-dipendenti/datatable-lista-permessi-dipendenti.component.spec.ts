//Orazio Contarino
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableListaPermessiDipendentiComponent } from './datatable-lista-permessi-dipendenti.component';

describe('DatatableListaPermessiDipendentiComponent', () => {
  let component: DatatableListaPermessiDipendentiComponent;
  let fixture: ComponentFixture<DatatableListaPermessiDipendentiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableListaPermessiDipendentiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableListaPermessiDipendentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
