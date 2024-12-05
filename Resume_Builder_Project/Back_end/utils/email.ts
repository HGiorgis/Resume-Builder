import { createTransport, Transporter, SendMailOptions } from "nodemailer";
import { renderFile } from "ejs";
import path from "path";
import { htmlToText } from "html-to-text";

// __dirname is available in CommonJS
interface User {
  email: string;
  name: string;
}

class Email {
  to: string;
  name: string;
  url: string;
  from: string;

  constructor(user: User, url: string) {
    this.to = user.email;
    this.name = user.name;
    this.url = url;
    this.from = `quiz web app <${process.env.EMAIL_FROM}>`;
  }

  newTransport(): Transporter {
    return createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template: string, subject: string): Promise<void> {
    const templatePath = path.resolve(
      __dirname,
      `./../templates/${template}.ejs`
    );

    const emailHtml = await renderFile(templatePath, {
      name: this.name,
      url: this.url,
    });

    const mailOptions: SendMailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html: emailHtml,
      text: htmlToText(emailHtml),
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome(): Promise<void> {
    await this.send("Welcome", "Welcome to the Resume Builder");
  }

  async forgotPassword(): Promise<void> {
    await this.send("forgotPassword", "The link is available for 10 minutes");
  }

  async passwordResetConfirmation(): Promise<void> {
    await this.send("passwordResetConfirmation", "Password Reset Confirmation");
  }
  async reactivateAccount(): Promise<void> {
    await this.send("reactivateAccount", "Reactive Account");
  }
}

export default Email;
