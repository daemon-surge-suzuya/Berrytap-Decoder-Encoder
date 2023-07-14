function encode() {
  var message = document.getElementById("message").value;
  var algorithm = document.getElementById("algorithm").value;
  var encodedMessage = "";

  switch (algorithm) {
    case "base64":
      encodedMessage = btoa(message);
      break;

    case "rot13":
      encodedMessage = rot13(message);
      break;

    case "binary":
      encodedMessage = toBinary(message);
      break;

    case "berrytap":
      var key = parseInt(document.getElementById("key").value) || 0;
      encodedMessage = berrytapEncode(message, key);
      break;
  }

  document.getElementById("output").textContent = encodedMessage;
}

function decode() {
  var message = document.getElementById("message").value;
  var algorithm = document.getElementById("algorithm").value;
  var decodedMessage = "";

  switch (algorithm) {
    case "base64":
      decodedMessage = atob(message);
      break;

    case "rot13":
      decodedMessage = rot13(message);
      break;

    case "binary":
      decodedMessage = fromBinary(message);
      break;

    case "berrytap":
      var key = parseInt(document.getElementById("key").value) || 0;
      decodedMessage = berrytapDecode(message, key);
      break;
  }

  document.getElementById("output").textContent = decodedMessage;
}

function berrytapEncode(str, key) {
  var encodedMessage = "";
  for (var i = 0; i < str.length; i++) {
    encodedMessage += String.fromCharCode(str.charCodeAt(i) ^ key);
  }
  return encodedMessage;
}

function berrytapDecode(str, key) {
  return berrytapEncode(str, key);
}

function rot13(str) {
  var input = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var output = "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm";
  var index = (x) => input.indexOf(x);
  var translate = (x) => (index(x) > -1 ? output[index(x)] : x);
  return str.split("").map(translate).join("");
}

function toBinary(str) {
  return str
    .split("")
    .map(function (char) {
      return char.charCodeAt(0).toString(2);
    })
    .join(" ");
}

function fromBinary(str) {
  return str
    .split(" ")
    .map(function (bin) {
      return String.fromCharCode(parseInt(bin, 2));
    })
    .join("");
}

function copyOutput() {
  var output = document.getElementById("output");
  var tempInput = document.createElement("textarea");
  tempInput.value = output.textContent;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  alert("Copied to clipboard!");
}

document.getElementById("algorithm").addEventListener("change", function () {
  var algorithm = this.value;
  var keyContainer = document.getElementById("key-container");
  if (algorithm === "berrytap") {
    keyContainer.style.display = "block";
  } else {
    keyContainer.style.display = "none";
  }
});
