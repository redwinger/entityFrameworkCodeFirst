import { Component, OnInit } from '@angular/core';
import { ITrip } from '../../interfaces/ITrip';
import { ITripItem } from '../../interfaces/ITripItem';
import { TripService } from '../../../api/trip-service';


@Component({
    selector: 'trip-manager',
    templateUrl: './trip-manager.component.html',
    styleUrls: ['./trip-manager.component.css'],
})
export class TripManager implements OnInit {


    /* INPUT | OUTPUT */

    /* SERVICES */

    /* PRIVATE DATA */
    private _isLoading: boolean = false;
    private _trips: ITrip[] = [];
    private _tripItems: ITripItem[] = [];

    /* PRIVATE METHODS */

    /* VIEW DATA */
    currentMode: TripPlannerModes = TripPlannerModes.Select;
    selectedTrip: ITrip;

    /* METHODS */
    get tripName(): string {
        if (this.selectedTrip == null) {
            return "";
        }

        return this.selectedTrip.name;
    }

    set tripName(value: string) {
        if (this.selectedTrip == null) {
            this.selectedTrip = {
                id: -1,
                name: value,
                totalActivities: 0,
                totalCost: 0,

            }
            return;
        }
        this.selectedTrip.name = value;
    }

    getIsLoading(): boolean {
        return this._isLoading;
    }

    setMode(mode: TripPlannerModes): void {
        this.currentMode = mode;
    }


    /* HELPERS | GETTERS */
    getTrips(): ITrip[] {
        return this._trips;
    }

    getTripName(trip: ITrip): string {
        return trip.name;
    }

    getTotalActivites(trip: ITrip): number {
        return trip.totalActivities;
    }

    getTotalCost(trip: ITrip): number {
        return trip.totalCost;
    }

    getIsTripSelected(): boolean {
        return this.selectedTrip != null &&
            this.currentMode != TripPlannerModes.CreateTrip &&
            this.currentMode != TripPlannerModes.ConfirmDeleteTrip ? true : false;
    }

    getManager(): TripManager {
        return this;
    }

    getIsCurrentMode(mode: TripPlannerModes): boolean {
        return this.currentMode == mode ? true : false;
    }

    getTripItems(): ITripItem[] {
        return this._tripItems;
    }


    /* EVENTS */
    onSelectTrip(trip: ITrip): void {
        this._isLoading = true;
        this.selectedTrip = trip;
        this._api.getTripItems(trip.id).subscribe(response => {
            var data = response.json() as ITripItem[];

            this._tripItems = data;
            this._isLoading = false;
        })
    }

    onBeginCreateTrip(): void {
        this.currentMode = TripPlannerModes.CreateTrip;
    }

    onCancelCreateTrip(): void {
        this.currentMode = TripPlannerModes.Select;
        this.selectedTrip = null;
    }

    onCreateTrip(): void {
        this._isLoading = true;
        this._api.createTrip(this.selectedTrip).subscribe(response => {
            if (response.ok) {
                var data = response.json() as ITrip;

                this._trips.push(data);
                this.selectedTrip = data;
                this.currentMode = TripPlannerModes.Select;
                this._isLoading = false;
            }

        });
    }

    onEnableDelete(): void {
        if (this.currentMode != TripPlannerModes.DeleteTrip) {
            this.currentMode = TripPlannerModes.DeleteTrip;
        }
        else {
            this.currentMode = TripPlannerModes.Select;
        }
    }

    onBeginDeleteTrip(trip: ITrip): void {
        this.selectedTrip = trip;
        this.currentMode = TripPlannerModes.ConfirmDeleteTrip;
    }

    onConfirmDeleteTrip(): void {
        this._isLoading = true;
        this._api.deleteTrip(this.selectedTrip.id).subscribe(response => {
            if (response.ok) {
                var oldIndex = this._trips.findIndex(trip => trip.id == this.selectedTrip.id);
                this._trips.splice(oldIndex, 1);
                this.selectedTrip = null;
                this.currentMode = TripPlannerModes.DeleteTrip;
                this._isLoading = false;
            }

        });

        this.currentMode = TripPlannerModes.DeleteTrip;
    }

    onCancelDelete(): void {
        this.currentMode = TripPlannerModes.DeleteTrip;
    }


    /* INIT */
    constructor(private _api: TripService) { }

    ngOnInit() {
        this._isLoading = true;

        this._api.getTrips().subscribe(response => {

            var data = response.json() as ITrip[];
            this._trips = data;

            this._isLoading = false;

        });


    }
}

export enum TripPlannerModes {
    Unknown = 0,
    Select = 10,
    CreateTrip = 20,
    CreateItem = 21,
    DeleteTrip = 30,
    ConfirmDeleteTrip = 31,
    DeleteItem = 40,
    ConfirmDeleteItem = 41,
    EditItem = 50,
   

}
