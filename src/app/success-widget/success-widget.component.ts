import {Component, Input, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {TaskStats} from '../task-stats';

@Component({
  selector: 'app-success-widget',
  templateUrl: './success-widget.component.html',
  styleUrls: ['./success-widget.component.css']
})
export class SuccessWidgetComponent implements OnInit {

  constructor() {
  }

  chart: any;
  data: any;

  @Input() taskStats: TaskStats;

  ngOnInit(): void {
    setTimeout(() => this.createChart(), 0);
  }

  createChart() {
    this.data = {
      datasets: [{
        data: [
          this.taskStats.numberOfSuccess,
          this.taskStats.numberOfFailure
        ],
        backgroundColor: [
          '#4CAF50',
          '#ff1133',
        ],
        borderColor: ['#454341', '#454341']
      }],

      labels: [
        'Success',
        'Failure'
      ]
    };
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: this.data,
      options: {
        legend: {
          display: true,
          position: 'bottom'
        },
        layout: {
          padding: {
            top: 50,
            bottom: 50,
            left: 0,
            right: 0,
          }
        }
      }
    });
  }
}
