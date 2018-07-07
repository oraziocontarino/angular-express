import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillDipendenteComponent } from './skill-dipendente.component';

describe('SkillDipendenteComponent', () => {
  let component: SkillDipendenteComponent;
  let fixture: ComponentFixture<SkillDipendenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillDipendenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillDipendenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
