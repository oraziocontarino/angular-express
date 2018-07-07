import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistraTeamComponent } from './registra-team.component';

describe('RegistraTeamComponent', () => {
  let component: RegistraTeamComponent;
  let fixture: ComponentFixture<RegistraTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistraTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistraTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
