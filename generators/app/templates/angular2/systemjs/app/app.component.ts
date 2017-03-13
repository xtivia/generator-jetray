import {Component, OnInit} from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "app",
    templateUrl: "./app.html"
})
export class AppComponent implements OnInit {
    ngOnInit() {
        console.log("Application component initialized ...");
    }
}