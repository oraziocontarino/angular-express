import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistraUtenteComponent } from './registra-utente/registra-utente.component';
import { RegistraTeamComponent } from './registra-team/registra-team.component';
import { RegistraPermessiComponent } from './gestione-permessi/registra-permessi/registra-permessi.component';
import { ProfiloUtenteComponent } from './profilo-utente/profilo-utente.component';
import { GestionePermessiComponent } from './gestione-permessi/gestione-permessi.component';
import { RicercaComponent } from './ricerca/ricerca.component';
import { SkillDipendenteComponent } from './skill-dipendente/skill-dipendente.component';
import { TeamComponent } from './team/team.component';


const appRoutes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: 'login', component: LoginComponent, pathMatch: 'full'},//Longo Giovanni & Orazio Contarino
    { path: 'dashboard', component: DashboardComponent, pathMatch: 'full'},//Longo Giovanni & Orazio Contarino
    { path: 'registraUtente', component: RegistraUtenteComponent, pathMatch: 'full'},//Longo Giovanni && Orazio COntarino
    { path: 'registraTeam', component: RegistraTeamComponent, pathMatch: 'full'},//Longo Giovanni
    { path: 'registraPermessi', component: RegistraPermessiComponent, pathMatch: 'full'},//Orazio Contarino
    { path: 'visualizzaProfilo', component: ProfiloUtenteComponent, pathMatch: 'full'},//Longo Giovanni
    { path: 'gestionePermessiDipendente', component: GestionePermessiComponent, pathMatch: 'full'},//Orazio Contarino
    { path: 'ricercaRisultati', component: RicercaComponent, pathMatch:'full'},//Longo Giovanni
    { path: 'skillDipendente/:id_dipendente', component: SkillDipendenteComponent},//Longo Giovanni
    { path: 'team/:id_team', component: TeamComponent},//Longo Giovanni
    
    //{ path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
