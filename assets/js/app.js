function contrast(r, g, b) {
  return ((299 * r) + (587 * g) + (114 * b)) / 1000;
}

function generate() {
  $(".row").empty();
  for (var i = 0; i < 6; i++) {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    var color = r.toString().concat(", ", g, ", ", b);
    var contrastResult = contrast(r, g, b);
    var finalColor = (contrastResult < 123) ? "white" : "black";
    $(".row").append("<div class='col-md-2' style='background-color: rgb(" + color + ");color: " + finalColor + "' onclick='copy(" + color + ")'><p class='color-text'>" + color + "</p></div>");
  }
}

function copy(r, g, b) {
  var $tempTextField = $("<input>");
  $("body").append($tempTextField);
  $tempTextField.val("rgb(" + r + ", " + g + ", " + b + ")").select(); // string that ends up on clipboard
  document.execCommand("copy");
  $tempTextField.remove();
}

function switchTheme() {
  var background = $("body").css("background-color");
  if (background == "rgb(0, 0, 0)") {
    $(".fa-moon").removeClass("far");
    $(".fa-moon").addClass("fas");
    $("body").css("background-color", "rgb(255,255,255)");
  } else {
    $(".fa-moon").removeClass("fas");
    $(".fa-moon").addClass("far");
    $("body").css("background-color", "rgb(0,0,0)");
  }
}
