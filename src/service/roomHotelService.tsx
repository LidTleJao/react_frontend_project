import axios from "axios";

const HOST: string = "https://node-backend-project-tnxp.onrender.com/room";
// const HOST: string = "http://localhost:3000/room";

export class RoomHotelService {
  async getAll() {
    const url = `${HOST}/Allroom`;
    const response = await axios.get(url);
    return response;
  }

  async getRoomByHotelID(hrid: string) {
    const url = HOST + `/roomAllByHid/` + hrid;
    const response = await axios.get(url);
    return response;
  }

  async AddRoom(
    hid: string,
    Price: string,
    Number_of_guests: number,
    Number_of_rooms: string,
    room_type_ID: number,
    room_view_type_ID: number,
    room_status_ID: number
  ) {
    const url = `${HOST}/addRoom/${hid}`;

    const body = {
      price: Number(Price),
      Number_of_guests: Number_of_guests,
      Number_of_rooms: Number(Number_of_rooms),
      room_type_ID: room_type_ID,
      room_view_type_ID: room_view_type_ID,
      room_status_ID: room_status_ID,
    };
    const response = await axios.post(url, body);
    return response;
  }

  async AddRoomImage(hrid: string, urlImageAdd: File) {
    const url = `${HOST}/addroomimage/${hrid}`;

    const formData = new FormData();
    formData.append("file", urlImageAdd);

    try {
      // ส่งข้อมูลผ่าน axios
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error; // ขึ้นอยู่กับว่าคุณต้องการจัดการข้อผิดพลาดอย่างไร
    }
  }
}
