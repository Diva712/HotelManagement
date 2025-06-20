sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/Fragment",
  "sap/ui/model/json/JSONModel"
], (BaseController, Fragment, JSONModel) => {
  "use strict";

  return BaseController.extend("com.ingenx.hotelmanagement.controller.roomRecords", {
    onInit() {
      //creating empty model
      let roomObject = {
        type: "",
        status: "",
        pricePerNight: null,
        floor: null,
        description: ""
      }
      //Creating the model for storing the frontend data
      let roomModel = new JSONModel(roomObject);
      this.getView().setModel(roomModel, "roomRecord"); //model , alias

    },

    onPressAddRoom: async function () {
      let oDialog = this.getView().byId("IdHMAddRoom");
      if (!oDialog) {
        oDialog = await Fragment.load({
          id: this.getView().getId(),
          name: "com.ingenx.hotelmanagement.fragments.popupAddRoom",
          controller: this.getView().getController()
        });
        this.getView().addDependent(oDialog);
      }
      //for opening the dialog
      oDialog.open();
    },

    onPressClose: function () {
      let oDialog = this.getView().byId("IdHMAddRoom");
      if (oDialog) {
        oDialog.close();
      }
      return;
    },


    onPressSubmit: async function () {
      debugger
      // This is the way to get the component from fragment by usng Id
      // for value use getValue , for text use getValue , for selectedKey use getSelectedKey

      // let Type = sap.ui.core.Fragment.byId("IdHMAddRoom", "IdHMInputType").getSelectedKey();
      // let Status  = sap.ui.core.Fragment.byId("IdHMAddRoom", "IdHMInputType").getSelectedKey();
      // console.log("Type :" , Type);
      // console.log("Status :" , Status);
      try {

        //Get the data from the frontend
        let roomData = this.getView().getModel("roomRecord").getData();
        console.log("Room Data :", roomData);

        console.log("Type of price per night: ", typeof roomData.pricePerNight);
        console.log("Type of floor: ", typeof roomData.floor);

        // Parse string fields into correct numeric types
        roomData.pricePerNight = parseFloat(roomData.pricePerNight);
        roomData.floor = parseInt(roomData.floor, 10);

        console.log("Type of price per night: ", typeof roomData.pricePerNight);
        console.log("Type of floor: ", typeof roomData.floor);


        //now sending the frontend data to backend
        //Step 1: Get the global Odata path
        //Step 2: Now do binding with corresponding Entity , if skip == true then backend 
        // se jo bhi data return ayega POST request ke time , wo return ni hoga
        let mainModel = this.getOwnerComponent().getModel();
        console.log("mainModel : ", mainModel);
        let oBinding = mainModel.bindList("/Rooms");
        console.log("oBinding : " , oBinding);
        await oBinding.create(roomData);

        //To referesh current Page ,because we want better user exp
        this.getView().getModel().refresh();


      } catch (error) {
        throw error;
      }

    }
  });
});