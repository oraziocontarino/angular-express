//Longo Giovanni Emanuele
import { Component, OnInit } from '@angular/core';
import { User } from '../common/class/user';
import { EmployerLogService } from '../../service/employer-log.service';
import { RestRequestService } from '../../service/rest-request.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-profilo-utente-dati-personali',
  templateUrl: './profilo-utente-dati-personali.component.html',
  styleUrls: ['./profilo-utente-dati-personali.component.css']
})
export class ProfiloUtenteDatiPersonaliComponent implements OnInit {
  //Campi per il form
  public nome : String;
  public cognome : String;
  public codiceFiscale : String;
  public dataDiNascita : Date;
  public email : String;
  public iban : String;
  public banca : String;
  public bbc : String;
  public user : User;
  public vecchiaPassword : string;
  public nuovaPassword : string;
  public ripetiNuovaPassword : string;
  public error : string;
  public warning : string;
  isReady : boolean;
  isLoading: boolean = false;
  buttonIsVisible : boolean;
  constructor(private employerLogService:EmployerLogService, private restRequestService:RestRequestService, private router:Router) { 
    this.isReady = false;
    //Setto i dati dell'utente loggato per mostrarlo nell'apposito form
    this.nome = employerLogService.getNomeUtente();
    this.cognome = employerLogService.getCognomeUtente();
    this.codiceFiscale = employerLogService.getCodiceFiscale();
    var data = employerLogService.getDataDiNascita().date;
    this.dataDiNascita = employerLogService.getDataDiNascita();
    this.email = employerLogService.getEmail();
    this.iban = employerLogService.getIban();
    this.banca = employerLogService.getBanca();
    this.bbc = employerLogService.getBbc();
    this.isReady = true;
    this.warning = "Per modificare i dati inserire la password nei campi 'Vecchia Password' e 'Ripeti Password'";
  }

  ngOnInit() {
  }

  aggiornaDipendente(){
    this.isLoading = true;
    this.warning = undefined;
    //Caso in cui non si voglia modificare la password
    if(!this.vecchiaPassword){
      this.nuovaPassword = this.ripetiNuovaPassword = this.vecchiaPassword;
    }
    if(this.nuovaPassword != this.ripetiNuovaPassword){
      return;
    }
    //Parametri per la request
    var parameters = {
      'token' : sessionStorage.getItem("token"),
      'nome': this.nome,
      'cognome': this.cognome,
      'dataDiNascita':this.dataDiNascita,
      'email':this.email,
      'iban':this.iban,
      'banca':this.banca,
      'bbc':this.bbc,
      'vecchiaPassword':this.vecchiaPassword,
      'nuovaPassword':this.nuovaPassword,
      'ripetiNuovaPassword':this.ripetiNuovaPassword,

    }
    //Eseguo la chiamata rest per l'update dei dati
    this.restRequestService.updateUtente(parameters).subscribe(function(){
      //Ricevuta la respone e quindi eseguito l'update ricarico il service contenente i dati dell'utente loggato
      this.employerLogService.refreshSessionByTokenRequest().subscribe(function(response){
        //Se riscontro errore, forzo ad eseguire il login nuovamente
        if(!this.employerLogService.caricaUtenteLoggato(response)){
          this.router.navigate(['/login']);
        }
        //Reset form
        this.vecchiaPassword = this.nuovaPassword = this.ripetiNuovaPassword = undefined;
        this.isLoading = false;
      }.bind(this));
    }.bind(this)); 
  }

  //Check per disabilitare il button "salva"
  isDisabled() {
    var campiPasswordPopolatiCorrettamente = (this.vecchiaPassword && this.nuovaPassword && this.ripetiNuovaPassword) ? true : false;
    var campiPasswordNonPopolatiCorrettamente = (!this.vecchiaPassword && !this.nuovaPassword && !this.ripetiNuovaPassword) ? true : false;
    var checkCampiPassword = campiPasswordPopolatiCorrettamente || campiPasswordNonPopolatiCorrettamente;
    //console.log("campiPasswordPopolatiCorrettamente: "+campiPasswordPopolatiCorrettamente );
    //console.log("campiPasswordNonPopolatiCorrettamente: "+campiPasswordNonPopolatiCorrettamente );
    if(
      !this.nome || 
      !this.cognome || 
      !this.dataDiNascita || 
      !this.email || 
      !checkCampiPassword ||
      this.error
    ){
      return true;
    }else{
      return false;
    }
    
  }

  //Validate form per update utente
  checkPassword(){
    //var campiPasswordPopolatiCorrettamente = (this.vecchiaPassword && this.nuovaPassword && this.ripetiNuovaPassword) ? true : false;
    //var campiPasswordNonPopolatiCorrettamente = (!this.vecchiaPassword && !this.nuovaPassword && !this.ripetiNuovaPassword) ? true : false;
    //var checkCampiPassword = campiPasswordPopolatiCorrettamente || campiPasswordNonPopolatiCorrettamente;

    if(this.vecchiaPassword || this.nuovaPassword){
      if(!this.vecchiaPassword){
        this.error="Inserisci la vecchia password";
      }else if(!this.nuovaPassword){
        this.error="Inserisci la password";
      }else if(!this.ripetiNuovaPassword){
        this.error="Inserisci nuovamente la password";
      }else if(this.vecchiaPassword && this.nuovaPassword && this.nuovaPassword != this.ripetiNuovaPassword){
        this.error="Le password non coincidono";
      }else{
        this.error = undefined;
      }
    }else{
      this.error = undefined;
    }
    if(!this.error && this.vecchiaPassword){
      this.restRequestService.checkPasswordUtente(this.vecchiaPassword, this.codiceFiscale).subscribe(function(response){
        if(!response['succes']){
          this.error = response['error'];
        }else{
          this.error=undefined;
        }
      }.bind(this));
    }
  }

}
