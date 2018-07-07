//Il codice è analogo al child-component del component gestione-permessi-dipendenti,
//cambia l'endpoint dal quale recupera i dati.
import { Component, OnInit } from '@angular/core';
import { EmployerLogService } from '../../../service/employer-log.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-gestione-permessi-manager',
  templateUrl: './gestione-permessi-manager.component.html',
  styleUrls: ['./gestione-permessi-manager.component.css']
})
export class GestionePermessiManagerComponent implements OnInit {

  constructor(private employerLogService : EmployerLogService, private router: Router) { }

  ngOnInit() {
  }
  openTab(element){
    $('.tab-header').removeClass('active');
    $('.tab-header[tab-name="'+element+'"]').addClass('active');

    $('.tab-body').addClass('hidden');
    $('.tab-body[tab-name="'+element+'"]').removeClass('hidden');
  }
}
