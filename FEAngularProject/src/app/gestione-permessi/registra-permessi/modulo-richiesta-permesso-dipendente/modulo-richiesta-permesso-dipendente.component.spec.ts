//Orazio Contarino
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloRichiestaPermessoDipendenteComponent } from './modulo-richiesta-permesso-dipendente.component';

describe('ModuloRichiestaPermessoDipendenteComponent', () => {
  let component: ModuloRichiestaPermessoDipendenteComponent;
  let fixture: ComponentFixture<ModuloRichiestaPermessoDipendenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuloRichiestaPermessoDipendenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloRichiestaPermessoDipendenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
