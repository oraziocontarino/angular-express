import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillDipendenteManagerComponent } from './skill-dipendente-manager.component';

describe('SkillDipendenteManagerComponent', () => {
  let component: SkillDipendenteManagerComponent;
  let fixture: ComponentFixture<SkillDipendenteManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillDipendenteManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillDipendenteManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
