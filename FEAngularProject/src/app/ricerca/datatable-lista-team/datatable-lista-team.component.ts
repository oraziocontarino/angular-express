//Giovanni Emanuele Longo - Ricerca team
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { RestRequestService } from '../../../service/rest-request.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-datatable-lista-team',
  templateUrl: './datatable-lista-team.component.html',
  styleUrls: ['./datatable-lista-team.component.css']
})
export class DatatableListaTeamComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  tableReady : boolean;
  dtOptions: DataTables.Settings = {};
  //Header DataTable
  headers = [
    'Action',
    'Nome',
    'Capo Team'
  ];
  rows = [];
  constructor(private restRequestService : RestRequestService, private router: Router) { 
    //Mostro la DataTable solo se è renderizzata
    this.tableReady = false;
  }

  ngOnInit(): void {
    //Inizializzo la DataTable
    this.initDatatable();
    //Carico tutti i team
    this.restRequestService.ricerca('getTeam').subscribe(function(response){
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
          className: "text-center",
          "targets": [0,1,2],
        }
      ],
      language: {
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Italian.json"
      }
    };
  }

  render(): void {
    var __this = this;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.clear().draw();
      this.rows.forEach(function (row) {
        //I dati da mostrare
        //Il button per il reindirizzamento alla pagina del team selezionato
        var myrow = [
          '<a class="valid-action"> <i class="material-icons view_dettagli" id_team=\''+row['id_team']+'\' title="Visualizza Skill">visibility</button> </a>',
          row['nome'],
          __this.getCapoTeam(row)
        ];
        dtInstance.row.add(myrow).draw();
      });
      __this.bindBottoni(dtInstance);
    });
  }
  bindBottoni(dtInstance){
    var __this = this;
    $('app-datatable-lista-team').on('click', '.view_dettagli', function(){
      var id_team = $(this).attr('id_team');
      var rowInstance = this;
      //Rendirizzamento alla pagina del team selezionato
      __this.router.navigate(['/team/'+id_team]);
    });
  }
  //Mostro il capo team, creato metodo a parte per una migliore leggibilità del codice
  getCapoTeam (row : any){
    return row.team_capo_team[0].cognome + ' ' + row.team_capo_team[0].nome;
  }
}