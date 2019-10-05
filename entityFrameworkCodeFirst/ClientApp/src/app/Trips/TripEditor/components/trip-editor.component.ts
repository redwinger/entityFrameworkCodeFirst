import { Component, OnInit, Input } from "@angular/core";
import { TripManager, TripPlannerModes } from "../../TripManagement/components/trip-manager.component";
import { ITripItem } from "../../Interfaces/ITripItem";
import { TripService } from "../../../api/trip-service";
import { resolveDefinition } from "@angular/core/src/view/util";



@Component({
    selector: 'trip-editor',
    templateUrl: './trip-editor.component.html',
    styleUrls: ['./trip-editor.component.css']

})

export class TripEditor implements OnInit {

    /* INPUT | OUTPUT */
    @Input("manager") manager: TripManager;
    @Input("items") tripItems: ITripItem[];

    /* SERVICES */


    /* PRIVATE DATA */
    private _isLoading: boolean = false;

    /* PRIVATE METHODS */


    /* VIEW DATA */
    selectedItem: ITripItem;

    /* METHODS */


    /* HELPERS | GETTERS */
    getIsLoading(): boolean {
        return this._isLoading;
    }

    getIsCurrentMode(mode: TripPlannerModes): boolean {
        return this.manager.getIsCurrentMode(mode);
    }

    getIsCreateOrEdit(): boolean {
        if (this.manager.currentMode == TripPlannerModes.CreateItem || this.manager.currentMode == TripPlannerModes.EditItem) {
            return true;
        }
    }

    getTripItems(): ITripItem[] {
        return this.tripItems;
    }

    getIsTripSelected(): boolean {
        return this.manager.selectedTrip != null ? true : false;
    }

    getTripName(): string {
        if (this.getIsTripSelected()) {
            return this.manager.selectedTrip.name;
        }
    }

    getTripId(): number {
        return this.manager.selectedTrip.id;
    }

    getItemName(item: ITripItem): string {
        return item.name;
    }

    getItemNotes(item: ITripItem): string {
        return item.notes;
    }

    getItemAddress(item: ITripItem): string {
        return item.address;
    }

    getItemCost(item: ITripItem): number {
        return item.cost;
    }

    getItemLocalCost(item: ITripItem): number {
        return item.localCost;
    }

    getSelectedItemName(): string {
        if (this.selectedItem !=null) {
            return this.selectedItem.name;
        }
    }

    /* EVENTS */
    onBack(): void {
        this.manager.currentMode = TripPlannerModes.Select;
        this.manager.selectedTrip = null;
    }

    onAddressNav(address: string): void {
        window.open("https://www.google.com/maps/place/" + address);
    }

    onAddItem(): void {
        this.manager.currentMode = TripPlannerModes.CreateItem;
        this.selectedItem = {
            id: -1,
            tripId: this.getTripId(),
            name: "",
            address: "",
            notes: "",
            cost: 0,
            localCost: 0,
        }
    }

    onCreateItem(): void {
        this._isLoading = true;
        this._api.createTripItem(this.selectedItem).subscribe(response => {
            if (response.ok) {
                var data = response.json() as ITripItem;

                this.manager.selectedTrip.totalActivities++;
                this.manager.selectedTrip.totalCost = this.manager.selectedTrip.totalCost + this.selectedItem.cost;

                this.tripItems.push(data);
                this.selectedItem = null;
                this.manager.currentMode = TripPlannerModes.Select;
                this._isLoading = false;
            }
            else {
                this._isLoading = false;
            }
        })
    }

    onSelectItem(item: ITripItem): void {
        this.manager.currentMode = TripPlannerModes.EditItem;
        this.selectedItem = item;
    }

    onEnableDelete(): void {
        if (this.manager.currentMode != TripPlannerModes.DeleteItem) {
            this.manager.currentMode = TripPlannerModes.DeleteItem;
        }
        else {
            this.manager.currentMode = TripPlannerModes.Select;
        };
    }

    onBeginDeleteItem(item: ITripItem): void {
        this.manager.currentMode = TripPlannerModes.ConfirmDeleteItem;
        this.selectedItem = item;
    }

    onConfirmDeleteItem(): void {
        this._isLoading = true;
        this._api.deleteTripItem(this.selectedItem.id).subscribe(response => {
            if (response.ok) {
                var itemIndex = this.tripItems.findIndex(item => item.id == this.selectedItem.id);

                this.tripItems.splice(itemIndex, 1);

                this.manager.selectedTrip.totalActivities--;
                this.manager.selectedTrip.totalCost = this.manager.selectedTrip.totalCost - this.selectedItem.cost;

                this.selectedItem = null;
                this.manager.currentMode = TripPlannerModes.DeleteItem;
                this._isLoading = false;
            }

        })

    }

    onCancelDelete(): void {
        this.manager.currentMode = TripPlannerModes.DeleteItem;
    }

    onCancelChanges(): void {
        this.selectedItem = null;
        this.manager.currentMode = TripPlannerModes.Select;
    }

    onSaveChanges(): void {
        this._isLoading = true;
        this._api.editTripItem(this.selectedItem).subscribe(response => {
            if (response.ok) {
                var data = response.json() as ITripItem;
                var originalItemIndex = this.tripItems.findIndex(item => item.id == this.selectedItem.id);

                this.tripItems.splice(originalItemIndex, 1, data);

                this.manager.currentMode = TripPlannerModes.Select;
                this.selectedItem = null;

                this._isLoading = false;
            }

        })
    }
    /* INIT */

    constructor(private _api: TripService) { }

    ngOnInit() {
        
    }

}
