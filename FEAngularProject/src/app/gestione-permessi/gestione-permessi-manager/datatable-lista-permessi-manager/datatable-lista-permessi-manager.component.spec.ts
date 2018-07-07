//Orazio Contarino
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableListaPermessiManagerComponent } from './datatable-lista-permessi-manager.component';

describe('DatatableListaPermessiManagerComponent', () => {
  let component: DatatableListaPermessiManagerComponent;
  let fixture: ComponentFixture<DatatableListaPermessiManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableListaPermessiManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableListaPermessiManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
