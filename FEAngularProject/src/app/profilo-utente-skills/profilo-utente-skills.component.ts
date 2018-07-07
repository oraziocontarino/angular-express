//Longo Giovanni Emanuele
import { Component, OnInit } from '@angular/core';
import { RestRequestService } from '../../service/rest-request.service';
import { SkillsService } from '../../service/skills.service';


@Component({
  selector: 'app-profilo-utente-skills',
  templateUrl: './profilo-utente-skills.component.html',
  styleUrls: ['./profilo-utente-skills.component.css']
})
export class ProfiloUtenteSkillsComponent implements OnInit {
  //Tutte le skill presenti a sistema
  public allSkill : any;
  //Skill dell'utente loggato
  public skills : any;
  //Nuova skill da mettere a sistema
  private newSkill = {};
  isReady : boolean;
  isAction : boolean = false;
  isLoading: boolean = false;
  constructor(private restRequestService:RestRequestService, private skillsService:SkillsService) {
    this.isReady = false;
    //Prendo da db la lista delle skill dell'utente loggato
    this.restRequestService.getSkills().subscribe(function(response){
      this.skills = response['data'];
      //this.allSkill = this.skillsService.getSkills();
      this.restRequestService.caricaSkills().subscribe(function(response){
        //Prendo la lista delle skill presenti a db
        this.skillsService.caricaSkills(response);
        this.allSkill = this.skillsService.getSkills();
        //Eseguo una differenza tra tutte le skill e le skill che già possiede l'utente loggato, ciò mi serve per permettere all'utente di aggiungere solo skill che non possiede
        this.rimuoviSkillPresenti();
        this.isReady = true;
      }.bind(this));
    }.bind(this));
  }


  ngOnInit() {}
  //Aggiunta nuova skill
  aggiungi(){
    this.isLoading=true;
    this.restRequestService.aggiungiSkill(this.newSkill, null).subscribe(function(response){
      //Una volta aggiunta la skill a sistema ricarico le skill dell'utente
      this.restRequestService.getSkills().subscribe(function(response){
        this.skills = response['data'];
        //Eseguo nuovamente la differenza
        this.rimuoviSkillPresenti();
        this.newSkill = {};
        this.isLoading=false;
        }.bind(this));
    }.bind(this));
  }
  //La modifica permette di cambiare la seniority di una skill
  modifica(skill:any){
    this.isAction = true;
    this.isReady = false;
    this.restRequestService.modificaSkill(skill, null).subscribe(function(response){
      //Una volta modificata la skill a sistema ricarico le skill dell'utente
      this.restRequestService.getSkills().subscribe(function(response){
        this.skills = response['data'];
        this.isAction = false;
        this.isReady = true;
        }.bind(this));
    }.bind(this));
  }
  //Rimozione di una skill
  rimuovi(skill:any){
    this.isAction = true;
    this.isReady = false;
    //Chiamo il service per la rimozione della skill
    this.restRequestService.rimuoviSkill(skill.id_skill, null).subscribe(function(response){
      //Ricevuta la risposta ricarico le skill dell'utente
        this.restRequestService.getSkills().subscribe(function(response){
          this.skills = response['data'];
          //Ricarico tutte le skill, perchè il service potrebbe aver subito variazioni
          this.restRequestService.caricaSkills().subscribe(function(response){
            this.skillsService.caricaSkills(response);
            this.allSkill = this.skillsService.getSkills();
            //Eseguo la differenza
            this.rimuoviSkillPresenti();
            this.isAction = false;
            this.isReady = true;
          }.bind(this));
        }.bind(this));
    }.bind(this));
    //Eseguita questa funzione potrò ritrovarmi la skill appena rimossa fra quelle che l'utente può aggiungere alle proprie conoscenze
  }

  rimuoviSkillPresenti(){
    //Confronto ogni skill presente a sistema con ogni skill dell'utente, per fare ciò il ciclo for più esterno mi controllo la totalità delle skill a sistema
    for (var i = 0;this.allSkill[i] && i< this.allSkill.length ; i++){
      //il ciclo for interno mi controlla che vi siano ancora delle skill per l'utente loggato
      for(var j = 0;this.allSkill[i] && j< this.skills.length ; j++){
        //controllo che siano uguali
        if(this.allSkill[i].id_skill == this.skills[j].skill[0].id_skill){
          //In caso affermativo rimuovo un elemento da tutte le skill a partire dalla posizione i dell'array
          this.allSkill.splice(i,1);
          //rimuovendo l'elemento di posizione i, tutto l'array scala, di conseguenza dovrò ricontrollare l'elemento iesimo
          i=i-1;
        }
      }
    }
  }

}
