// let changeColor = document.getElementById("changeColor");
const user = "gro.lard@gmail.com";
let url;

window.onload = function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    url = tabs[0].url;
    $("#url").val(url);
  });

  // $("#url").change(function() {});

  $("#url").on("input", function(e) {
    console.log(e.target.value);
    url = e.target.value;
  });

  $.ajax({
    url: "http://163.172.83.78:80/service/videoTopic/get",
    type: "get",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZWJlYTYzZjQ4ZDUxMDQ5NTVhZTIzMyIsIm5hbWUiOiJCZW5qYW1pbiIsImlhdCI6MTU2MDA3MDU1NSwiZXhwIjoxNTYwMDc0MTU1fQ.iIltdx1PTGL4JUS0730FdFvVZrTaC6F4mEsecuOJDUE"
    },
    data: { user: user },
    success: function(code_html, statut) {},

    error: function(resultat, statut, erreur) {},
    complete: function(resultat, statut) {
      console.log(resultat.responseJSON);
      let options;
      $.map(resultat.responseJSON, function(val, i) {
        if (val.topic != "all") {
          options +=
            "<option value='" + val.topic + "'>" + val.topic + "</option>";
        }
      });
      $("#topic").append(options);
      // $("#UrlSender").after("<p>" + resultat.responseJSON.message + "</p>");
    }
  });
};

$(function() {
  $("#UrlSender").click(function() {
    const topics = $("#topic")
      .val()
      .concat(["all"]);

    console.log(topics);
    if (typeof topics == "string") {
      topics = [topics];
    }

    $.ajax({
      url: "http://163.172.83.78:80/service/video/add",
      type: "post",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZWJlYTYzZjQ4ZDUxMDQ5NTVhZTIzMyIsIm5hbWUiOiJCZW5qYW1pbiIsImlhdCI6MTU2MDA3MDU1NSwiZXhwIjoxNTYwMDc0MTU1fQ.iIltdx1PTGL4JUS0730FdFvVZrTaC6F4mEsecuOJDUE"
      },
      data: { user: user, videoUrl: url, topic: topics },
      success: function(code_html, statut) {},

      error: function(resultat, statut, erreur) {},
      complete: function(resultat, statut) {
        switch (resultat.responseJSON.message) {
          case "VideoNotOk":
            res =
              "<div class='alert alert-danger' role='alert'>Erreur Url</div>";
            break;
          case "VideoOk":
            res =
              '<div class="alert alert-success" role="alert">Video Enregistr\u00e9e</div>';
            break;
          case "VideoExist":
            res =
              '<div class="alert alert-warning" role="alert">Video Exist</div>';
            break;
          default:
            break;
        }
        console.log(resultat);
        $("#result").html(res);
      }
    });
  });
});
