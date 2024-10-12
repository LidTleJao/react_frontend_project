import axios from "axios";

const HOST: string = "http://localhost:3000/hoteldeals";

export class HotelDealsService {
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
      price: price,
      s_datetime: s_datetime,
      e_datetime: e_datetime,
    };

    const response = await axios.post(url, body);
    return response;
  }
}
