import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from "./app.component";
import {TaskListComponent} from "./todo/components/task-list.component";
import {AboutComponent} from "./about/components/about.component";
import {TaskComponent} from "./todo/components/task.component";
import {StaffListComponent} from "./staff/components/staff-list.component";

import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {UIRouterModule} from "@uirouter/angular";
import {uiRouterConfigFn} from "./app.routerconfig";

let tasksState = { name: 'tasks', url: '/tasks',  component: TaskListComponent }; 
let aboutState = { name: 'about', url: '/about',  component: AboutComponent };
let staffState = { name: 'staff', url: '/staff',  component: StaffListComponent };

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        UIRouterModule.forRoot({ states: [ tasksState, aboutState, staffState ], 
                                 config: uiRouterConfigFn, 
                                 useHash: true })
    ],
    declarations: [
        AppComponent,
        TaskComponent,
        TaskListComponent,
        AboutComponent,
        StaffListComponent,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}