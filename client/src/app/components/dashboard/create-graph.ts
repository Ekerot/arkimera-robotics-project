import { ElementRef } from '@angular/core';
import Chart from 'chart.js';
import {GraphRequest} from '../../_models/graphRequest';

export class CreateGraph {

  /*Method for creating the line graphs*/
  public createLineGraph(incomingData: GraphRequest[], element: ElementRef, otherData: any) {
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
          pointBackgroundColor: '#79E195',
          pointBorderWidth: 1,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: '79E195',
          pointHoverBorderColor: '#79E195',
          pointHoverBorderWidth: 2,
          pointRadius: 4,
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

  /*Method for creating the doughnut graph*/
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

  /*Extract the incoming data and put into arrays, easier to handle and chart.js cant handle decimals.
  * This method removes the decimals as well*/
  private extractDailyData(incomingData: GraphRequest[]) {
    const dailyData = {
      data: [],
      dates: []
    };
    for (let i = 0; i < incomingData.length; i++) {
      const date = incomingData[i].date;
      dailyData.data[i] = Math.round(incomingData[i].data);
      dailyData.dates[i] = incomingData[i].date;
    }
    return dailyData;
  }

}
