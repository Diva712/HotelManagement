module.exports = async((srv) =>{

    //Create request
    srv.before('CREATE' , 'Rooms' , async(req)=>{
        try {

            let missing = validateRooms(req.data);
            if(missing == false){
                req.reject(missing.errors)
            }

            let getLastRoomRecord = await SELECT.from('Rooms', ['roomNumber']).orderBy('createdAt desc').limit(1);
            console.log("Last Room Record : " , getLastRoomRecord);
            if(getLastRoomRecord.length == 0){
                let newRoomNumber = 101;
                req.data.roomNumber = newRoomNumber;
            }
            else{
                let newGeneratedRoomNumber = getLastRoomRecord[0].roomNumber + 1;
                req.data.roomNumber = newGeneratedRoomNumber;
            }

        } catch (error) {
            req.reject(error);
        }
    })


    srv.on('CREATE' , 'Rooms' , async(req) =>{
        console.log("Request data in Create Request : " , req.data);

        let createdRoom = await INSERT.into('Rooms').entries(req.data);
        console.log("Created Rooms : " , createdRoom);
        return;
    })



    




    



//helper functions 
    function validateRooms(room){
        const errors = [];
    // Validate roomNumber
    if (!Number.isInteger(room.roomNumber) || room.roomNumber <= 0) {
        errors.push("roomNumber must be a positive integer.");
    }
    // Validate type
    const validTypes = ["Single", "Double", "Suite"];
    if (!validTypes.includes(room.type)) {
        errors.push(`type must be one of: ${validTypes.join(", ")}.`);
    }
    // Validate status
    const validStatuses = ["Available", "Booked", "Maintenance"];
    if (!validStatuses.includes(room.status)) {
        errors.push(`status must be one of: ${validStatuses.join(", ")}.`);
    }
    // Validate pricePerNight
    if (typeof room.pricePerNight !== 'number' || room.pricePerNight < 0) {
        errors.push("pricePerNight must be a non-negative number.");
    }
    // Validate floor
    if (!Number.isInteger(room.floor) || room.floor < 0) {
        errors.push("floor must be a non-negative integer.");
    }
    // Validate description
    if (typeof room.description !== 'string' || room.description.trim().length === 0) {
        errors.push("description must be a non-empty string.");
    }
    return {
        valid: errors.length ===0,
        errors
    }

    }


    
})