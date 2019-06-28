import {Component} from "@angular/core";
import {StaffMember} from "../models/staff-member";
import {OnInit} from "@angular/core";
import {StaffService} from "../services/staff-service";

@Component({
    selector: 'staff-list',
    templateUrl: './staff-list.html',
    providers: [StaffService]
})
export class StaffListComponent implements OnInit {

    staff:Array<StaffMember>;

    constructor(private staffService:StaffService) {
        
        this.staffService.getStaffMembers()
                           .subscribe(staff => 
                               this.staff = staff, 
                               err => {console.log(err);}
        );
    }

    ngOnInit() {
        console.log("Staff list component initialized.");
    }
}