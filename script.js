const input = document.getElementById("phone");

function redirect(event) {
  event.preventDefault();

  const value = input.value.replace("+", "");
  input.value = "";

  window.open(
    this.app
      ? `https://api.whatsapp.com/send?phone=${value}`
      : `https://web.whatsapp.com/send?phone=${value}`
  );
}
document
  .getElementById("webSubmit")
  .addEventListener("click", redirect.bind({ app: false }));
document
  .getElementById("appSubmit")
  .addEventListener("click", redirect.bind({ app: true }));
