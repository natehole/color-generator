function getRGB() {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return [r, g, b];
}

function getHex(rgb) {
  var hex = "";
  rgb.forEach(function(val) {
    var hexPartial = Number(val).toString(16);
    if (hexPartial.length < 2) {
      hexPartial = "0" + hexPartial;
    }
    hex = hex + hexPartial;
  });
  return hex;
}

function getCMYK(rgb) {
  var finalK = 0;

  var r = rgb[0];
  var g = rgb[1];
  var b = rgb[2];

  if (r === 0 && g === 0 && b === 0) {
    finalK = 1;
    return [0, 0, 0, 1];
  }

  var finalC = 1 - (r / 255);
  var finalM = 1 - (g / 255);
  var finalY = 1 - (b / 255);

  var minCMY = Math.min(finalC, Math.min(finalM, finalY));
  finalC = Math.trunc(((finalC - minCMY) / (1 - minCMY)) * 100);
  finalM = Math.trunc(((finalM - minCMY) / (1 - minCMY)) * 100);
  finalY = Math.trunc(((finalY - minCMY) / (1 - minCMY)) * 100);
  finalK = Math.trunc(minCMY * 100);

  return (finalC + "," + finalM + "," + finalY + "," + finalK);
}

function getContrast(rgb) {
  return ((299 * rgb[0]) + (587 * rgb[1]) + (114 * rgb[2])) / 1000;
}

function generate() {
  $(".color-column").each(function(index, column) {
    let rgb = getRGB();
    $(column).find(".color-rgb").text(`(${rgb})`);
    $(column).find(".color-hex").text("#" + getHex(rgb));
    $(column).find(".color-cmyk").text(`(${getCMYK(rgb)})`);
    $(column).css("background-color", `rgb(${rgb})`);
    if (getContrast(rgb) < 123) {
      $(column).addClass("text-white");
    } else {
      $(column).removeClass("text-white");
    }
  });
}

function switchTheme() {
  $("body").toggleClass("bg-secondary");
  $(".fa-moon").toggleClass("d-none");
  $(".fa-sun").toggleClass("d-none");
  $(".color-column-labels").toggleClass("text-white");
}

function copy(type, text) {
  var $tempTextField = $("<input>");
  $("body").append($tempTextField);
  switch (type) {
    case "rgb":
      $tempTextField.val("rgb" + text).select();
      break;
    case "hex":
      $tempTextField.val(text).select();
      break;
    case "cmyk":
      $tempTextField.val("cmyk" + text).select();
      break;
  }
  document.execCommand("copy");
  $tempTextField.remove();
}

$(".color-rgb").click(function(e) {
  var text = $(e.target).text();
  copy("rgb", text);
});

$(".color-hex").click(function(e) {
  var text = $(e.target).text();
  copy("hex", text);
});

$(".color-cmyk").click(function(e) {
  var text = $(e.target).text();
  copy("cmyk", text);
});