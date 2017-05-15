import { ElementRef } from '@angular/core';
import Chart from 'chart.js';

export class CreateGraph {

  public createLineGraph(incomingData: any, element: ElementRef, otherData: any) {
    const canvas = element.nativeElement.getContext('2d');
    const dailyData = this.extractDailyData(incomingData);
    const data = {
      labels: dailyData.dates,
      datasets: [
        {
          label: otherData.name,
          fill: otherData.value,
          lineTension: 0.1,
          backgroundColor: '#79E195',
          borderColor: '#79E195',
          pointBorderColor: '#79E195',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#79E195',
          pointHoverBorderColor: '#64AC78',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: dailyData.data,
        }
      ]
    };
    const LineChart = new Chart(canvas, {
      type: 'line',
      data: data,
    });
  }

  public createDoughnutGraph(income: number, expense: number, element: ElementRef) {
    const canvas = element.nativeElement.getContext('2d');
    const data = {
      labels: [
        'Income',
        'Expenses'
      ],
      datasets: [{
        'data': [income, expense],
        'backgroundColor': [
          '#52B7E9',
          '#46D863'
        ]
      }]
    };
    if (income === 0 && expense === 0) {  // If there is no expenses or incomes, change the data and colors
      data.datasets = [{
        'data': [1, 1],
        'backgroundColor': [
          '#86C4E4',
          '#8FD89E'
        ]
      }];
      const doughnut = new Chart( // Not a good looking solution
        canvas,
        {
          'type': 'doughnut',
          'data': data,
          'options': {
            'events': [],
            'cutoutPercentage': 50,
            'responsive': true,
            'animation': {
              'animateScale': true,
              'animateRotate': true
            }
          }
        }
      );
    } else {
      const doughnut = new Chart( // Not a good looking solution
        canvas,
        {
          'type': 'doughnut',
          'data': data,
          'options': {
            'cutoutPercentage': 50,
            'responsive': false,
            'animation': {
              'animateScale': true,
              'animateRotate': true
            }
          }
        }
      );
    }

  }


  private extractDailyData(incomingData: any) {
    let dailyData = {
      data: [],
      dates: []
    };
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    for (let j = 0; j < incomingData.length; j++) {
        dailyData.data[j] = Math.round(incomingData[j].data);
        dailyData.dates[j] = incomingData[j].date;
    }
    return dailyData;
  }

}
