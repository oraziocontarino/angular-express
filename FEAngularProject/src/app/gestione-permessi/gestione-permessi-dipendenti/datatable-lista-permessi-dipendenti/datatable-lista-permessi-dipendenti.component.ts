import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { RestRequestService } from '../../../../service/rest-request.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-datatable-lista-permessi-dipendenti',
  templateUrl: './datatable-lista-permessi-dipendenti.component.html',
  styleUrls: ['./datatable-lista-permessi-dipendenti.component.css']
})
export class DatatableListaPermessiDipendentiComponent implements OnDestroy, OnInit {
  //inizializzo gli elementi per il render della datatable
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  tableReady = false;
  headers = [
    '',
    'Note',
    'Stato richiesta',
    'Data inizio',
    'Data fine',
    'Totale giorni',
    'Certificato',
    '*Annulla richiesta'
  ];
  rows = [];
  constructor(private restRequestService : RestRequestService, private router: Router) { 
  }

  ngOnInit(): void {
    //inizializzo i metadati della datatable
    this.initDatatable();
    //prelevo dal backend i dati da inserire nella datatable per poi "disegnarli".
    this.restRequestService.getListaPermessiDipendente().toPromise().then(function(response){
      this.rows = response["data"];
      this.render();
      //questo flag attiva/disattiva il loader
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
          className: "details-control",
          "targets": 1
        },
        {
        "targets": -1,
        "orderable": false
        },
        {
        "targets": -2,
        "orderable": false
        },
        {
          className: "text-center",
          "targets": [0,1,2,3,4,5,6],
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
      //ad ogni refresh svuoto la datatable per poi riempirla con i dati aggiornati
      dtInstance.clear();
      //per ogni riga ottenuta dalla chiamata backend inserisco la controparte nella datatable
      this.rows.forEach(function (row) {
        //il certificato è gestito per mezzo della codifica base64 (memorizzo una stringa lato backend).
        var base64 = row['certificatoBase64'];
        if(base64.indexOf('base64,') == -1){
          return "";
        }
        var ext = null;
        if(base64.indexOf('image') != -1 ){
          ext = '.jpg';
        }else if(base64.indexOf('text') != -1){
          ext = '.txt';
        }else{
          return;
        }
        var baseFile = 'data:application/octet-stream';
        var strippedFile = base64.split(';base64,')[1];
        base64 = baseFile+';base64,'+strippedFile;
        //attivo/disattivo i bottoni
        var disabilitaCancellaPermesso = row['stato_richiesta'] == 'approvato';
        //genero i bottoni (attivati/disattivati a seconda del caso, il controllo è stato implementato anche a backend)
        var bottoneInfoDipendente = $("<div>").append(
          $("<button>")
            .addClass('btn')
            .addClass('material-icons')
            .addClass('info-dipendente')
            .attr('info-dipendente', JSON.stringify({'note': row['note']}))
            .text('expand_more')
            .css('width', '100%')
        );

        var bottoneDonwloadCertificato = $("<div>").append(
          $("<a>").attr("href", base64).attr("download", 'file'+ext).append(
            $("<button>")
              .addClass("btn")
              .addClass("btn-info")
              .addClass("material-icons")
              .text("attach_file")
          )
        );

        var bottoneCancellaPermesso = $("<div>").append(
          $("<button>")
            .addClass("btn")
            .addClass("btn-danger")
            .addClass("material-icons")
            .addClass("undo_request")
            .attr("id_richiesta", row['id'])
            .attr("title", "Annulla")
            .prop("disabled", disabilitaCancellaPermesso)
            .text("undo")
        );
        var myrow = [
          row['id'],
          $(bottoneInfoDipendente).html(),
          row['stato_richiesta'],
          row['data_inizio'],
          row['data_fine'],
          row['totale_giorni'],
          $(bottoneDonwloadCertificato).html(),
          $(bottoneCancellaPermesso).html()
        ];
        //aggiungo gli elementi che ho generato.
        //Per la generazione di ogni singolo nodo è stato utilizzato JQuery per semplicità e pulizia del codice.
        dtInstance.row.add(myrow).draw();
        //procedo con la prossima riga
      });
      //imposto gli eventi sui bottoni appena aggiunti alle varie righe.
      __this.bindBottoni(dtInstance);
    });
  }

  bindCancellaPermesso(dtInstance){
    var __this = this;
    //Disabilito i vecchi eventi, altrimenti aggiungendone sempre nuovi avrei esecuzioni multiple della stessa richiesta.
    //Canellando una riga non cancello anche l'evento!
    $('body .datatable-permessi-dipendente').off('click', '.undo_request');
    $('body .datatable-permessi-dipendente').on('click', '.undo_request', function(){
      //console.log('Annulla!');
      __this.tableReady = false;
      var id_permesso = $(this).attr('id_richiesta');
      var rowInstance = this;
      __this.restRequestService.cancellaPermesso(id_permesso).toPromise().then(function(response){
        if(!response['success']){
          console.log(response['error']);
          __this.tableReady = true;
        }else{
          var row = dtInstance.row($(rowInstance).parents('tr')).remove();
          dtInstance.draw();
          __this.tableReady = true;
        }
      }).catch(function(e){
        console.log(e);
      });
    });
  }

  bindDettagliDipendente(dtInstance){
    //questo evento permette di visualizzare la sottotabella della datatable
    var __this = this;
    $('body .datatable-permessi-dipendente').off('click', 'td.details-control button.info-dipendente');
    $('body .datatable-permessi-dipendente').on('click', 'td.details-control button.info-dipendente', function () {
      var tr = $(this).closest('tr');
      var row = dtInstance.row( tr );
  
      if ( row.child.isShown() ) {
          // This row is already open - close it
          row.child.hide();
          tr.removeClass('shown');
      }
      else {
          // Open this row
          var data = $(this).attr('info-dipendente');
          console.log(data);
          data = JSON.parse(data);
          row.child( __this.format(data) ).show();
          tr.addClass('shown');
      }
    });
  }

  bindBottoni(dtInstance){
    this.bindCancellaPermesso(dtInstance);
    this.bindDettagliDipendente(dtInstance);
  }

  format(data) {
      //costruisce la sottotabella della datatable, torna l'html.
      return $("<div>").append(
        $("<table>")
          .attr("cellpadding", "5")
          .attr("cellspacing", "0")
          .attr("border", "0")
          .css("padding-left", "50px")
          .append(
            $("<tr>").append(
              $("<td>").text("Note")
            ).append(
              $("<td>").text(data["note"])
            )
          )
      ).html();      
  }
}
