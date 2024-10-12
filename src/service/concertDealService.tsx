import axios from "axios";

const HOST: string = "http://localhost:3000/concertdeals";

export class ConcertDealsService {
  async AddHotelDealData(
    ticket_ID: string,
    number_of_tickets: string,
    price: string,
    s_datetime: string,
    e_datetime: string
  ) {
    const url = `${HOST}/appConcertDeal/${ticket_ID}`;

    const body = {
        status_ID: 1,
        number_of_tickets: number_of_tickets,
        price: price,
        s_datetime: s_datetime,
        e_datetime:e_datetime,
    };
    
    const response = await axios.post(url, body);
    return response;
  }
}
