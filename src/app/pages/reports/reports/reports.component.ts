import { Component, ViewChild} from '@angular/core';

import { Calendar } from 'primeng/calendar';
import { Util } from 'src/app/shared/utils/util';
import currencyFormatter from "currency-formatter";
import { EntryService } from '../../entries/classes/entry.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {

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
          beginAtZero: true,
          callback: function(value, index, values) {
            return value > 1 || (values.length < 10) ? Util.formatRealWhitValueZero(value.toString()) : value;
        }
        }
      }],
      xAxes: [{
        categoryPercentage: 0.5,
        barPercentage: 0.5
    }]
    }
  }

  @ViewChild('initialDate') initialDate: Calendar;
  @ViewChild('finalDate') finalDate: Calendar;

  constructor(private entryService: EntryService) {

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
    
    this.expenseTotal = "R$ " + Util.formatReal(expenseTotal.toString());
    this.reveneuTotal = "R$ " + Util.formatReal(reveneuTotal.toString());
    this.balance = "R$ " + Util.formatReal((reveneuTotal - expenseTotal).toString());
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
          totalAmount:  resp.valorPorCategoria
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
