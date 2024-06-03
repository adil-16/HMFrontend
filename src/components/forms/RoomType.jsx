import React, { useEffect } from "react";

const RoomTypeForm = ({ rooms, setRooms }) => {
  useEffect(() => {
    // Set default values for rooms if they are empty on form open
    if (rooms.length === 0) {
      setRooms([{ roomType: "", roomNumber: "", totalBeds: "", beds: [{ bedNumber: "" }] }]);
    }
  }, [rooms, setRooms]);

  const handleRoomChange = (index, event) => {
    const { name, value } = event.target;
    const newRooms = [...rooms];
    newRooms[index][name] = value;
    setRooms(newRooms);
  };

  const handleBedChange = (roomIndex, bedIndex, event) => {
    const { name, value } = event.target;
    const newRooms = [...rooms];
    newRooms[roomIndex].beds[bedIndex][name] = value;
    setRooms(newRooms);
  };

  const addRoom = () => {
    setRooms([...rooms, { roomType: "", roomNumber: "", totalBeds: "", beds: [{ bedNumber: "" }] }]);
  };

  const removeRoom = (index) => {
    if (rooms.length > 1) {
      const newRooms = [...rooms];
      newRooms.splice(index, 1);
      setRooms(newRooms);
    }
  };
  

  const addBed = (roomIndex) => {
    const newRooms = [...rooms];
    if (!newRooms[roomIndex].beds) {
      newRooms[roomIndex].beds = [{ bedNumber: "" }];
    } else {
      newRooms[roomIndex].beds.push({ bedNumber: "" });
    }
    setRooms(newRooms);
  };

  const removeBed = (roomIndex, bedIndex) => {
    const newRooms = [...rooms];
    newRooms[roomIndex].beds.splice(bedIndex, 1);
    setRooms(newRooms);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(rooms);
  };

  return (
    <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
      <form onSubmit={handleSubmit}>
        {rooms.map((room, roomIndex) => (
          <div key={roomIndex} className="mb-4">
            <div className="flex gap-x-1 mt-2">
              <input
                type="text"
                className={`border border-blue3 bg-white text-black focus:outline-none rounded-md p-1 sm:p-2 px-2 w-full font-Nunitoo placeholder-blue2 text-14 placeholder-text-14`}
                placeholder="Room Type"
                name="roomType"
                value={room.roomType}
                onChange={(e) => handleRoomChange(roomIndex, e)}
              />
              <input
                type="text"
                placeholder="Room Number"
                className={`border border-blue3 bg-white text-black focus:outline-none rounded-md p-1 sm:p-2 px-2 w-full font-Nunitoo placeholder-blue2 text-14 placeholder-text-14`}
                name="roomNumber"
                value={room.roomNumber}
                onChange={(e) => handleRoomChange(roomIndex, e)}
              />
              <input
                type="number"
                placeholder="Total Beds"
                className={`border border-blue3 bg-white text-black focus:outline-none rounded-md p-1 sm:p-2 px-2 w-full font-Nunitoo placeholder-blue2 text-14 placeholder-text-14`}
                name="totalBeds"
                value={room.totalBeds}
                onChange={(e) => handleRoomChange(roomIndex, e)}
              />
              <div
                onClick={() => removeRoom(roomIndex)}
                className="flex items-center justify-center h-6 w-6 rounded-full text-white cursor-pointer bg-red-500"
              >
                -
              </div>
            </div>
            <div className="mt-2">
              {room.beds?.map((bed, bedIndex) => (
                <div key={bedIndex} className="flex gap-x-1 mt-1">
                  <input
                    type="text"
                    className={`border border-blue3 text-black bg-white focus:outline-none rounded-md p-1 sm:p-2 px-2 w-full font-Nunitoo placeholder-blue2 text-14 placeholder-text-14`}
                    placeholder="Bed Number"
                    name="bedNumber"
                    value={bed.bedNumber}
                    onChange={(e) => handleBedChange(roomIndex, bedIndex, e)}
                  />
                  <div
                    onClick={() => removeBed(roomIndex, bedIndex)}
                    className="flex items-center justify-center h-6 w-6 rounded-full text-white cursor-pointer bg-red-500"
                  >
                    -
                  </div>
                </div>
              ))}
              <div
                onClick={() => addBed(roomIndex)}
                className="flex items-center justify-center bg-orange h-6 w-24 rounded-lg text-white cursor-pointer mt-2"
              >
                + Add Bed
              </div>
            </div>
          </div>
        ))}
        <div
          onClick={addRoom}
          className="flex items-center justify-center bg-orange h-6 w-24 rounded-lg text-white cursor-pointer mt-2"
        >
          + Add Room
        </div>
      </form>
    </div>
  );
};

export default RoomTypeForm;
