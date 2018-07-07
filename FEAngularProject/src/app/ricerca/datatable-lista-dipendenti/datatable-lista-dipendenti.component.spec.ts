import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableListaDipendentiComponent } from './datatable-lista-dipendenti.component';

describe('DatatableListaDipendentiComponent', () => {
  let component: DatatableListaDipendentiComponent;
  let fixture: ComponentFixture<DatatableListaDipendentiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableListaDipendentiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableListaDipendentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
