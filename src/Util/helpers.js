const regexEmail=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const regexPassword=/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/

function ValidateEmail(candidateEmail) { 
    return regexEmail.test(candidateEmail)
};

function ValidatePassword(candidatePassword) {
    return regexPassword.test(candidatePassword)
};

function validateTitle(title) {
  if (title.trim().length >= 4 && title.trim().length <= 80) {
    return true;
  } else {
    return false;
  }
}

function validateCategory(category) {
  return category.trim().length !== 0 && category !== undefined;
}

function validatePrice(price) {
    return price >= 100;
  }

function validateDescription(description) {
  return description.trim().length >= 4 && description.trim().length <= 500;
}

function validateUrl(url) {
  const regexUrl = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  return regexUrl.test(url);
}

module.exports = {
  validateTitle,
  validateCategory,
  validatePrice,
  validateDescription,
  validateUrl,
  ValidateEmail,
  ValidatePassword,
};