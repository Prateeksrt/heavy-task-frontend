import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {TimeAgoPipe} from 'time-ago-pipe';


import {AppComponent} from './app.component';
import {SuccessWidgetComponent} from './success-widget/success-widget.component';
import {TaskService} from './task.service';
import {HttpClientModule} from '@angular/common/http';
import {ResponseGraphComponent} from './response-graph/response-graph.component';
import {InfoWidgetComponent} from './info-widget/info-widget.component';
import { ErrorPlaceHolderComponent } from './error-place-holder/error-place-holder.component';


@NgModule({
  declarations: [
    AppComponent,
    SuccessWidgetComponent,
    ResponseGraphComponent,
    InfoWidgetComponent,
    TimeAgoPipe,
    ErrorPlaceHolderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
