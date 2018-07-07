//Giovanni Emanuele Longo
import { Injectable } from '@angular/core';
import { User } from '../app/common/class/user';
import { Observable, of } from 'rxjs';
import { RestRequestService } from './rest-request.service';
import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class EmployerLogService {

  private utenteLoggato : User;
  constructor(private restRequestService : RestRequestService, private router: Router) {
  }
  
  //Check se l'utente è loggato
  isLogged() : boolean{
    return this.utenteLoggato ? true : false;
  }
  //Login
  logIn(username: String, password: String){
    if((!this.utenteLoggato || !this.utenteLoggato.token)){
      return this.restRequestService.login(username, password);
    }
  }

  loginHandler(response){
    this.caricaUtenteLoggato(response);
    this.router.navigate(['/dashboard']);
  }
  //Refres usando il token in sessione
  refreshSessionByTokenRequest(){
    if(sessionStorage.getItem("token")){
      return this.restRequestService.validateToken(sessionStorage.getItem("token"));
    }
    return null;
  }
  //Logout
  logOut() : boolean{
    //Canvello utente loggato
    delete this.utenteLoggato;
    sessionStorage.removeItem('token');
    //Rmuovo il token e vado alla login
    this.router.navigate(['/login']);
    return;
  }

  caricaUtenteLoggato(response : any){
    //Caricare l'oggetto utenteLoggato
    if(!response['success']){
      return false;
    }
    this.utenteLoggato = new User();
    this.utenteLoggato.token = response['data'].token;
    sessionStorage.setItem("token", response['data'].token);
    this.utenteLoggato.nome = response['data'].nome;
    this.utenteLoggato.cognome = response['data'].cognome;
    this.utenteLoggato.ruolo = response['data'].ruolo;
    this.utenteLoggato.email = response['data'].email;
    this.utenteLoggato.codiceFiscale = response['data'].codiceFiscale;
    this.utenteLoggato.dataDiNascita = response['data'].dataDiNascita;
    this.utenteLoggato.iban =  response['data'].iban;
    this.utenteLoggato.banca =  response['data'].banca;
    this.utenteLoggato.bbc =  response['data'].bbc;
    this.utenteLoggato.id =  response['data'].id;
    console.log(response['data'].token);
    return true;
  }

  isManager() : boolean{
    return this.utenteLoggato.ruolo == 'manager';
  }
  
  getNomeUtente() : String {
    return this.utenteLoggato.nome;
  }
  getCognomeUtente() : String {
    return this.utenteLoggato.cognome;
  }

  getEmail() : String {
    return this.utenteLoggato.email;
  }

  getCodiceFiscale() : String {
    return this.utenteLoggato.codiceFiscale;
  }

  getDataDiNascita() : any {
    return this.utenteLoggato.dataDiNascita;
  }

  getIban() : String {
    return this.utenteLoggato.iban;
  }

  getBanca() : String {
    return this.utenteLoggato.banca;
  }

  getBbc() : String {
    return this.utenteLoggato.bbc;
  }

  getId() : String {
    return this.utenteLoggato.id;
  }

  getUtenteLoggato() : User {
    return this.utenteLoggato;
  }

}
