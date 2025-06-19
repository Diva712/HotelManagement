sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.ingenx.hotelmanagement.controller.HotelManagement", {
        onInit() {
        },

        onPressAddRoom: function (){
            this.getOwnerComponent().getRouter().navTo("RouteRoomRecords");
        },

        onPressAddBooking: function () {
            this.getOwnerComponent().getRouter().navTo("RouteBookingRecords");
        }
    });
});