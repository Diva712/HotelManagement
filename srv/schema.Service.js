const cds = require("@sap/cds");
const roomsHandler = require("./handlers/roomsHandler");

module.exports = cds.service.impl(async (srv)=>{
    await roomsHandler(srv);
})