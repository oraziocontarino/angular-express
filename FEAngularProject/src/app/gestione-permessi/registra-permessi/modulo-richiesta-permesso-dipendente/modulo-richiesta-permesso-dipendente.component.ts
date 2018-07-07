import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestRequestService } from '../../../../service/rest-request.service';

@Component({
  selector: 'app-modulo-richiesta-permesso-dipendente',
  templateUrl: './modulo-richiesta-permesso-dipendente.component.html',
  styleUrls: ['./modulo-richiesta-permesso-dipendente.component.css']
}) 
export class ModuloRichiestaPermessoDipendenteComponent implements OnInit {
  dataInizio : any;
  dataFine : any;
  certificatoBase64 : String;
  nomeCertificatoCaricato : String;
  permessiEnumArray : any;
  tipologia : String;
  note : String;
  constructor(private restRequestService : RestRequestService, private router: Router) { 
    this.nomeCertificatoCaricato = "";
    this.restRequestService.getPermessiEnumArray().subscribe(function(result){
      this.permessiEnumArray = result['data'];
      console.log(result);
    }.bind(this));

  }

  ngOnInit() {

  }

  setFileName(event){
    //carica file permesso.
    //il file viene codificato in base64 per poi essere memorizzato come stringa sul database.

    var file = event.target.files[0];
    this.nomeCertificatoCaricato = file.name;
    
    var ext = this.nomeCertificatoCaricato.match(/\.([^\.]+)$/)[1];
    switch(ext)
    {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'txt':
          break;
        default:
            alert('Accettiamo solo file jpg, jpeg, png, txt');
            this.nomeCertificatoCaricato='';
            return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      this.certificatoBase64 = reader.result;
    }.bind(this);
    reader.onerror = function (error) {
      alert('Error: '+ error);
    };
  }
  registraPermesso(){
    this.restRequestService.registraPermesso(this.dataInizio, this.dataFine, this.note, this.tipologia, this.certificatoBase64).subscribe(function(){
      this.router.navigate(['/gestionePermessiDipendente']);
    }.bind(this));
  }
}
