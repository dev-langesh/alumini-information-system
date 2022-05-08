const { validateEmail } = require("./validateEmail");

function profileValidator(props) {
  console.log(props.mail);
  console.log(validateEmail(props.email) + " email");
  if (props.email) {
    if (!validateEmail(props.email)) {
      return false;
    }
    return true;
  }

  if (props.phone) {
    if (/^[6789]\d{9}$/g.test(props.phone)) {
      return true;
    }
    return false;
  }

  if (props.name) {
    console.log(/^[a-zA-Z]/g.test(props.name));

    if (/^[a-zA-Z]/g.test(props.name)) {
      return true;
    }
    return false;
  }

  if (props.linkedin) {
    if (props.linkedin.startsWith("https://www.linkedin.com")) {
      return true;
    }
    return false;
  }

  return true;
}

module.exports = { profileValidator };
