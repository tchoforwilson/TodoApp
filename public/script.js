const input = document.querySelector("input");
console.log(input);
if (input.value !== "") {
  var btn = document.querySelector(".btn-add");
  btn.style.border = "7px outset";
  btn.style.borderColor = "slategrey";
}
