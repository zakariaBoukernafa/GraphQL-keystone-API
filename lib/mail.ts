import { createTransport, getTestMessageUrl } from 'nodemailer';
import { MailResponse } from '../interfaces/MailResponse';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function generateEmail(text: string): string {
  return `
    
     <div style="
     border:1px solid black;
     padding: 20px;
     font-family:sans-serif;
     line-height:2;
     font-size:20px;
     ">
     <h2>Hello!</h2>
     <p>${text}</p>
     </div>
    `;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  const info = (await transport.sendMail({
    to,
    from: process.env.WEBSITE_EMAIL,
    subject: 'Your Password reset Token!',
    html: generateEmail(`Your password reset token
    
    <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click here to reset</a>
    `),
  })) as MailResponse;
  console.log(info);
  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log(` Message sent! Preview it at ${getTestMessageUrl(info)}`);
  }
}
