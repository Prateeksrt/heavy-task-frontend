import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskStats} from '../task-stats';

@Component({
  selector: 'app-info-widget',
  templateUrl: './info-widget.component.html',
  styleUrls: ['./info-widget.component.css']
})
export class InfoWidgetComponent implements OnInit {

  @Input() taskStats: TaskStats;
  @Output() refreshed = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  refresh() {
    this.refreshed.emit(true);
  }

}
