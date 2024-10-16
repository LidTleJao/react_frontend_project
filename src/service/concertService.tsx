import axios from "axios";

const HOST: string = "https://node-backend-project-tnxp.onrender.com/concert";
// const HOST: string = "http://localhost:3000/concert";

export class ConcertService {
  async getAll() {
    const url = `${HOST}/allConcert`;
    const response = await axios.get(url);
    return response;
  }

  async getConcert(cid: string) {
    const url = `${HOST}/${cid}`;
    const response = await axios.get(url);
    return response;
  }

  async getConcertByUid(uid: string) {
    const url = `${HOST}/concertByUser/${uid}`;
    const response = await axios.get(url);
    return response;
  }

  async getConcertChannel(cid: string) {
    const url = `${HOST}/concertChannel/${cid}`;
    const response = await axios.get(url);
    return response;
  }

  async getConcertShow(cid: string) {
    const url = `${HOST}/concertShow/${cid}`;
    const response = await axios.get(url);
    return response;
  }

  async getConcertTicket(cid: string) {
    const url = `${HOST}/concertTicket/${cid}`;
    const response = await axios.get(url);
    return response;
  }

  async AddConcert(
    uid: string,
    concert_type_ID: number,
    poster_concert: File,
    performance_chart: File,
    show_schedule_concert: string,
    name_concert: string,
    lineup: string,
    address_concert: string,
    province: string,
    detail_concert: string
  ) {
    const url = `${HOST}/addconcert/${uid}`;

    const formData = new FormData();
    formData.append("concert_type_ID", concert_type_ID.toString());
    formData.append("poster_concert", poster_concert);
    formData.append("performance_chart", performance_chart);
    formData.append("show_schedule_concert", show_schedule_concert);
    formData.append("name_concert", name_concert);
    formData.append("lineup", lineup);
    formData.append("address_concert", address_concert);
    formData.append("province", province);
    formData.append("detail_concert", detail_concert);

    try {
      // ส่งข้อมูลผ่าน axios
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error("Error Insert Data Concert:", error);
      throw error; // ขึ้นอยู่กับว่าคุณต้องการจัดการข้อผิดพลาดอย่างไร
    }
  }

  async updateConcert(
    cid: string,
    concert_type_ID: number,
    show_schedule_concert: string,
    lineup: string,
    address_concert: string,
    detail_concert: string
  ) {
    const url = `${HOST}/updateConcert/${cid}`;

    const payload = {
      concert_type_ID,
      show_schedule_concert,
      lineup,
      address_concert,
      detail_concert,
    };

    try {
      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      console.error("Error updating concert:", error);
      throw error;
    }
  }

  async updateConcertChannel(concert_ID: string, CCID: string, urlAdd: string) {
    const url = `${HOST}/updateConcertChannel/${concert_ID}`;

    const payload = {
      CCID: CCID,
      channel: urlAdd,
    };

    try {
      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      console.error("Error updating concertChannel:", error);
      throw error;
    }
  }

  async updateConcertShowtime(
    concert_ID: string,
    CSTID: string,
    show_concert: string,
    time_show_concert: string
  ) {
    const url = `${HOST}/updateConcertShow/${concert_ID}`;

    const body = {
      CSTID: CSTID,
      show_concert: show_concert,
      time_show_concert: time_show_concert,
    };

    try {
      const response = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      console.error("Error updating concertShowTime:", error);
      throw error;
    }
  }

  async updateConcertTicket(
    CTID: string,
    concert_ID: string,
    type_ticket_ID: string,
    ticket_zone: string,
    price: string
  ) {
    const url = `${HOST}/updateConcertTicket/${concert_ID}`;

    const body = {
      CTID: CTID,
      type_ticket_ID: type_ticket_ID,
      ticket_zone: ticket_zone,
      price: price,
    };

    try {
      const response = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      console.error("Error updating concertTicket:", error);
      throw error;
    }
  }

  async AddConcertUrl(concert_ID: string, urlAdd: string) {
    const url = `${HOST}/addurl/${concert_ID}`;

    const body = {
      channel: urlAdd,
    };
    const response = await axios.post(url, body);
    return response;
  }

  async AddShowTime(
    concert_ID: string,
    show_concert: string,
    time_show_concert: string
  ) {
    const url = `${HOST}/addshowtime/${concert_ID}`;

    const body = {
      show_concert: show_concert,
      time_show_concert: time_show_concert,
    };
    const response = await axios.post(url, body);
    return response;
  }

  async AddTicket(
    concert_ID: string,
    show_ID: number,
    type_ticket_ID: number,
    ticket_zone: string,
    price: string
  ) {
    const url = `${HOST}/addticket/${concert_ID}`;

    const body = {
      show_ID: show_ID,
      type_ticket_ID: type_ticket_ID,
      ticket_zone: ticket_zone,
      price: Number(price),
    };
    const response = await axios.post(url, body);
    return response;
  }
}
