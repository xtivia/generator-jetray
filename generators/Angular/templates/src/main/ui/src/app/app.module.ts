import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from "./app.component";
import {TaskListComponent} from "./todo/components/task-list.component";
import {AboutComponent} from "./about/components/about.component";
import {TaskComponent} from "./todo/components/task.component";

//import {routing, appRoutingProviders} from './app.routing';
import {FormsModule} from "@angular/forms";
import {UIRouterModule} from "ui-router-ng2";
import {uiRouterConfigFn} from "./app.routerconfig";

let homeState  = { name: 'home',  url: '',       component: TaskListComponent }; 
let tasksState = { name: 'tasks', url: '/tasks',  component: TaskListComponent }; 
let aboutState = { name: 'about', url: '/about',  component: AboutComponent };

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        //routing
        UIRouterModule.forRoot({ states: [ homeState, tasksState, aboutState ], 
                                 config: uiRouterConfigFn, 
                                 useHash: true })
    ],
    declarations: [
        AppComponent,
        TaskComponent,
        TaskListComponent,
        AboutComponent
    ],
    providers: [
        //appRoutingProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}