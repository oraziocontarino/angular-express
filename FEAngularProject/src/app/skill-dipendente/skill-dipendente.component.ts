//Longo Giovanni Emanuele
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EmployerLogService } from '../../service/employer-log.service';
import { RestRequestService } from '../../service/rest-request.service';

@Component({
  selector: 'app-skill-dipendente',
  templateUrl: './skill-dipendente.component.html',
  styleUrls: ['./skill-dipendente.component.css']
})
export class SkillDipendenteComponent implements OnInit {
  private idDipendente : String;
  datiDipendente : any;
  constructor(private activatedRoute: ActivatedRoute,  private router: Router, private restRequestService:RestRequestService, private employerLogService : EmployerLogService) {}

  ngOnInit() {
    if(!this.employerLogService.isLogged()){
      //Se non lo è lo riporto alla pagina di Login
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
