import {Component, OnInit} from "@angular/core";

@Component({
    selector: "app",
    templateUrl: "./app.html"
})
export class AppComponent implements OnInit {
    ngOnInit() {
        console.log("Angular application component has been started ...");
    }
}