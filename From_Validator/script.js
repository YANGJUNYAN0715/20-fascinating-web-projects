const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

function isValidEmail(email) {
  const re = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return re.test(String(email).toLowerCase());
}

function isValidPassword(password) {
  const re =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[`~!@#$%^&*()_+<>?:"{},.\/\\;'[\]])[A-Za-z\d`~!@#$%^&*()_+<>?:"{},.\/\\;'[\]]{8,}$/;
  return re.test(String(password).toLowerCase());
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (username.value === "") {
    showError(username, `${getFieldName(username)} is required`);
  } else {
    showSuccess(username);
  }

  if (email.value === "") {
    showError(email, `${getFieldName(email)} is required`);
  } else if (!isValidEmail(email.value)) {
    showError(email, `${getFieldName(email)} is invalid`);
  } else {
    showSuccess(email);
  }

  checkLength(username, 3, 15);

  if (password.value === "") {
    showError(password, "Password is required");
  } else if (!isValidPassword(password.value)) {
    showError(password, "Password is invalid");
  } else {
    checkLength(password, 6, 25);
    showSuccess(password);
  }

  if (password2.value === "") {
    showError(password2, "Password2 is required");
  } else if (!isValidPassword(password.value)) {
    showError(password2, "Password2 is invalid");
  } else if (password.value !== password2.value) {
    showError(password2, "Two passwords are not the same");
  } else {
    showSuccess(password2);
  }
});
