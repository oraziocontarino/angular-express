//Skill dipendente - L'utente loggato è manager
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EmployerLogService } from '../../../service/employer-log.service';
import { RestRequestService } from '../../../service/rest-request.service';
import { SkillsService } from '../../../service/skills.service';

@Component({
  selector: 'app-skill-dipendente-manager',
  templateUrl: './skill-dipendente-manager.component.html',
  styleUrls: ['./skill-dipendente-manager.component.css']
})
export class SkillDipendenteManagerComponent implements OnInit {

  private idDipendente : String;
  datiDipendente : any;
  allSkill : any;
  private newSkill = {};
  isLoading: boolean = false;
  isReady : boolean;
  constructor(private activatedRoute: ActivatedRoute,  private router: Router, 
    private restRequestService:RestRequestService, private employerLogService : EmployerLogService, private skillsService:SkillsService) { 
      this.isReady = false;
    }

  ngOnInit() {
    //Prendo il parametro passato tramite URL [id_dipendente]
    this.activatedRoute.params.subscribe(params => {
      if(params.hasOwnProperty('id_dipendente'))
      {
        this.idDipendente = params.id_dipendente;
        //Se il parametro è undefined reindirizzo al form di ricerca
        if(this.idDipendente == "undefined"){
          this.router.navigate(['/ricercaRisultati']);
          return;
        }
        //Se l'id passato è quello dell'utente loggato reindirizzo al profilo utente
        else if(this.employerLogService.getId() == this.idDipendente){
          this.router.navigate(['/visualizzaProfilo']);
        }
        //In caso contrario carico i dati dell'utente richiesto
        this.restRequestService.getDipendeteInfoAndSkill(this.idDipendente).subscribe(function(response){
          this.datiDipendente = response['data'];
          //Carico tutte le skill presenti a sistema
          this.restRequestService.caricaSkills().subscribe(function(response){
            this.skillsService.caricaSkills(response);
            this.allSkill = this.skillsService.getSkills();
            //Se l'utente presenta qualche skill eseguo la differenza, ciò permetterà al manager di poter aggiungere skill all'utente visualizzato
            if(this.datiDipendente.length > 0){
              this.rimuoviSkillPresenti();
            }
            this.isReady = true;
          }.bind(this));
        }.bind(this));
      }
    });
  }
  //Modifica seniority di una skill
  modifica(skill:any){
    this.isReady = false;
    //Request di modifica
    this.restRequestService.modificaSkill(skill, this.idDipendente).subscribe(function(response){
      //Ricarico i dati dell'utente visuallizzato per evitare incongruenze
      this.restRequestService.getDipendeteInfoAndSkill(this.idDipendente).subscribe(function(response){
        this.datiDipendente = response['data'];
        this.isReady = true;
        }.bind(this));
    }.bind(this));
  }
  //Aggiungo nuove skill all'utente visualizzato
  aggiungi(){
    this.isLoading=true;
    //Request di inserimento nuova skill
    this.restRequestService.aggiungiSkill(this.newSkill, this.idDipendente).subscribe(function(response){
      //Ricarico i dati dell'utente visuallizzato per evitare incongruenze
      this.restRequestService.getDipendeteInfoAndSkill(this.idDipendente).subscribe(function(response){
        this.datiDipendente = response['data'];
        //Eseguo la differenza fra tutte le skill (quelle rimaste) e le skill dell'utente
        this.rimuoviSkillPresenti();
        this.isLoading=false;
        //Inizializzo la varibile così viene disabilitato il button
        this.newSkill = {};
        }.bind(this));
    }.bind(this));
  }
  //Rimuovo skill all'utente visualizzato
  rimuovi(skill:any){
    this.isReady = false;
    //Request di rimozione skill
    this.restRequestService.rimuoviSkill(skill.id_skill, this.idDipendente).subscribe(function(response){
      //Ricarico i dati dell'utente visuallizzato per evitare incongruenze
      this.restRequestService.getDipendeteInfoAndSkill(this.idDipendente).subscribe(function(response){
        this.datiDipendente = response['data'];
        //Poichè rimuovendo una skill essa potrà nuovamente essere aggiunta ricarico le skill presenti a sistema nel service
          this.restRequestService.caricaSkills().subscribe(function(response){
            this.skillsService.caricaSkills(response);
            this.allSkill = this.skillsService.getSkills();
            //Se l'utente ha skill, eseguo la differenza tra le skill del sistema e le skill dell'utente
            if(this.datiDipendente.length>0){
              this.rimuoviSkillPresenti();
            }
          }.bind(this));
        }.bind(this));
        this.isReady = true;
    }.bind(this));
  }

  rimuoviSkillPresenti(){
     //Confronto ogni skill presente a sistema con ogni skill dell'utente, per fare ciò il ciclo for più esterno mi controllo la totalità delle skill a sistema
    for (var i = 0;this.allSkill[i] && i< this.allSkill.length ; i++){
       //il ciclo for interno mi controlla che vi siano ancora delle skill per l'utente visualizato
      for(var j = 0;this.allSkill[i] && j < this.datiDipendente.length ; j++){
        //Conrollo che siano uguali
        if(this.allSkill[i].id_skill == this.datiDipendente[j].skill[0].id_skill){
          //In caso affermativo rimuovo un elemento da tutte le skill a partire dalla posizione i dell'array
          this.allSkill.splice(i,1);
          //rimuovendo l'elemento di posizione i, tutto l'array scala, di conseguenza dovrò ricontrollare l'elemento iesimo
          i=i-1;
        }
      }
    }
  }
}
