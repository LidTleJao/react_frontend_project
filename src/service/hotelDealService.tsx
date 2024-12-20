import axios from "axios";

const HOST: string = "https://node-backend-project-tnxp.onrender.com/hoteldeals";
// const HOST: string = "http://localhost:3000/hoteldeals";

export class HotelDealsService {
  async getAllHotelDeals() {
    const url = `${HOST}/allHotelDeal`;
    const response = await axios.get(url);
    return response;
  }

  async getHotelDealByUser(uid: string) {
    const url = `${HOST}/HotelDealByUser/${uid}`;
    const response = await axios.get(url);
    return response;
  }

  async getHotelDealType1ByUser(uid: string) {
    const url = `${HOST}/HotelDealType1ByUser/${uid}`;
    const response = await axios.get(url);
    return response;
  }

  async getHotelDealType2ByUser(uid: string) {
    const url = `${HOST}/HotelDealType2ByUser/${uid}`;
    const response = await axios.get(url);
    return response;
  }

  async getHotelDealType3ByUser(uid: string) {
    const url = `${HOST}/HotelDealType3ByUser/${uid}`;
    const response = await axios.get(url);
    return response;
  }

  async getHotelDealByHDID(hdid: string) {
    const url = `${HOST}/HotelDealByHDID/${hdid}`;
    const response = await axios.get(url);
    return response;
  }
  

  async AddHotelDealData(
    room_ID: string,
    number_of_rooms: string,
    price: string,
    s_datetime: string,
    e_datetime: string
  ) {
    const url = `${HOST}/appHotelDeal/${room_ID}/${number_of_rooms}`;

    const body = {
      status_ID: 1,
      hotel_deal_price: price,
      s_datetime: s_datetime,
      e_datetime: e_datetime,
    };

    const response = await axios.post(url, body);
    return response;
  }
}
