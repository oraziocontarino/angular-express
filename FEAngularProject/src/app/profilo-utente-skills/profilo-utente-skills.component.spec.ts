import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiloUtenteSkillsComponent } from './profilo-utente-skills.component';

describe('ProfiloUtenteSillsComponent', () => {
  let component: ProfiloUtenteSkillsComponent;
  let fixture: ComponentFixture<ProfiloUtenteSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfiloUtenteSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfiloUtenteSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
