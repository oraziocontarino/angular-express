//Longo Giovanni Emanuele
import { Component, OnInit } from '@angular/core';
import { EmployerLogService } from '../../service/employer-log.service';
import { RestRequestService } from '../../service/rest-request.service';
import { SkillsService } from '../../service/skills.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-profilo-utente',
  templateUrl: './profilo-utente.component.html',
  styleUrls: ['./profilo-utente.component.css']
})
export class ProfiloUtenteComponent implements OnInit {
  public skills : any;
  constructor(private employerLogService : EmployerLogService, private router: Router, 
    private restRequestService:RestRequestService, private skillsService:SkillsService) { 
  }

  ngOnInit() {
    if(!this.employerLogService.isLogged()){
      //Controlo se l'utente si è già loggato in precedenza (durante la login viene salvato il token nella sessionstorage)
      if(!sessionStorage.getItem("token")){
        //Se non lo è, ritorno alla login
        this.router.navigate(['/login']);
      }else{
        //Ricarico i dati dell'utente loggato tramite l'apposito token
        this.employerLogService.refreshSessionByTokenRequest().subscribe(function(response){
          if(!this.employerLogService.caricaUtenteLoggato(response)){
            //Se la request mi da error, torno alla login
            this.router.navigate(['/login']);
          }
        }.bind(this));
      }
    }
  }

}
