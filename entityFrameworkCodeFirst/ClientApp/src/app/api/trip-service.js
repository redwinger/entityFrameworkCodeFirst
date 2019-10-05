"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TripService = /** @class */ (function () {
    function TripService(http, baseUrl) {
        this.http = http;
        this.baseUrl = baseUrl;
        this._apiUrl = 'api/TripManagement/';
    }
    TripService.prototype.getTrips = function () {
        return this.http.get(this.baseUrl + this._apiUrl + "GetTrips");
    };
    TripService.prototype.createTrip = function (trip) {
        return this.http.post(this.baseUrl + this._apiUrl + "CreateTrip", trip);
    };
    TripService.prototype.editTrip = function (trip) {
        return this.http.patch(this.baseUrl + this._apiUrl + "EditTrip", trip);
    };
    TripService.prototype.deleteTrip = function (id) {
        return this.http.delete(this.baseUrl + this._apiUrl + "DeleteTrip?id=" + id);
    };
    TripService.prototype.getTripItems = function (id) {
        return this.http.get(this.baseUrl + this._apiUrl + "GetTripItems?id=" + id);
    };
    TripService.prototype.createTripItem = function (item) {
        return this.http.post(this.baseUrl + this._apiUrl + "CreateTripItem", item);
    };
    TripService.prototype.editTripItem = function (item) {
        return this.http.patch(this.baseUrl + this._apiUrl + "EditTripItem", item);
    };
    TripService.prototype.deleteTripItem = function (id) {
        return this.http.delete(this.baseUrl + this._apiUrl + "DeleteTripItem?id=" + id);
    };
    TripService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject('BASE_URL'))
    ], TripService);
    return TripService;
}());
exports.TripService = TripService;
//# sourceMappingURL=trip-service.js.map