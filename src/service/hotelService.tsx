import axios from "axios";

const HOST: string = "https://node-backend-project-tnxp.onrender.com/hotel";
// const HOST: string = "http://localhost:3000/hotel";

export class HotelService {
  async getAll() {
    const url = HOST + "/allHotel";
    const response = await axios.get(url);

    return response;
  }

  async getHotelByUid(uid: string) {
    const url = HOST + "/hotelByUser/" + uid;
    const response = await axios.get(url);
    return response;
  }

  async getShowHotelByHid(hid:  string){
    const  url = HOST + "/" + hid;
    const response = await axios.get(url);
    return response;
  }

  async getHotelUrlByHid(hid: string) {
    const url = HOST + "/hotelUrl/" + hid;
    const response = await axios.get(url);
    return  response;
  }
  
  async getHotelImageByHid(hid: string) {
    const url =  HOST + "/hotelImage/" + hid;
    const response = await axios.get(url);
    return response;
  }

  async updateHotel(
    hotel_ID: string,
    hotel_name: string,
    hotel_address: string,
    hotel_type_ID: string,
    hotel_detail: string,
  ){
    const url = `${HOST}/updateHotel/${hotel_ID}`;

    const body = {
      hotel_type_ID : hotel_type_ID,
      name: hotel_name,
      address: hotel_address,
      detail: hotel_detail,
    };

    try {
      const response = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      console.error("Error updating hotel:", error);
      throw error;
    }
  }

  async updateHotelChannel(
    hotel_ID: string,
    HCID: string,
    urlAdd: string,
  ){
    const link = `${HOST}/updateHotelChannel/${hotel_ID}`;

    const payload = {
      HCID: HCID,
      url: urlAdd,
    };

    try {
      const response = await axios.post(link, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      console.error("Error updating hotelChannel:", error);
      throw error;
    }
  }

  // async updateRoom(
  //   HRID: number,
  //   hotel_ID: string,
  //   price: number,
  //   Number_of_guests: number,
  //   Number_of_rooms: number,
  //   room_type_ID: number,
  //   room_view_type_ID: number,
  //   room_status_ID: number,
  // ){
  //   const url = `${HOST}/updateRoom/${hotel_ID}`;

  //   const payload = {
  //     HRID: HRID,
  //   price: price,
  //   Number_of_guests: Number_of_guests,
  //   Number_of_rooms: Number_of_rooms,
  //   room_type_ID: room_type_ID,
  //   room_view_type_ID: room_view_type_ID,
  //   room_status_ID: room_status_ID,
  //   };

  //   try {
  //     const response = await axios.post(url, payload, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     return response;
  //   } catch (error) {
  //     console.error("Error updating hotelRoom:", error);
  //     throw error;
  //   }
  // }

  async AddHotel(
    uid: string,
    hotelType: number,
    hotelName: string,
    province: string,
    address: string,
    detail: string
  ) {
    const url = `${HOST}/addHotel/${uid}`;

    const body = {
      hotel_type_ID: hotelType,
      name: hotelName,
      province: province,
      address: address,
      detail: detail,
      latitude: 0,
      longtitude: 0,
    };
    const response = await axios.post(url, body);
    return response;
  }

  async AddHotelUrl(hid: string, urlAdd: string) {
    const url = `${HOST}/addurl/${hid}`;

    const body = {
      url: urlAdd,
    };

    const response = await axios.post(url, body);
    return response;
  }

  async AddHotelImage(hid: string, urlImageAdd: File) {
    const url = `${HOST}/addhotelimage/${hid}`;

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
