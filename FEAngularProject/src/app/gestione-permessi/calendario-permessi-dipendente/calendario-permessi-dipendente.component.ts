//Orazio Contarino
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {RestRequestService} from '../../../service/rest-request.service' 
import * as moment from 'moment';
import * as _ from 'lodash';

export interface CalendarDate {
  //calendario gestito per mezzo della classe moment
  mDate: moment.Moment;
  //flag per evidenziare i giorni di permesso approvati
  selected?: boolean;
  //il giorno corrente è anch'esso evidenziato
  today?: boolean;
  showEvent: boolean;
}

@Component({
  selector: 'app-calendario-permessi-dipendente',
  templateUrl: './calendario-permessi-dipendente.component.html',
  styleUrls: ['./calendario-permessi-dipendente.component.scss']
})
export class CalendarioPermessiDipendenteComponent implements OnInit, OnChanges {
  //inizializzo la classe moment per la gestione del clendario
  currentDate = moment();
  dayNames = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
  weeks: CalendarDate[][] = [];
  sortedDates: CalendarDate[] = [];
  datePermessi = [];
  @Input() selectedDates: CalendarDate[] = [];
  @Input() loadManager: Boolean;
  @Output() onSelectDate = new EventEmitter<CalendarDate>();

  constructor(private restRequestService : RestRequestService) {
    //setto la locale per tradurre le stringhe del calendario da inglese ad italiano
    this.currentDate.locale("it");
  }

  ngOnInit(): void {
    //periodicamente verifico la presenza di nuovi permessi approvati ricaricando il mese visualizzato.
    setInterval(function(){
      this.datePermessi=[];
      //Il component è utilizzato sia per le view visibili dai manager che per quelle visibili dai dipendenti
      if(this.loadManager){
        //Caso view visualizzata da un Manager
        //Carico la lista dei permessi approvati a tutti i subordinati
        this.restRequestService.getListaPermessiSubordinati().subscribe(function(response){
          if(response['data'] == undefined){
            return;
          }
          response['data'].forEach(function (row) {
            //la chiamata restituisce un range, calcolo ogni singola data per evidenziarla nel calendario
            if(row['stato_richiesta']=='approvato'){
              this.enumerateDaysBetweenDates(this, row['data_inizio'], row['data_fine']);
            }
          }.bind(this));
          //genero il calendario
          this.generateCalendar();
        }.bind(this));
      }
      else{
        //Caso view visualizzata da un dipendete
        //Carico la lista dei permessi approvati
        //NB: Il manager che accede alla tab gestione permessi visualizza questo component come Dipendente (vede solo i suoi permessi)
        //NB: Il manager che accede alla tab gestione permessi subordinati visualizza questo component come Manager (vede anche i permessi dei suoi subordinati)
        this.restRequestService.getListaPermessiDipendente().subscribe(function(response){
          if(response['data'] == undefined){
            return;
          }
          response['data'].forEach(function (row) {
            if(row['stato_richiesta']=='approvato'){
              this.enumerateDaysBetweenDates(this, row['data_inizio'], row['data_fine']);
            }
          }.bind(this));
          this.generateCalendar();
        }.bind(this));
      }
    }.bind(this), 1000);
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedDates &&
        changes.selectedDates.currentValue &&
        changes.selectedDates.currentValue.length  > 1) {
      //Ordino le date
      this.sortedDates = _.sortBy(changes.selectedDates.currentValue, (m: CalendarDate) => m.mDate.valueOf());
      this.generateCalendar();
    }
  }

  // date checkers
  isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  isSelected(date: moment.Moment): boolean {
    return _.findIndex(this.selectedDates, (selectedDate) => {
      return moment(date).isSame(selectedDate.mDate, 'day');
    }) > -1;
  }

  isSelectedMonth(date: moment.Moment): boolean {
    return moment(date).isSame(this.currentDate, 'month');
  }

  selectDate(date: CalendarDate): void {
    this.onSelectDate.emit(date);
  }

  //Azioni del calendario (cambio mese/anno)
  prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.generateCalendar();
  }

  firstMonth(): void {
    this.currentDate = moment(this.currentDate).startOf('year');
    this.generateCalendar();
  }

  lastMonth(): void {
    this.currentDate = moment(this.currentDate).endOf('year');
    this.generateCalendar();
  }

  prevYear(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'year');
    this.generateCalendar();
  }

  nextYear(): void {
    this.currentDate = moment(this.currentDate).add(1, 'year');
    this.generateCalendar();
  }

  // Genera il calendario
  generateCalendar(): void {
    const dates = this.fillDates(this.currentDate);
    const weeks: CalendarDate[][] = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;
  }
  //Popola il mese selezionato
  fillDates(currentMoment: moment.Moment): CalendarDate[] {
    const firstOfMonth = moment(currentMoment).startOf('month').day();
    const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days');
    const start = firstDayOfGrid.date();
    return _.range(start, start + 42)
            .map((date: number): CalendarDate => {
              const d = moment(firstDayOfGrid).date(date);
              return {
                today: this.isToday(d),
                selected: this.isSelected(d),
                mDate: d,
                //getClasses preleva le classi da assegnare al div dello specifico giorno
                //in questo modo visualizzo i permessi approvati con uno sfondo blu.
                showEvent: this.getClasses(d)
              };
            });
  }

  getClasses(mDate){
    var currentCalendarDate = this.formatDate(mDate._d.getDate(), mDate._d.getMonth(), mDate._d.getFullYear());
    return this.datePermessi[currentCalendarDate]===undefined ? false: true;
  }
  formatDate(day, month, year){    
    //fix month start from 0
    month = month + 1;
    day = day < 9 ? "0" + day : day;
    month = month < 9 ? "0" + month : month;
    return year + "-" + month + "-" + day;
  }
  dmyToYmd(date){
    var component = date.split('-');
    return component[2]+"-"+component[1]+"-"+component[0];
  }

  enumerateDaysBetweenDates = function(__this, startDate, endDate) {
      var currDate = moment(__this.dmyToYmd(startDate)).startOf('day');
      var lastDate = moment(__this.dmyToYmd(endDate)).startOf('day');
      currDate.subtract(1, 'months');
      lastDate.subtract(1, 'months');
      lastDate.add(1, 'days');
      while(currDate.add(1, 'days').diff(lastDate) <= 0) {
        var day = currDate.date() - 1;
        var month = currDate.month() +1;
        var year = currDate.year();
        __this.datePermessi[__this.formatDate(day, month, year)] = true;
      }
  };
  
}