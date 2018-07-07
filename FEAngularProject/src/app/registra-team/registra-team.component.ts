//Giovanni Emanuele Longo
import { Component, OnInit } from '@angular/core';
import { EmployerLogService } from '../../service/employer-log.service';
import { Router } from "@angular/router";
import { RestRequestService } from '../../service/rest-request.service';

@Component({
  selector: 'app-registra-team',
  templateUrl: './registra-team.component.html',
  styleUrls: ['./registra-team.component.css']
})
export class RegistraTeamComponent implements OnInit {
  public isLoading : boolean = false;
  public nomeTeam : String;
  public error : string;
  constructor(private employerLogService : EmployerLogService, private router: Router, private restRequestService:RestRequestService) { }
  
  ngOnInit() {
    //Controllo se l'utente è loggato
    if(!this.employerLogService.isLogged()){
      //Se non lo è lo riporto alla pagina di Login
      if(!sessionStorage.getItem("token")){
        this.router.navigate(['/login']);
      }else{
        //Ricarico il service con i dati dell'utente loggato
        this.employerLogService.refreshSessionByTokenRequest().subscribe(function(response){
          if(!this.employerLogService.caricaUtenteLoggato(response)){
            this.router.navigate(['/login']);
          }
        }.bind(this));
      }
    }
  }
  //Registrazione di un nuovo team
  public registraTeam(){
    this.isLoading = true;
    //Request al Rest Service
    this.restRequestService.addTeam(this.nomeTeam).subscribe(function(response){
      //Se vi è stato un errore (Nome team già presente nel sistema), mostro l'errore a video
      if(!response['success']){
        this.error = response['error'];
      }else{
        //Se è andata a buon fine la registrazione, riporto l'utente sulla pagina del team appena creata
        this.router.navigate(['team/'+response['data'].id_team]);
      }
      this.isLoading = false;
    }.bind(this))
  }

}
