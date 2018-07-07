//Giovanni Emanuele Longo
import { Component, OnInit } from '@angular/core';
import { EmployerLogService } from '../../service/employer-log.service';
import { Router } from "@angular/router";
import { RestRequestService } from '../../service/rest-request.service';

@Component({
  selector: 'app-registra-utente',
  templateUrl: './registra-utente.component.html',
  styleUrls: ['./registra-utente.component.css']
})
export class RegistraUtenteComponent implements OnInit {
  public nome : String;
  public cognome: String;
  public codiceFiscale: String;
  public dataDiNascita: String;
  public email: String;
  public password: String;
  public ruolo: String;
  public error: String;
  public isLoading : boolean = false;
  constructor(private employerLogService : EmployerLogService, private router: Router, private restRequestService:RestRequestService) { }

  ngOnInit() {
    //Controllo se l'utente è loggato
    if(!this.employerLogService.isLogged()){
      //Se non lo è lo riporto alla pagina di Login
      if(!sessionStorage.getItem("token")){
        this.router.navigate(['/login']);
      }else{
        //Ricarico il service contenente i dati dell'utente loggato (ciò viene fatto per evitare errori nel caso in cui l'utente aggiorni la paggina)
        this.employerLogService.refreshSessionByTokenRequest().subscribe(function(response){
          //Se riscontro errori durante il reload viene reindirizzato alla logina
          if(!this.employerLogService.caricaUtenteLoggato(response)){
            this.router.navigate(['/login']);
          }
        }.bind(this));
      }
    }
  }

  private checkRequired(newDipendente){
    if(!this.nome){
      this.error = "Inserisci il nome";
    }else if(!this.cognome){
      this.error = "Inserisci il cognome";
    }if(!this.codiceFiscale){
      this.error = "Inserisci il codice_fiscale";
    }else if(!this.email){
      this.error = "Inserisci il email";
    }if(!this.password){
      this.error = "Inserisci il password";
    }else if(!this.ruolo){
      this.error = "Inserisci il ruolo";
    }else if(!this.dataDiNascita){
      this.error = "Inserisci data di nascita";
    }else{
      this.error = undefined;
    }
  }

  public registraDipendente(){
    this.isLoading=true;
    //Dati nuovo dipendente
    var newDipendente ={
      'nome' : this.nome,
      'cognome' : this.cognome,
      'codice_fiscale' : this.codiceFiscale,
      'email' : this.email,
      'password' : this.password,
      'ruolo' : this.ruolo,
      'data_nascita' : this.dataDiNascita
    }

    if(this.error){
      return;
    }
    this.restRequestService.addDipendente(newDipendente).subscribe(function(response){
      this.isLoading = false;
      //Errore durante l'inserimento dell'utente a DB (codice fiscale o email già presenti generalmente)
      if(!response['success']){
        this.error = response['error'];
      }else{
        //Se l'inserimento è andato a buon fine, si viene reindirizzati alla pagina dei dettagli dell'utente appena creato
        this.router.navigate(['skillDipendente/'+response['data'].id_dipendente]);
      }
    }.bind(this))
  }

  isDisabled(){
    //Disabilito il button di registrazione se manca almeno uno di questi dati
    if(!this.nome || !this.cognome || !this.codiceFiscale || !this.email || !this.password  || !this.dataDiNascita){
      return true;
    }else{
      return false;
    }
  }

}
