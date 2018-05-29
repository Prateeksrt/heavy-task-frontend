import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {Chart} from 'chart.js';
import {TaskStats} from '../task-stats';
import {FAILURE, FAILURE_BORDER, SUCCESS, SUCCESS_BORDER} from '../../assets/colors';
import {OnChanges} from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-success-widget',
  templateUrl: './success-widget.component.html',
  styleUrls: ['./success-widget.component.css']
})
export class SuccessWidgetComponent implements OnInit, OnChanges {

  constructor() {
  }

  chart: any;

  @Input() taskStats: TaskStats;

  private static createOptions() {
    return {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          fontSize: 20,
          padding: 30
        }
      },
      layout: {
        padding: {
          top: 50,
          bottom: 50
        }
      }
    };
  }

  private static createData(taskStats) {
    return {
      datasets: [{
        data: [
          taskStats.numberOfSuccess,
          taskStats.numberOfFailure
        ],
        backgroundColor: [
          SUCCESS,
          FAILURE,
        ],
        borderColor: [SUCCESS_BORDER, FAILURE_BORDER]
      }],

      labels: [
        'Success',
        'Failure'
      ]
    };
  }

  private static isContentReady(taskStats) {
    return !!taskStats.numberOfSuccess
      || !!taskStats.numberOfFailure;
  }

  ngOnInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.taskStats.firstChange) {
      this.updateChart(changes.taskStats.currentValue);
    }
  }

  updateChart(newTaskStats: TaskStats) {
    if (!SuccessWidgetComponent.isContentReady(newTaskStats)) {
      this.chart.destroy();
      this.chart = null;
    } else {
      if (this.chart) {
        this.chart.data = SuccessWidgetComponent.createData(newTaskStats);
        this.chart.update();
      } else {
        this.taskStats = newTaskStats;
        this.createChart();
      }
    }
  }

  createChart() {
    if (!SuccessWidgetComponent.isContentReady(this.taskStats)) {
      this.chart = null;
      return;
    }

    const data = SuccessWidgetComponent.createData(this.taskStats);
    const options = SuccessWidgetComponent.createOptions();

    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: data,
      options: options
    });
  }
}
