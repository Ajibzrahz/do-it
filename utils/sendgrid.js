import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async ({to, from, subject, text, html}) => {
  try {
    const msg = {
      to, // Change to your recipient
      from, // Change to your verified sender
      subject,
      text,
      html,
    };
    const response = await sgMail.send(msg);
    return response;
  } catch (error) {
    throw error;
  }
};

export default sendMail;
