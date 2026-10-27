$('.ui.dropdown').dropdown();

$(".ui.sidebar").sidebar();

$(".ui.calendar").calendar();

$("#pinfomodal").modal("attach events", "#pinfolink", "show");

$("#secsettmodal").modal("attach events", ".secsettlink", "show");

$(".coupled.modal").modal({
  allowMultiple: false,
});
// Recent transactions pagination (client-side)
(function () {
  var PAGE_SIZE = 10;
  var items = document.querySelectorAll(".txn-item");
  var total = items.length;
  var pages = Math.ceil(total / PAGE_SIZE);
  var current = 1;
  var prevBtn = document.getElementById("txn-prev");
  var nextBtn = document.getElementById("txn-next");
  var info = document.getElementById("txn-page-info");
  var pagesContainer = document.getElementById("txn-pages");

  function render() {
    var start = (current - 1) * PAGE_SIZE;
    var end = Math.min(start + PAGE_SIZE, total);
    for (var i = 0; i < items.length; i++) {
      items[i].style.display = i >= start && i < end ? "" : "none";
    }
    if (prevBtn) {
      prevBtn.className = "icon item" + (current === 1 ? " disabled" : "");
    }
    if (nextBtn) {
      nextBtn.className = "icon item" + (current === pages ? " disabled" : "");
    }
    if (info) {
      info.textContent = "Showing " + (start + 1) + "\u2013" + end + " of " + total + " transactions";
    }
    if (pagesContainer) {
      pagesContainer.innerHTML = "";
      for (var p = 1; p <= pages; p++) {
        var a = document.createElement("a");
        a.className = "item" + (p === current ? " active" : "");
        a.href = "#";
        a.textContent = p;
        (function (page) {
          a.addEventListener("click", function (e) {
            e.preventDefault();
            current = page;
            render();
          });
        })(p);
        pagesContainer.appendChild(a);
      }
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (current > 1) {
        current--;
        render();
      }
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (current < pages) {
        current++;
        render();
      }
    });
  }
  if (items.length) {
    render();
  }
})();
// attach events to buttons
$("#dlmodal").modal("attach events", "#benfmodal .button");
// show first after link click
$("#benfmodal").modal("attach events", "#benflink", "show");

$("#obankmodal").modal("attach events", "#obankbtnweb", "show");
$("#obankmodal").modal("attach events", "#obankbtnmob", "show");
$("#obankmodal").modal("attach events", "#obankbtntab", "show");

document.getElementById("loginButton").addEventListener("click", function () {
  var username = document.getElementById("uname").value;
  var password = document.getElementById("pword").value;

  if (username === "kenart4382" && password === "Sixteen@2024") {
    document.getElementById("loader").style.display = "block";
    setTimeout(function () {
      window.location.href = "dashboard.html";
    }, 5000);
  } else {
    $(".ui.form")
      .form({
        fields: {
          uname: {
            identifier: "uname",
            rules: [
              {
                type: "empty",
                prompt: "Please enter your username",
              },
            ],
          },
          pword: {
            identifier: "pword",
            rules: [
              {
                type: "empty",
                prompt: "Please enter your password",
              },
            ],
          },
        },
      })
      .form("add errors", [
        "The username or password is invalid. Please try again or contact your branch adminstrator for support.",
      ]);
  }
});
