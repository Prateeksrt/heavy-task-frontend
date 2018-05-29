import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {AVG_BORDER, AVG_CHART, BAR_BORDER, BAR_CHART} from '../../assets/colors';
import {Chart} from 'chart.js';
import {TaskStats} from '../task-stats';
import {OnChanges} from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
  selector: 'app-response-graph',
  templateUrl: './response-graph.component.html',
  styleUrls: ['./response-graph.component.css']
})
export class ResponseGraphComponent implements OnInit, OnChanges {

  chart: any;
  @Input() taskStats: TaskStats;

  constructor() {
  }

  ngOnInit() {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.taskStats.firstChange) {
      this.updateChart(changes.taskStats.currentValue);
    }
  }

  updateChart(newTaskStats: TaskStats) {
    if (!this.isContentReady(newTaskStats)) {
      this.chart.destroy();
      this.chart = null;
    } else {
      if (this.chart) {
        this.chart.data = this.createChartData(newTaskStats);
        this.chart.update();
      } else {
        this.taskStats = newTaskStats;
        this.createChart();
      }
    }
  }

  createChart() {
    if (!this.isContentReady(this.taskStats)) {
      this.chart = null;
      return;
    }
    const data = this.createChartData(this.taskStats);

    const options = {
      legend: {display: false},
      title: {
        display: true,
        text: 'Response time in seconds'
      },
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };

    this.chart = new Chart('canvas1', {
      type: 'bar',
      data: data,
      options: options
    });
  }

  private isContentReady(taskStats) {
    return taskStats && taskStats.lastTenResponse
      && taskStats.lastTenResponse.length !== 0;
  }

  private createChartData(taskStats) {
    const data1 = taskStats.lastTenResponse.map(a => a);
    const label = data1.map((res, index) => `${index + 1}`);
    const bgColors = data1.map(() => BAR_CHART);
    const borderColors = data1.map(() => BAR_BORDER);

    data1.push(taskStats.averageResponseTime);
    label.push('avg');
    bgColors.push(AVG_CHART);
    borderColors.push(AVG_BORDER);

    return {
      labels: label,
      datasets: [
        {
          label: 'Response time (seconds)',
          backgroundColor: bgColors,
          borderColor: borderColors,
          borderWidth: 2,
          data: data1,
        }
      ],
    };
  }
}
