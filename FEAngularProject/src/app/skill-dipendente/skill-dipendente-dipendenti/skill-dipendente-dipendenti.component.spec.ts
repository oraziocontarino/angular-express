import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillDipendenteDipendentiComponent } from './skill-dipendente-dipendenti.component';

describe('SkillDipendenteDipendentiComponent', () => {
  let component: SkillDipendenteDipendentiComponent;
  let fixture: ComponentFixture<SkillDipendenteDipendentiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillDipendenteDipendentiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillDipendenteDipendentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
