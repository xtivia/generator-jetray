import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {StaffMember} from '../models/staff-member';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class StaffService {

     // private instance variable to hold base url
     private staffUrl = "http://jsonplaceholder.typicode.com/users"; 

     // Resolve HTTP using the constructor
     constructor (private http: Http) {}

     // Fetch all existing staff
     getStaffMembers(): Observable<StaffMember[]> {
         return this.http.get(this.staffUrl)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(
                         	error.json().error || 'Server error'));
     }

}