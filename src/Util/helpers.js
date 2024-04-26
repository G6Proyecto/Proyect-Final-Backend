

function validateTitle(title) {
  if (title.trim().length >= 4 && title.trim().length <= 50) {
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

function validateDateStock(dateStock) {
  const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
  return regexFecha.test(dateStock) && dateStock > "2024-04-16";
}
module.exports = {
  validateTitle,
  validateCategory,
  validatePrice,
  validateDescription,
  validateDateStock,
  validateUrl,
};