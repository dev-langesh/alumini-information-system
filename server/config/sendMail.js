const nodemailer = require("nodemailer");
const { User } = require("../model/users.model");

async function sendMail(props) {
  const user = await User.findOne({ email: props.email });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "alumini.info.srec",
      pass: `alumini@123`,
    },
  });

  if (user) {
    try {
      transporter.sendMail(
        {
          from: "alumini.info.srec@gmail.com",
          to: props.email,
          subject: props.subject,
          html: `<a href="http://localhost:3000/verify-email/${user._id}">http://localhost:3000/verify-email/${user._id}</a>`,
        },
        (err, res) => {
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
  } else {
    console.log("user not found");
  }
}

module.exports = { sendMail };
