import { Component, OnInit } from '@angular/core';
import { EmployerLogService } from '../../service/employer-log.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-gestione-permessi',
  templateUrl: './gestione-permessi.component.html',
  styleUrls: ['./gestione-permessi.component.css']
})
export class GestionePermessiComponent implements OnInit {

  constructor(private employerLogService : EmployerLogService, private router: Router) {
    //employerLogService recupera la sessione/token auth.
   }

  ngOnInit() {
    if(!this.employerLogService.isLogged()){
      //Caso utente non autenticato / token non ancora recuperato
      if(!sessionStorage.getItem("token")){
        //Il token non è presente ne in sessione ne in SessionStorage
        this.router.navigate(['/login']);
      }else{
        //il token è presente
        this.employerLogService.refreshSessionByTokenRequest().subscribe(function(response){
          //Provo a recuperare il token dalla sessionStorage (effettua anche la validazione)
          if(!this.employerLogService.caricaUtenteLoggato(response)){
            //Token non presente in sessionStorage/token scaduto
            this.router.navigate(['/login']);
          }
        }.bind(this));
      }
    }
    //Token recuperato con successo, carico i component figli!
  }

}
