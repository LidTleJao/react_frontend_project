import axios from "axios";

const HOST: string = "https://node-backend-project-tnxp.onrender.com/deals";
// const HOST: string = "http://localhost:3000/deals";

export class DealsService {
  async AddDeal(hotel_deal_ID: string, concert_deal_ID: string) {
    const url = `${HOST}/addDeals/${hotel_deal_ID}/${concert_deal_ID}`;

    const body = {
      status_ID: 2,
    };

    const response = await axios.post(url, body);
    return response;
  }
}
