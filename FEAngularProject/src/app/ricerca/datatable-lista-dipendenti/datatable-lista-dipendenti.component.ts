//Giovanni Emanuele Longo - Ricerca dipendenti
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { RestRequestService } from '../../../service/rest-request.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-datatable-lista-dipendenti',
  templateUrl: './datatable-lista-dipendenti.component.html',
  styleUrls: ['./datatable-lista-dipendenti.component.css']
})
export class DatatableListaDipendentiComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  tableReady : boolean;
  dtOptions: DataTables.Settings = {};
  //Header DataTable
  headers = [
    'Action',
    'Id',
    'Nome',
    'Cognome',
    'Ruolo'
  ];
  rows = [];
  constructor(private restRequestService : RestRequestService, public router: Router) { 
    //Mostro la DataTable solo se è renderizzata
    this.tableReady = false;
  }


  ngOnInit(): void {
    //Inizializzo la DataTable
    this.initDatatable();
    //Carico tutti i dipendenti
    this.restRequestService.ricerca('dipendenti').subscribe(function(response){
      this.rows = response["data"];
      //Ricevuto la response renderizzo la DataTable
      this.render(this);
      //Rendo visibile la DataTable
      this.tableReady = true;
    }.bind(this));
  }
  ngOnDestroy(): void {
  }

  initDatatable(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      columnDefs: [
        {
        "targets": 0,
        "orderable": false
        },
        {
        "targets": -1,
        "orderable": true
        },
        {
        "targets": -2,
        "orderable": true
        },
        {
        "targets": -3,
        "orderable": true
        },
        {
          "targets": -4,
          "orderable": true
        },
        {
          className: "text-center",
          "targets": [0,1,2,3,4],
        }
      ],
      language: {
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Italian.json"
      }
    };
  }

  render(__this): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.clear().draw();
      this.rows.forEach(function (row) {
        //I dati da mostrare
        //Il button per il reindirizzamento alla pagina dell'utente selezionato
        var myrow = [
          '<a class="valid-action"> <i class="material-icons view_dettagli" id_dipendente=\''+row['id_dipendente']+'\' title="Visualizza Skill">visibility</button> </a>',
          row['id_dipendente'],
          row['nome'],
          row['cognome'],
          row['ruolo']
        ];
        dtInstance.row.add(myrow).draw();
      });
      __this.bindBottoni(__this, dtInstance);
    });
  }
  
  bindBottoni(__this, dtInstance){
    $('app-datatable-lista-dipendenti').on('click', '.view_dettagli', function(){
      //Rendirizzamento alla pagina dell'utente selezionato
      __this.redirect($(this).attr('id_dipendente'));
    });
  }

  redirect(idDipendente : string){
    this.router.navigate (['/skillDipendente/' + idDipendente]);
  }
}
