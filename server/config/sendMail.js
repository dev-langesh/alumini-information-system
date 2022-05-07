const nodemailer = require("nodemailer");

async function sendMail(props) {
  console.log(props);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "alumini.info.srec",
      pass: `alumini@123`,
    },
  });

  try {
    transporter.sendMail(
      {
        from: "alumini.info.srec@gmail.com",
        to: props.email,
        subject: props.subject,
        html: `<a href=${props.link}>Click Here</a>`,
      },
      (err) => {
        if (err) console.log(err);
        else {
          console.log("email sent successfully");
          return;
        }
      }
    );
  } catch (err) {
    res.json({ error: "Invalid Credentials" });
    return;
  }
}

module.exports = { sendMail };
