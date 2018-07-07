import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { CalendarModule } from 'angular-calendar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
//Common
import { EmployerLogService } from '../service/employer-log.service';
import { LoginComponent } from './login/login.component';
import { RegistraUtenteComponent } from './registra-utente/registra-utente.component';
import { DashboardComponent } from './dashboard/dashboard.component';
//Gestione dipendenti
import { RegistraTeamComponent } from './registra-team/registra-team.component';
import { ProfiloUtenteComponent } from './profilo-utente/profilo-utente.component';
import { ProfiloUtenteDatiPersonaliComponent } from './profilo-utente-dati-personali/profilo-utente-dati-personali.component';
import { ProfiloUtenteSkillsComponent } from './profilo-utente-skills/profilo-utente-skills.component';
//Gestione permessi
import { GestionePermessiComponent } from './gestione-permessi/gestione-permessi.component';
import { CalendarioPermessiDipendenteComponent } from './gestione-permessi/calendario-permessi-dipendente/calendario-permessi-dipendente.component';
import { GestionePermessiDipendentiComponent } from './gestione-permessi/gestione-permessi-dipendenti/gestione-permessi-dipendenti.component';
import { GestionePermessiManagerComponent } from './gestione-permessi/gestione-permessi-manager/gestione-permessi-manager.component';
import { DatatableListaPermessiManagerComponent } from './gestione-permessi/gestione-permessi-manager/datatable-lista-permessi-manager/datatable-lista-permessi-manager.component';
import { DatatableListaPermessiDipendentiComponent } from './gestione-permessi/gestione-permessi-dipendenti/datatable-lista-permessi-dipendenti/datatable-lista-permessi-dipendenti.component';
import { ModuloRichiestaPermessoDipendenteComponent } from './gestione-permessi/registra-permessi/modulo-richiesta-permesso-dipendente/modulo-richiesta-permesso-dipendente.component';
//Gestione permessi - deprecati
import { RegistraPermessiComponent } from './gestione-permessi/registra-permessi/registra-permessi.component';
import { RicercaComponent } from './ricerca/ricerca.component';
import { DatatableListaDipendentiComponent } from './ricerca/datatable-lista-dipendenti/datatable-lista-dipendenti.component';
import { DatatableListaTeamComponent } from './ricerca/datatable-lista-team/datatable-lista-team.component';
import { SkillDipendenteComponent } from './skill-dipendente/skill-dipendente.component';
import { SkillDipendenteDipendentiComponent } from './skill-dipendente/skill-dipendente-dipendenti/skill-dipendente-dipendenti.component';
import { SkillDipendenteManagerComponent } from './skill-dipendente/skill-dipendente-manager/skill-dipendente-manager.component';
import { TeamComponent } from './team/team.component';
import { TeamManagerComponent } from './team/team-manager/team-manager.component';
import { LaddaModule } from 'angular2-ladda';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegistraUtenteComponent,
    RegistraTeamComponent,
    RegistraPermessiComponent,
    GestionePermessiComponent,
    ProfiloUtenteComponent,
    GestionePermessiDipendentiComponent,
    GestionePermessiManagerComponent,
    DatatableListaPermessiManagerComponent,
    DatatableListaPermessiDipendentiComponent,
    CalendarioPermessiDipendenteComponent,
    ModuloRichiestaPermessoDipendenteComponent,
    ProfiloUtenteDatiPersonaliComponent,
    ProfiloUtenteSkillsComponent,
    RicercaComponent,
    DatatableListaDipendentiComponent,
    DatatableListaTeamComponent,
    SkillDipendenteComponent,
    SkillDipendenteDipendentiComponent,
    SkillDipendenteManagerComponent,
    TeamComponent,
    TeamManagerComponent,
  ],
  imports: [    
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    DataTablesModule,
    NgbModule.forRoot(),
    CalendarModule.forRoot(),
    LaddaModule,
  ],
  providers: [EmployerLogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
