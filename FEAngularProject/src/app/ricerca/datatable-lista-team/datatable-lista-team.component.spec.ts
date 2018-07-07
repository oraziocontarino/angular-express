import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableListaTeamComponent } from './datatable-lista-team.component';

describe('DatatableListaTeamComponent', () => {
  let component: DatatableListaTeamComponent;
  let fixture: ComponentFixture<DatatableListaTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableListaTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableListaTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
