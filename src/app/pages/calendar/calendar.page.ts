import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { VacanciesService } from '@app/shared/services/vacancies/vacancy-service';

@Component({
  selector: 'app-calendar.page',
  imports: [NgClass],
  templateUrl: './calendar.page.html',
  styleUrl: './calendar.page.scss',
})
export class CalendarPage {
  public currentMonth = () => new Date().getMonth();
  public currentYear = () => new Date().getFullYear();
  public displayedMonth;
  public displayedYear;
  public currentDay = () => new Date().getDate();
  public monthDays = () => this.getDaysInMonth(this.displayedMonth, this.displayedYear)
  public firstDayOfMonth = () => new Date(this.displayedYear, this.displayedMonth, 1).getDay()
  public dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  public monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  constructor() {
    this.displayedMonth = this.currentMonth()
    this.displayedYear = this.currentYear()
  }

  getDaysInMonth(month: number, year: number) {
    var date = new Date(year, month, 1);
    var days = [];
    for (let i = 1; i < this.firstDayOfMonth(); i++) {
      days.push(null)

    }
    while (date.getMonth() === month) {
      days.push(new Date(date).getDate());
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  prev() {
    if (this.displayedMonth >= 1) { this.displayedMonth = this.displayedMonth - 1 }
    else { this.displayedMonth = 11; this.displayedYear = this.displayedYear - 1 }
  }

  next() {
    if (this.displayedMonth <= 10) { this.displayedMonth = this.displayedMonth + 1 }
    else { this.displayedMonth = 0; this.displayedYear = this.displayedYear + 1 }
  }

  vacanciesService = inject(VacanciesService)
  vacanciesDateDistribution = this.vacanciesService.$listValue().map(v => { return { createdAt: v.createdAt } }).reduce(
    (acc, curr) => {
      let date = new Date(curr.createdAt)
      let key = date.toISOString().split('T')[0];
      (acc as any)[key] ? (acc as any)[key] = (acc as any)[key] + 1 : (acc as any)[key] = 1;
      return acc
    }, {}
  )
  getVacancyCount(day: string | number | null) {

    let month = `${this.displayedMonth + 1}`;
    if (!day) { return; }
    if (day.toString().length == 1) { day = `0${day}` }
    if (month.toString().length == 1) { month = `0${month}` }
    let count = (this.vacanciesDateDistribution as any)[`${this.displayedYear}-${month}-${day}`]
    if (count) {
      return count > 1 ? `${count} vacancies` : `${count} vacancy`
    } else { return null }
    return count
  }
}
