//Longo Giovanni Emanuele
import { Component, OnInit } from '@angular/core';
import { EmployerLogService } from '../../service/employer-log.service';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { RestRequestService } from '../../service/rest-request.service';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css']
})
export class RicercaComponent implements OnInit {
  private resultRicercaDipendenti : any;
  //Check se l'utente è loggato
  constructor(private employerLogService : EmployerLogService,private activatedRoute: ActivatedRoute, 
    private router: Router, private restRequestService:RestRequestService) {
    if(!this.employerLogService.isLogged()){
      //Se non lo è lo riporto alla pagina di Login
      if(!sessionStorage.getItem("token")){
        this.router.navigate(['/login']);
      }else{
        //Ricarico il service con i dati dell'utente
        this.employerLogService.refreshSessionByTokenRequest().subscribe(function(response){
          if(!this.employerLogService.caricaUtenteLoggato(response)){
            this.router.navigate(['/login']);
          }
        }.bind(this));
      }
    }
  }

  ngOnInit() {
  }

}
