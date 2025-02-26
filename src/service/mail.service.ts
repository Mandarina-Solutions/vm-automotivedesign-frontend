import axios from "axios";
import { ArticuloUser } from "../models/ArticuloUser";

interface MailType {
    to: string;
    cartItems: Array<ArticuloUser>;
    total: number;
}

class MailService {
    async sendMail(to: string, cartItems: ArticuloUser[], total: number): Promise<MailType> {
        const payload: MailType = { to, cartItems, total };
        return (await axios.post<MailType>("http://localhost:8080/send", payload)).data;
    }
}

export const mailService = new MailService();
