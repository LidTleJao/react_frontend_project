import axios from "axios";

const HOST: string = "https://node-backend-project-tnxp.onrender.com/concertdeals";
// const HOST: string = "http://localhost:3000/concertdeals";

export class ConcertDealsService {

  async getAllConcertDeals(){
    const url = `${HOST}/allConcertDeal`;
    const response = await axios.get(url);
    return response;
  }

  async getConcertDealByUser(uid: string) {
    const url = `${HOST}/ConcertDealByUser/${uid}`;
    const response = await axios.get(url);
    return response;
  }

  async getConcertDealType1ByUser(uid: string) {
    const url = `${HOST}/ConcertDealType1ByUser/${uid}`;
    const response = await axios.get(url);
    return response;
  }

  async getConcertDealType2ByUser(uid: string) {
    const url = `${HOST}/ConcertDealType2ByUser/${uid}`;
    const response = await axios.get(url);
    return response;
  }

  async getConcertDealType3ByUser(uid: string) {
    const url = `${HOST}/ConcertDealType3ByUser/${uid}`;
    const response = await axios.get(url);
    return response;
  }

  async getConcertDealByCDID(cdid: string) {
    const url = `${HOST}/ConcertDealByCDID/${cdid}`;
    const response = await axios.get(url);
    return response;
  }

  async AddConcertDealData(
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
        concert_deal_price: price,
        s_datetime: s_datetime,
        e_datetime:e_datetime,
    };
    
    const response = await axios.post(url, body);
    return response;
  }
}
