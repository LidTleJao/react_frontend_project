import axios from "axios";

const HOST: string = "https://node-backend-project-tnxp.onrender.com/packet";
// const HOST: string = "http://localhost:3000/packet";

export class PacketService {
    async AddPacket(deals_ID: string){
        const url = `${HOST}/addPacket/${deals_ID}`;

        const response = await axios.post(url);
        return response;
    }
}