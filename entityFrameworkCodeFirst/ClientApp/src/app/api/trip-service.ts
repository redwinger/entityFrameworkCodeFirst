import { Injectable, Inject } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { ITrip } from "../Trips/Interfaces/ITrip";
import { ITripItem } from "../Trips/interfaces/ITripItem";



@Injectable()
export class TripService {

    private _apiUrl = 'api/TripManagement/';

    getTrips(): Observable<Response> {
        return this.http.get(this.baseUrl + this._apiUrl + "GetTrips");
    }

    createTrip(trip: ITrip): Observable<Response> {
        return this.http.post(this.baseUrl + this._apiUrl + "CreateTrip", trip);
    }

    editTrip(trip: ITrip): Observable<Response> {
        return this.http.patch(this.baseUrl + this._apiUrl + "EditTrip", trip);
    }

    deleteTrip(id: number): Observable<Response> {
        return this.http.delete(this.baseUrl + this._apiUrl + "DeleteTrip?id=" + id);
    }

    getTripItems(id: number): Observable<Response> {
        return this.http.get(this.baseUrl + this._apiUrl + "GetTripItems?id=" + id);
    }

    createTripItem(item: ITripItem): Observable<Response> {
        return this.http.post(this.baseUrl + this._apiUrl + "CreateTripItem", item);
    }

    editTripItem(item: ITripItem): Observable<Response> {
        return this.http.patch(this.baseUrl + this._apiUrl + "EditTripItem", item);
    }

    deleteTripItem(id: number): Observable<Response> {
        return this.http.delete(this.baseUrl + this._apiUrl + "DeleteTripItem?id=" + id);
    }


    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {}
}
