import nodemailer from "nodemailer";

import { config } from "@Domain/config";


export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: config.SMTP_HOST,
        pass: config.SMTP_SECRET_KEY,
    },
});
