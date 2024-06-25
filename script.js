const input = document.getElementById("phone");
const errorMessage = document.getElementById("error-message");

function redirect(event) {
  event.preventDefault();
  errorMessage.textContent = ""; // Clear any existing error message

  const phoneNumberText = input.value.trim();
  input.value = "";

  try {
    const phoneNumbers = libphonenumber.findPhoneNumbersInText(
      phoneNumberText,
      "IN"
    );
    if (phoneNumbers.length > 0) {
      const firstValidNumber = phoneNumbers[0].number.number.replace("+", ""); // Remove the '+' for WhatsApp format
      window.open(
        this.app
          ? `https://api.whatsapp.com/send?phone=${firstValidNumber}`
          : `https://web.whatsapp.com/send?phone=${firstValidNumber}`
      );
    } else {
      errorMessage.textContent =
        "No valid phone number found. Please enter a valid number with country code.";
    }
  } catch (error) {
    errorMessage.textContent =
      "Error parsing phone number. Please ensure the number is correct.";
  }
}

input.addEventListener("input", () => {
  errorMessage.textContent = ""; // Remove the error message when the user starts typing
});

document
  .getElementById("webSubmit")
  .addEventListener("click", redirect.bind({ app: false }));
document
  .getElementById("appSubmit")
  .addEventListener("click", redirect.bind({ app: true }));
