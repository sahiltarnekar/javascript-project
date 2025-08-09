setInterval(() => {
  const expiryInput = document.getElementById("expiry").value;
  const output = document.getElementById("output");

  if (!expiryInput) {
    document.querySelector("#output").innerHTML =
      "Please select a valid expiry date.";
    return;
  }

  const expiryDate = new Date(expiryInput);
  const currentDate = new Date();

  const diff = expiryDate - currentDate;

  if (diff <= 0) {
    document.querySelector("#output").innerHTML =
      "The expiry date has already passed.";
    return;
  }

  let seconds = Math.floor((diff / 1000) % 60);
  let minutes = Math.floor((diff / 1000 / 60) % 60);
  let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));

  days = days < 10 ? `0${days}` : days;
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  document.querySelector("#result").innerHTML = `Time left:
  ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}, 1000);