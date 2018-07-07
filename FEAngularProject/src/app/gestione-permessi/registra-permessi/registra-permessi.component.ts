import { Component, OnInit } from '@angular/core';
import { EmployerLogService } from '../../../service/employer-log.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-registra-permessi',
  templateUrl: './registra-permessi.component.html',
  styleUrls: ['./registra-permessi.component.css']
})
export class RegistraPermessiComponent implements OnInit {

  constructor(private employerLogService : EmployerLogService, private router: Router) { }

  ngOnInit() {
    //Controlli per la sessione (vedi gestione-permessi)
    if(!this.employerLogService.isLogged()){
      if(!sessionStorage.getItem("token")){
        this.router.navigate(['/login']);
      }else{
        this.employerLogService.refreshSessionByTokenRequest().subscribe(function(response){
          if(!this.employerLogService.caricaUtenteLoggato(response)){
            this.router.navigate(['/login']);
          }
        }.bind(this));
      }
    }
  }
}
