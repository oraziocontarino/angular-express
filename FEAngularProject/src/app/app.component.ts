import { Component } from '@angular/core';
import { EmployerLogService } from '../service/employer-log.service';
import { NgModel } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbDropdownConfig] // add NgbDropdownConfig to the component providers
})
export class AppComponent {
  searchField;
  title = 'Employer Manager';
  constructor(private employerLogService : EmployerLogService, config: NgbDropdownConfig, private router: Router) {
    // customize default values of dropdowns used by this component tree
    config.placement = 'bottom-left';
    config.autoClose = true;
  }
  
  search() {
    if(!this.searchField) this.searchField="Team, Dipendente";
    this.router.navigate(['/ricercaRisultati']);
  }


  logout(){
    this.employerLogService.logOut();
  }
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
