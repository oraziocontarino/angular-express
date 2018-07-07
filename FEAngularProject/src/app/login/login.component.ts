import { Component, OnInit } from '@angular/core';
import { EmployerLogService } from '../../service/employer-log.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  codiceFiscale : String;
  password: String;
  error : String;
  isLoading: boolean = false;
  constructor(private employerLogService : EmployerLogService, private router: Router) {
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

  login(){
    this.isLoading = true;
    this.employerLogService.logIn(this.codiceFiscale, this.password).subscribe(function(response){
      if(!response['success']){
        this.error = response['error'];
      }else{
        this.employerLogService.loginHandler(response);
      }
      this.isLoading = false;
    }.bind(this));
  }

}
