"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TripManager = /** @class */ (function () {
    /* INIT */
    function TripManager(_api) {
        this._api = _api;
        /* INPUT | OUTPUT */
        /* SERVICES */
        /* PRIVATE DATA */
        this._trips = [];
        this._tripItems = [];
        /* PRIVATE METHODS */
        /* VIEW DATA */
        this.currentMode = TripPlannerModes.Select;
    }
    /* METHODS */
    TripManager.prototype.setMode = function (mode) {
        this.currentMode = mode;
    };
    /* HELPERS | GETTERS */
    TripManager.prototype.getTrips = function () {
        return this._trips;
    };
    TripManager.prototype.getTripName = function (trip) {
        return trip.name;
    };
    TripManager.prototype.getTotalActivites = function (trip) {
        console.log(trip);
        return trip.totalActivities;
    };
    TripManager.prototype.getTotalCost = function (trip) {
        return trip.totalCost;
    };
    TripManager.prototype.getIsTripSelected = function () {
        return this.selectedTrip != null ? true : false;
    };
    TripManager.prototype.getManager = function () {
        return this;
    };
    TripManager.prototype.getIsCurrentMode = function (mode) {
        return this.currentMode == mode ? true : false;
    };
    TripManager.prototype.getTripItems = function () {
        return this._tripItems;
    };
    /* EVENTS */
    TripManager.prototype.onSelectTrip = function (trip) {
        var _this = this;
        this.selectedTrip = trip;
        this._api.getTripItems(trip.id).subscribe(function (response) {
            var data = response.json();
            _this._tripItems = data;
        });
    };
    TripManager.prototype.onCreateTrip = function () {
        this.currentMode = TripPlannerModes.CreateTrip;
    };
    TripManager.prototype.onEnableDelete = function () {
        if (this.currentMode != TripPlannerModes.DeleteTrip) {
            this.currentMode = TripPlannerModes.DeleteTrip;
        }
        else {
            this.currentMode = TripPlannerModes.Select;
        }
    };
    TripManager.prototype.onBeginDeleteTrip = function (trip) {
        this.selectedTrip = trip;
        this.currentMode = TripPlannerModes.ConfirmDeleteTrip;
    };
    TripManager.prototype.onConfirmDeleteTrip = function () {
        this._api.deleteTrip(this.selectedTrip.id);
        this.currentMode = TripPlannerModes.DeleteTrip;
    };
    TripManager.prototype.onCancelDelete = function () {
        this.currentMode = TripPlannerModes.DeleteTrip;
    };
    TripManager.prototype.onTest = function () {
    };
    TripManager.prototype.ngOnInit = function () {
        var _this = this;
        this._api.getTrips().subscribe(function (response) {
            var data = response.json();
            _this._trips = data;
            console.log(_this._trips);
        });
    };
    TripManager = __decorate([
        core_1.Component({
            selector: 'trip-manager',
            templateUrl: './trip-manager.component.html',
            styleUrls: ['./trip-manager.component.css'],
        })
    ], TripManager);
    return TripManager;
}());
exports.TripManager = TripManager;
var TripPlannerModes;
(function (TripPlannerModes) {
    TripPlannerModes[TripPlannerModes["Unknown"] = 0] = "Unknown";
    TripPlannerModes[TripPlannerModes["Select"] = 10] = "Select";
    TripPlannerModes[TripPlannerModes["CreateTrip"] = 20] = "CreateTrip";
    TripPlannerModes[TripPlannerModes["CreateItem"] = 21] = "CreateItem";
    TripPlannerModes[TripPlannerModes["DeleteTrip"] = 30] = "DeleteTrip";
    TripPlannerModes[TripPlannerModes["ConfirmDeleteTrip"] = 31] = "ConfirmDeleteTrip";
    TripPlannerModes[TripPlannerModes["DeleteItem"] = 40] = "DeleteItem";
    TripPlannerModes[TripPlannerModes["ConfirmDeleteItem"] = 41] = "ConfirmDeleteItem";
    TripPlannerModes[TripPlannerModes["EditItem"] = 50] = "EditItem";
})(TripPlannerModes = exports.TripPlannerModes || (exports.TripPlannerModes = {}));
//# sourceMappingURL=trip-manager.component.js.map