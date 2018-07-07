//Definizione dell'endpoint e delle chiamate rest
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../app/common/class/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestRequestService {

  private context : String;
  private endpoint : Map<String, String>;

  constructor(private http: HttpClient) {
    this.context = 'http://localhost/angularproject/be';
    this.endpoint = new Map<String, String>();
    this.endpoint['login'] = this.context+'/login';
    this.endpoint['register'] = this.context+'/register';
    this.endpoint['validateToken'] = this.context+'/validateToken';
    this.endpoint['getDatiUtente'] = this.context+'/getDatiUtente';
    this.endpoint['getSkills'] = this.context+'/getSkills';
    this.endpoint['getListSkills'] = this.context+'/getListSkills';
    this.endpoint['aggiungiModificaSkills'] = this.context+'/aggiungiModificaSkill';
    this.endpoint['rimuoviSkill'] = this.context+'/rimuoviSkill';
    this.endpoint['updateUser']= this.context+'/updateUser';
    this.endpoint['ricerca']= this.context+'/ricerca';
    this.endpoint['dipendenteInfo']= this.context+'/dipendenteInfo';
    this.endpoint['getTeam']= this.context+'/getTeam';
    this.endpoint['deleteEmployerInTeam'] = this.context+'/deleteEmployerInTeam';
    this.endpoint['addEmployerInTeam'] = this.context+'/addEmployerInTeam';
    this.endpoint['addTeam'] = this.context+'/addTeam';
    this.endpoint['addDipendente'] = this.context+'/addDipendente';
    this.endpoint['checkPasswordUtente'] = this.context+'/checkPasswordUtente';
    //Gestione permessi
    this.endpoint['getPermessiEnumArray'] = this.context+'/getPermessiEnumArray';
    this.endpoint['getListaPermessiDipendente'] = this.context+'/getListaPermessiDipendente';
    this.endpoint['getListaPermessiSubordinati'] = this.context+'/getListaPermessiSubordinati';
    this.endpoint['registraPermesso'] = this.context+'/registraPermesso';
    this.endpoint['cancellaPermesso'] = this.context+'/cancellaPermesso';
    this.endpoint['approvaPermesso'] = this.context+'/approvaPermesso';
    this.endpoint['rifiutaPermesso'] = this.context+'/rifiutaPermesso';
   }

  login(username: String, password: String) : any{
    var credential;
      credential = {
        'codice_fiscale' : username,
        'password' : password
      }
      return this.http.post(this.endpoint['login'], credential, httpOptions);
  }

  registraDipendente(user:any):any{
    return this.http.post(this.endpoint['register'],user,httpOptions);
  }

  registraFerie(stanza:any):any{
    //return this.http.post(this.context+'register',stanza,httpOptions); 
  }

  validateToken(token : String) : any{
    var tokenJson = {
      'token' : token
    }
    return this.http.post(this.endpoint['validateToken'], tokenJson, httpOptions);
  }

  getDatiUtente(){
    var parameter = {
      'token' : sessionStorage.getItem("token")
    }
    return this.http.post(this.endpoint['getDatiUtente'],parameter, httpOptions);
  }

  getSkills(){
    var parameter = {
      'token' : sessionStorage.getItem("token")
    }
    return this.http.post(this.endpoint['getSkills'],parameter, httpOptions);
  }

  caricaSkills(){
    return this.http.get(this.endpoint['getListSkills']);
  }

  getPermessiEnumArray(){
    var parameter = {
      'token' : sessionStorage.getItem("token")
    }
    return this.http.post(this.endpoint['getPermessiEnumArray'], parameter, httpOptions);
  }
  registraPermesso(dataInizio, dataFine, note, tipologia, certificatoBase64){
    var parameter = {
      'token' : sessionStorage.getItem("token"),
      'dataInizio': dataInizio,
      'dataFine': dataFine,
      'note': note,
      'tipologia': tipologia,
      'certificatoBase64': certificatoBase64,
    }
    return this.http.post(this.endpoint['registraPermesso'], parameter, httpOptions);
  }
  getListaPermessiDipendente(){
    var parameter = {
      'token' : sessionStorage.getItem("token")
    }
    return this.http.post(this.endpoint['getListaPermessiDipendente'], parameter, httpOptions);
  }
  aggiungiSkill(newSkill:any, idDipendente:String){
    var parameter = {
      'token' : sessionStorage.getItem("token"),
      'id_skill': newSkill.id,
      'seniority':newSkill.seniority,
      'id_dipendente':idDipendente
    }
    return this.http.post(this.endpoint['aggiungiModificaSkills'], parameter, httpOptions);
  }
  modificaSkill(newSkill:any, idDipendente:String){
    var parameter = {
      'token' : sessionStorage.getItem("token"),
      'id_skill': newSkill.id_skill,
      'seniority':newSkill.seniority,
      'id_dipendente':idDipendente
    }
    return this.http.post(this.endpoint['aggiungiModificaSkills'], parameter, httpOptions);
  }
  rimuoviSkill(idSkill:String, idDipendente:String){
    var parameter = {
      'token' : sessionStorage.getItem("token"),
      'id_skill': idSkill,
      'id_dipendente':idDipendente
    }
    return this.http.post(this.endpoint['rimuoviSkill'], parameter, httpOptions);
  }
  cancellaPermesso(idPermesso:String){
    var parameter = {
      'token' : sessionStorage.getItem("token"),
      'id_permesso': idPermesso
    }
    return this.http.post(this.endpoint['cancellaPermesso'], parameter, httpOptions);
  }

  updateUtente(parameter : any){
    return this.http.put(this.endpoint['updateUser'], parameter, httpOptions);
  }

  getListaPermessiSubordinati(){
    var parameter = {
      'token' : sessionStorage.getItem("token")
    }
    return this.http.post(this.endpoint['getListaPermessiSubordinati'], parameter, httpOptions);
  }
  approvaPermesso(idPermesso:String){
    var parameter = {
      'token' : sessionStorage.getItem("token"),
      'id_permesso': idPermesso
    }
    return this.http.post(this.endpoint['approvaPermesso'], parameter, httpOptions);
  }
  rifiutaPermesso(idPermesso:String){
    var parameter = {
      'token' : sessionStorage.getItem("token"),
      'id_permesso': idPermesso
    }
    return this.http.post(this.endpoint['rifiutaPermesso'], parameter, httpOptions);
  }

  ricerca (tipoRicerca:String){
    var parameter = {
      'token' : sessionStorage.getItem("token"),
      'tipo_ricerca' : tipoRicerca
    }
    return this.http.post(this.endpoint['ricerca'], parameter, httpOptions);
  }

  getDipendeteInfoAndSkill(idDipendente : String){
    var parameter = {
      'token' : sessionStorage.getItem("token"),
      'id_dipendente' : idDipendente
    }
    return this.http.post(this.endpoint['dipendenteInfo'], parameter, httpOptions);
  }

  getTeam(idTeam : String){
    var parameter = {
      'token' : sessionStorage.getItem("token"),
      'id_team' : idTeam
    }
    return this.http.post(this.endpoint['getTeam'], parameter, httpOptions);
  }

  deleteEmployerInTeam(team: String, dipendente : String){
    var parameter = {
      'token' : sessionStorage.getItem("token"),
      'id_team' : team,
      'id_dipendente' : dipendente
    }
    return this.http.post(this.endpoint['deleteEmployerInTeam'], parameter, httpOptions);
  }

  addEmployerInTeam(team: String, newDipendente : any){
    var parameter = {
      'token' : sessionStorage.getItem("token"),
      'id_team' : team,
      'id_dipendente' : newDipendente.id
    }
    return this.http.post(this.endpoint['addEmployerInTeam'], parameter, httpOptions);
  }

  addTeam(nomeTeam : String){
    var parameter = {
      'token' : sessionStorage.getItem("token"),
      'nome_team' : nomeTeam
    }
    return this.http.post(this.endpoint['addTeam'], parameter, httpOptions);
  }

  addDipendente(dipendente : any){
    var parameter = {
      'token' : sessionStorage.getItem("token"),
      'nome' : dipendente.nome,
      'cognome' : dipendente.cognome,
      'codice_fiscale' : dipendente.codice_fiscale,
      'email' : dipendente.email,
      'password' : dipendente.password,
      'ruolo' : dipendente.ruolo
    }
    return this.http.post(this.endpoint['addDipendente'], parameter, httpOptions);
  }

  checkPasswordUtente(password : String, codiceFiscale : String){
    var parameter = {
      'codice_fiscale' : codiceFiscale,
      'password' : password
    }
    return this.http.post(this.endpoint['checkPasswordUtente'], parameter, httpOptions);
  }
}

