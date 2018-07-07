//Skill dipendente - L'utente loggato non è manager
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EmployerLogService } from '../../../service/employer-log.service';
import { RestRequestService } from '../../../service/rest-request.service';

@Component({
  selector: 'app-skill-dipendente-dipendenti',
  templateUrl: './skill-dipendente-dipendenti.component.html',
  styleUrls: ['./skill-dipendente-dipendenti.component.css']
})
export class SkillDipendenteDipendentiComponent implements OnInit {

  private idDipendente : String;
  datiDipendente : any;
  isReady : boolean;
  constructor(private activatedRoute: ActivatedRoute,  private router: Router, private restRequestService:RestRequestService, private employerLogService : EmployerLogService) {
    this.isReady = false;
  }

  ngOnInit() {
    //Prendo il parametro passato tramite URL [id_dipendente]
    this.activatedRoute.params.subscribe(params => {
      if(params.hasOwnProperty('id_dipendente'))
      {
        //Se il parametro è undefined reindirizzo al form di ricerca
        this.idDipendente = params.id_dipendente;
        if(this.idDipendente == "undefined"){
          this.router.navigate(['/ricercaRisultati']);
          return;
        }
        //Se l'id passato è quello dell'utente loggato reindirizzo al profilo utente
        else if(this.employerLogService.getId() == this.idDipendente){
          this.router.navigate(['/visualizzaProfilo']);
        }
        //In caso contrario carico i dati dell'utente richiesto, questo form è solo di visualizzazione poichè l'utente loggato non è manager
        this.restRequestService.getDipendeteInfoAndSkill(this.idDipendente).subscribe(function(response){
          this.datiDipendente = response['data'];
          this.isReady=true;
        }.bind(this))
      }
    });
  }

}
