import { Component, OnInit } from '@angular/core';
import { EmployerLogService } from '../../../service/employer-log.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-gestione-permessi-dipendenti',
  templateUrl: './gestione-permessi-dipendenti.component.html',
  styleUrls: ['./gestione-permessi-dipendenti.component.css']
})
export class GestionePermessiDipendentiComponent implements OnInit {

  constructor(private employerLogService : EmployerLogService, private router: Router) { }

  ngOnInit() {
    //Non controllo nulla, il parent ha già controllato tutto il necessario, se sono arrivato a caricare questo component tutto è andato per il verso giusto.
    //Se così non fosse non sarei neanche arrivato quì.
  }

}
