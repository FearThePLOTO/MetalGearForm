const layout = document.querySelector(".layout");
const form = document.querySelector("form");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const firstName = document.getElementById("first-name");
const confirmHint = confirmPassword
  .closest(".field")
  .querySelector(".hint");
const confirmHintOriginal = confirmHint.textContent;
const transmission = document.getElementById("transmission");
const typedText = document.getElementById("typed-text");
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

function clearMatchError() {
  confirmPassword.setCustomValidity("");
  confirmHint.textContent = confirmHintOriginal;
}

password.addEventListener("input", clearMatchError);
confirmPassword.addEventListener("input", clearMatchError);

function playTransmission(message) {
  layout.hidden = true;
  transmission.hidden = false;
  if (reduceMotion) {
    typedText.textContent = message;
    return;
  }
  let i = 0;
  const timer = setInterval(() => {
    i += 1;
    typedText.textContent = message.slice(0, i);
    if (i >= message.length) {
      clearInterval(timer);
    }
  }, 28);
}

form.addEventListener("submit", (event) => {
  // Stay on the page: nothing is sent anywhere, so the URL never
  // exposes names, emails, or passwords.
  event.preventDefault();

  // Let the built-in HTML checks (required, type, pattern) run first.
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  if (password.value !== confirmPassword.value) {
    confirmPassword.setCustomValidity(
      "Passwords do not match. Retype them, Snake."
    );
    confirmHint.textContent = "Passwords do not match.";
    confirmPassword.reportValidity();
    return;
  }
  clearMatchError();

  const name = firstName.value.trim() || "Snake";
  playTransmission(
    `Thanks for applying, ${name}. ` +
      "Your codec frequency is 140.85. Stand by for deployment orders."
  );
});
