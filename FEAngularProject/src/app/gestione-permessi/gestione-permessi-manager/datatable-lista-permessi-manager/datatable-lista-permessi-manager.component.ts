//Il codice è analogo al child-component del component gestione-permessi-dipendenti,
//cambia l'endpoint dal quale recupera i dati.
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { RestRequestService } from '../../../../service/rest-request.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-datatable-lista-permessi-manager',
  templateUrl: './datatable-lista-permessi-manager.component.html',
  styleUrls: ['./datatable-lista-permessi-manager.component.css']
})
export class DatatableListaPermessiManagerComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  tableReady : boolean;
  headers = [
    '',
    'Dipendente',
    'Stato richiesta',
    'Data inizio',
    'Data fine',
    'Totale giorni',
    'Certificato',
    'Approva',
    'Rifiuta'
  ];

  rows = [];
  constructor(private restRequestService : RestRequestService, private router: Router) { 
    this.tableReady = false;
  }

  ngOnInit(): void {
    this.initDatatable();
    this.restRequestService.getListaPermessiSubordinati().toPromise().then(function(response){
      this.rows = response["data"];
      this.render();
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
          className: "details-control",
          "targets": 1
        },
        {
        "targets": [0, -1, -2, -3],
        "orderable": false
        },
        {
          className: "text-center",
          "targets": [0,1,2,3,4,5,6,7,8],
        },
      ],
      language: {
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Italian.json"
      },
    }
  }

  render(): void {
    var __this = this;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.clear().draw();
      this.rows.forEach(function (row) {
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

        var disabilitaApprovaPermesso = row['stato_richiesta'] == 'approvato';
        var disabilitaRifiutaPermesso = row['stato_richiesta'] == 'rifiutato';
        
        var dettagliDipendente = JSON.stringify({
          'id': row['id'],
          'nome': row['nome'],
          'cognome': row['cognome'],
          'codice_fiscale': row['codice_fiscale'],
          'note' : row['note']
        });
        var bottoneInfoDipendente = $("<div>").append(
          $("<div>").append(
            $("<label>").text(row['nome']+" "+row['cognome'])
          )
          .append(
            $("<button>")
              .addClass('btn')
              .addClass('material-icons')
              .addClass('info-dipendente')
              .attr('info-dipendente', dettagliDipendente)
              .text('expand_more')
              .css('width', '100%')
          )
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

        var bottoneApprovaPermesso = $("<div>").append(
          $("<button>")
            .addClass("btn")
            .addClass("btn-success")
            .addClass("material-icons")
            .addClass("approve_request")
            .attr("id_richiesta", row['id'])
            .attr("title", "Approva")
            .prop("disabled", disabilitaApprovaPermesso)
            .text("done")
        );
        var bottoneRifiutaPermesso = $("<div>").append(
          $("<button>")
            .addClass("btn")
            .addClass("btn-danger")
            .addClass("material-icons")
            .addClass("refuse_request")
            .attr("id_richiesta", row['id'])
            .attr("title", "Rifiuta")
            .prop("disabled", disabilitaRifiutaPermesso)
            .text("close")
        );
        var myrow = [
          row['id'],
          $(bottoneInfoDipendente).html(),
          row['stato_richiesta'],
          row['data_inizio'],
          row['data_fine'],
          row['totale_giorni'],
          $(bottoneDonwloadCertificato).html(),
          $(bottoneApprovaPermesso).html(),
          $(bottoneRifiutaPermesso).html()
        ];
        dtInstance.row.add(myrow).draw();
      });
      __this.bindBottoni(dtInstance);
    });
  }

  bindApprovaPermesso(){
    var __this = this;
    $('body .datatable-permessi-manager').off('click', '.approve_request');
    $('body .datatable-permessi-manager').on('click', '.approve_request', function(){
      console.log('approva!');
      __this.tableReady = false;
      var id_permesso = $(this).attr('id_richiesta');
      var rowInstance = this;
      __this.restRequestService.approvaPermesso(id_permesso).toPromise().then(function(response){
        if(!response['success']){
          console.log(response['error']);
          __this.tableReady = true;
        }else{
          __this.restRequestService.getListaPermessiSubordinati().toPromise().then(function(response){
            __this.rows = response["data"];
            __this.render();
            __this.tableReady = true;
          });
        }
      }).catch(function(e){
        console.log(e);
      });
    });
  }

  bindRifiutaPermesso(){
    var __this = this;
    $('body .datatable-permessi-manager').off('click', '.refuse_request');
    $('body .datatable-permessi-manager').on('click', '.refuse_request', function(){
      console.log('rifiuta!');
      __this.tableReady = false;
      var id_permesso = $(this).attr('id_richiesta');
      var rowInstance = this;
      __this.restRequestService.rifiutaPermesso(id_permesso).toPromise().then(function(response){
        if(!response['success']){
          console.log(response['error']);
          __this.tableReady = true;
        }else{
          __this.restRequestService.getListaPermessiSubordinati().toPromise().then(function(response){
            __this.rows = response["data"];
            __this.render();
            __this.tableReady = true;
          }.bind(this));
        }
      }).catch(function(e){
        console.log(e);
      });
    });
  }
  bindDettagliDipendente(dtInstance){
    var __this = this;
    $('body .datatable-permessi-manager').off('click', 'td.details-control button.info-dipendente');
    $('body .datatable-permessi-manager').on('click', 'td.details-control button.info-dipendente', function () {
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
    this.bindApprovaPermesso();
    this.bindRifiutaPermesso();
    this.bindDettagliDipendente(dtInstance);
  }

  format(data) {
      // `d` is the original data object for the row
      return $("<div>").append(
        $("<table>")
          .attr("cellpadding", "5")
          .attr("cellspacing", "0")
          .attr("border", "0")
          .css("padding-left", "50px")
          .append(
            $("<tr>").append(
              $("<td>").text("Nome")
            ).append(
              $("<td>").text(data["nome"])
            )
          )
          .append(
            $("<tr>").append(
              $("<td>").text("Cognome")
            ).append(
              $("<td>").text(data["cognome"])
            )
          )
          .append(
            $("<tr>").append(
              $("<td>").text("Codice fiscale")
            ).append(
              $("<td>").text(data["codice_fiscale"])
            )
          )
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
