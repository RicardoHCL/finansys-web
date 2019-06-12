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
  categories: Category[] = [];
  entries: Entry[] = [];

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
    this.categoryService.getAll().subscribe(categories => this.categories = categories);
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

  private setValues(entries: Entry[]) {
    this.entries = entries;
    this.calculateBalance();
    this.setChartData();
  }

  private calculateBalance() {
    let expenseTotal = 0;
    let reveneuTotal = 0;

    this.entries.forEach(entry => {
      if (entry.despesa) {
        expenseTotal += currencyFormatter.unformat(entry.valor, { code: 'BRL' })
      } else {
        reveneuTotal += currencyFormatter.unformat(entry.valor, { code: 'BRL' })
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

    this.categories.forEach(categoria => {
      const filteredEntries = this.entries.filter(
        entry => (entry.categoriaId == categoria.id) && (entry.despesa ==  isDespesa)
      );

      if (filteredEntries.length > 0) {
        const total = filteredEntries.reduce(
          (total, entry) => total + currencyFormatter.unformat(entry.valor, { code: 'BRL' }), 0
        )

        chartData.push({
          categoryName: categoria.nome,
          totalAmount: total
        })
      }
    });

    return {
      labels: chartData.map(item => item.categoryName),
      datasets: [{
        label: title,
        backgroundColor: color,
        data: chartData.map(item => item.valor)
      }]
    }

  }

}
