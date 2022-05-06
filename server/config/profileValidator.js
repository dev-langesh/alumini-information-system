const { validateEmail } = require("./validateEmail");

function profileValidator(props) {
  console.log(props);
  if (props.email) {
    if (!validateEmail(props.email)) {
      return false;
    }
  }

  if (props.phone) {
    if (!/^[6789]\d{9}$/g.test(props.phone)) {
      return false;
    }
  }

  if (props.name) {
    if (!/\w/g.test(props.name)) {
      return false;
    }
  }

  return true;
}

module.exports = { profileValidator };
