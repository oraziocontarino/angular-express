//Longo Giovanni Emanuele
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EmployerLogService } from '../../../service/employer-log.service';
import { RestRequestService } from '../../../service/rest-request.service';
import { SkillsService } from '../../../service/skills.service';

@Component({
  selector: 'app-team-manager',
  templateUrl: './team-manager.component.html',
  styleUrls: ['./team-manager.component.css']
})
export class TeamManagerComponent implements OnInit {
  private datiTeam : any;
  private idTeam : String;
  private allSkill : any;
  private allDipendenti : any;
  private newDipendente = {};
  isReady : boolean;
  private isLoading : boolean = false;
  constructor(private activatedRoute: ActivatedRoute,  private router: Router, 
    private restRequestService:RestRequestService, private employerLogService : EmployerLogService, 
    private skillsService:SkillsService) {
      this.isReady = false;
    }


  ngOnInit() {
    //Prendo il parametro [id del team]
    this.activatedRoute.params.subscribe(params => {
      if(params.hasOwnProperty('id_team')){
        this.idTeam = params.id_team;
        //Se è undefinde redirect al form di ricerca
        if(this.idTeam == "undefined"){
          this.router.navigate(['/ricercaRisultati']);
          return;
        }
        //Prelevo i dati del team che si vuole visualizzare
        this.restRequestService.getTeam(this.idTeam).subscribe(function(response){
          this.datiTeam = response['data'];
          //Prendo tutti i dipendenti a sistema
          this.restRequestService.ricerca('dipendenti').subscribe(function(response){
            this.allDipendenti = response["data"];
            //Eseguo la differenza tra i dipendenti appartenenti al team e quelli presenti a sistema, ciò permetterà al manager di aggiunger membri al suo team
            this.rimuoviDipendentiPresenti();
            this.isReady = true;
          }.bind(this))
        }.bind(this))
        //Prendo le skill a sistema per mostrare la skill table del team
        this.restRequestService.caricaSkills().subscribe(function(response){
          this.skillsService.caricaSkills(response);
          this.allSkill = this.skillsService.getSkills();
        }.bind(this));
      }
    });
  }

  compareSkill(skillUser : string, skill : string) :boolean {
    var isEqual = false;
    if(skillUser == skill){
      isEqual = true;
    }
    return isEqual;
  }
  //Rimozione dipendente dal team
  rimuovi(team : String, dipendente : String){
    this.isReady = false;
    //Request per rimozione dipendente
    this.restRequestService.deleteEmployerInTeam(team, dipendente).subscribe(function(response){
      //Ricarico i dati del team per evitare incongruenze
      this.restRequestService.getTeam(this.idTeam).subscribe(function(response){
        this.datiTeam = response['data'];
        //Ricarico i dipendenti, poichè quello appena rimosso può ora essere aggiunto
          this.restRequestService.ricerca('dipendenti').subscribe(function(response){
            this.allDipendenti = response["data"];
            //Eseguo la differenza
            this.rimuoviDipendentiPresenti();
            this.isReady = true;
          }.bind(this))
      }.bind(this))
    }.bind(this))
  }
  //Aggiungo dipendente al team
  aggiungi(){
    this.isLoading = true;
    //Request per l'aggiunta
    this.restRequestService.addEmployerInTeam(this.idTeam, this.newDipendente).subscribe(function(response){
      //Ricarico i dati del team per evitare incongruenze
      this.restRequestService.getTeam(this.idTeam).subscribe(function(response){
        this.datiTeam = response['data'];
        //Differenza, per rimuovere il dipendente appena aggiunto dalla lista dei dipendenti
        this.rimuoviDipendentiPresenti();
        this.isLoading = false;
        this.newDipendente = {};
      }.bind(this))
    }.bind(this))
  }

  rimuoviDipendentiPresenti(){
     //Confronto ogni utente a sistema con i dipendendenti del team, per fare ciò il ciclo for più esterno mi controllo la totalità dei dipendenti
    for (var i = 0;this.allDipendenti[i] && i< this.allDipendenti.length ; i++){
      //il ciclo for interno mi controlla che vi siano ancora dei dipendenti per il team visualizato
      for(var j = 0;this.allDipendenti[i] && j< this.datiTeam[0].team_dipendente.length ; j++){
        if(this.datiTeam[0].team_dipendente[j]){
          //Conrollo che siano uguali
          if(this.allDipendenti[i].id_dipendente == this.datiTeam[0].team_dipendente[j].id_dipendente){
             //In caso affermativo rimuovo un elemento da tutte i dipendenti a partire dalla posizione i dell'array
            this.allDipendenti.splice(i,1);
            //rimuovendo l'elemento di posizione i, tutto l'array scala, di conseguenza dovrò ricontrollare l'elemento iesimo
            i=i-1;
          }
        }
      }
    }
  }
}
