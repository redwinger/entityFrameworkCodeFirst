"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var trip_manager_component_1 = require("../../TripManagement/components/trip-manager.component");
var TripEditor = /** @class */ (function () {
    /* INIT */
    function TripEditor(_api) {
        this._api = _api;
        /* SERVICES */
        /* PRIVATE DATA */
        this._isLoading = false;
    }
    /* METHODS */
    /* HELPERS | GETTERS */
    TripEditor.prototype.getIsCurrentMode = function (mode) {
        return this.manager.getIsCurrentMode(mode);
    };
    TripEditor.prototype.getTripItems = function () {
        return this.tripItems;
    };
    TripEditor.prototype.getIsTripSelected = function () {
        return this.manager.selectedTrip != null ? true : false;
    };
    TripEditor.prototype.getTripName = function () {
        if (this.getIsTripSelected()) {
            return this.manager.selectedTrip.name;
        }
    };
    TripEditor.prototype.getTripId = function () {
        return this.manager.selectedTrip.id;
    };
    TripEditor.prototype.getItemName = function (item) {
        return item.name;
    };
    TripEditor.prototype.getItemNotes = function (item) {
        return item.notes;
    };
    TripEditor.prototype.getItemAddress = function (item) {
        return item.address;
    };
    TripEditor.prototype.getItemCost = function (item) {
        return item.cost;
    };
    TripEditor.prototype.getItemLocalCost = function (item) {
        return item.localCost;
    };
    /* EVENTS */
    TripEditor.prototype.onBack = function () {
        this.manager.currentMode = trip_manager_component_1.TripPlannerModes.Select;
        this.manager.selectedTrip = null;
    };
    TripEditor.prototype.onAddItem = function () {
        this.manager.currentMode = trip_manager_component_1.TripPlannerModes.CreateItem;
        this.selectedItem = {
            id: -1,
            tripId: this.getTripId(),
            name: "",
            address: "",
            notes: "",
            cost: 0,
            localCost: 0,
        };
    };
    TripEditor.prototype.onCreateItem = function () {
        var _this = this;
        this._isLoading = true;
        this._api.createTripItem(this.selectedItem).subscribe(function (response) {
            if (response.ok) {
                var data = response.json();
                _this.tripItems.push(data);
                _this.selectedItem = null;
                _this.manager.currentMode = trip_manager_component_1.TripPlannerModes.Select;
                _this._isLoading = false;
            }
            else {
                _this._isLoading = false;
            }
        });
    };
    TripEditor.prototype.onSelectItem = function (item) {
        this.manager.currentMode = trip_manager_component_1.TripPlannerModes.EditItem;
        this.selectedItem = item;
    };
    TripEditor.prototype.onEnableDelete = function () {
        if (this.manager.currentMode != trip_manager_component_1.TripPlannerModes.DeleteItem) {
            this.manager.currentMode = trip_manager_component_1.TripPlannerModes.DeleteItem;
        }
        else {
            this.manager.currentMode = trip_manager_component_1.TripPlannerModes.Select;
        }
        ;
    };
    TripEditor.prototype.onBeginDeleteItem = function (item) {
        this.manager.currentMode = trip_manager_component_1.TripPlannerModes.ConfirmDeleteItem;
        this.selectedItem = item;
    };
    TripEditor.prototype.onCancelDelete = function () {
        this.manager.currentMode = trip_manager_component_1.TripPlannerModes.DeleteItem;
    };
    TripEditor.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input("manager")
    ], TripEditor.prototype, "manager", void 0);
    __decorate([
        core_1.Input("items")
    ], TripEditor.prototype, "tripItems", void 0);
    TripEditor = __decorate([
        core_1.Component({
            selector: 'trip-editor',
            templateUrl: './trip-editor.component.html',
            styleUrls: ['./trip-editor.component.css']
        })
    ], TripEditor);
    return TripEditor;
}());
exports.TripEditor = TripEditor;
//# sourceMappingURL=trip-editor.component.js.map