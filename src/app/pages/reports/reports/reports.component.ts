import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Util } from 'src/app/shared/utils/util';
import currencyFormatter from "currency-formatter";
import { Entry } from '../../entries/classes/entry.model';
import { Category } from '../../categories/classes/category.model';
import { EntryService } from '../../entries/classes/entry.service';
import { CategoryService } from '../../categories/classes/category.service';
import { Calendar } from 'primeng/calendar';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  // Variables Global

  expenseTotal: any = 0;
  reveneuTotal: any = 0;
  balance: any = 0;

  expenseChartData: any;
  reveneuChartData: any;
  response: any[] = [];

  // Especific Methods (Public) 

  ptBr = Util.calendarPtBr();

  chartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }

  @ViewChild('initialDate') initialDate: Calendar;
  @ViewChild('finalDate') finalDate: Calendar;

  constructor(private entryService: EntryService, private categoryService: CategoryService) {

  }

  ngOnInit() {
    //this.categoryService.getAll().subscribe(categories => this.categories = categories);
  }

  generateReports() {
    const initialDate = this.initialDate.inputFieldValue;
    const finalDate = this.finalDate.inputFieldValue;

    if (!initialDate || !finalDate) {
      alert("Favor informar o período para gerar os relatórios!")
    } else {
      this.entryService.getReportsForPeriods(Util.formatDate(initialDate), Util.formatDate(finalDate)).subscribe(this.setValues.bind(this))
    }
  }

  // Especific Methods (Private)

  private setValues(response: any) {
    this.response = response;
    this.calculateBalance();
    this.setChartData();
  }

  private calculateBalance() {
    let expenseTotal = 0;
    let reveneuTotal = 0;

    this.response.forEach(resp => {
      if (resp.despesa) {
        expenseTotal += currencyFormatter.unformat(resp.valorPorCategoria, { code: 'BRL' })
      } else {
        reveneuTotal += currencyFormatter.unformat(resp.valorPorCategoria, { code: 'BRL' })
      }

    });

    this.expenseTotal = currencyFormatter.unformat(expenseTotal, { code: 'BRL' });
    this.reveneuTotal = currencyFormatter.unformat(reveneuTotal, { code: 'BRL' });
    this.balance = currencyFormatter.unformat(reveneuTotal - expenseTotal, { code: 'BRL' });
  }

  private setChartData() {
    this.reveneuChartData = this.getChartData('Gráfico de Receitas', '#9CCC65', false);
    this.expenseChartData = this.getChartData('Gráfico de Despesas', '#e03131', true);
  }

  private getChartData(title: string, color: string, isDespesa: boolean) {
    const chartData = [];

    const filteredEntries = this.response.filter(
      resp => resp.despesa == isDespesa
    );

    filteredEntries.forEach(resp => { 
        chartData.push({
          categoryName: resp.categoria.nome,
          totalAmount: resp.valorPorCategoria
        })
    });

    return {
      labels: chartData.map(item => item.categoryName),
      datasets: [{
        label: title,
        backgroundColor: color,
        data: chartData.map(item => item.totalAmount)
      }]
    }

  }

}
