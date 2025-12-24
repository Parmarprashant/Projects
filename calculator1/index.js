import { kmToMeter, kmToCm, kmToMiles } from "./convter.js";

document.querySelector(".btn").addEventListener("click", () => {
  const km = Number(document.querySelector("input").value);

  if (isNaN(km)) {
    alert("Please enter a valid KM value");
    return;
  }

  document.querySelector(".addKm").innerText = kmToMeter(km);
  document.querySelector(".addMiles").innerText = kmToMiles(km);
  document.querySelector(".addCen").innerText = kmToCm(km);
});
