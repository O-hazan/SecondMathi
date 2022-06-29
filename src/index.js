/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// window.addEventListener("load", function () {
//   removeLoader();
// });

function markSideNav(e) {
  navElements.forEach((el) => {
    el.classList.remove("active");
    el.style.backgroundColor = "rgb(196, 255, 255)";
  });
  if (e.target.id == "caru-image") {
    gallaryNav.classList.add("active");
    gallaryNav.style.removeProperty("background-color");
  } else if (e.target.text != "") {
    e.target.closest("a").classList.add("active");
    e.target.closest("a").style.removeProperty("background-color");
  } else {
    e.target.classList.add("active");
    e.target.style.removeProperty("background-color");
  }
}

function callStats() {
  axios.get(statsUrl).then((res) => {
    // removeLoader();
    displayStats(res);
  });
}

function renderStatsHandler(e) {
  // console.log(e.target.classList[4]);
  // const script = document.createElement("script");
  // script.src = "/src/components/stats.js";
  // document.documentElement.firstChild.appendChild(script);
  callStats();
  //   showLoader(); // loader.style.visibility = "";
  main.innerHTML = stats;
  markSideNav(e);
  // const loader = document.getElementById("loader");
}

// function showLoader() {
//   loader.style.display = "block";
// }

// function removeLoader() {
//   loader.style.display = "none";
// }

function sendStatsHandler(e) {
  e.preventDefault();
  const age = document.getElementById("age").value;
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;
  const statsObj = {
    age: +age,
    weight: +weight,
    hight: +height,
  };
  axios.post(statsUrl, statsObj);
  displayStats(statsObj);
}

function renderMilstones(e) {
  main.innerHTML = milestones;
  markSideNav(e);
}

function renderGallaryHandler_org(e) {
  // loader.style.display = "block";
  // main.innerHTML = gallary;
  // const images = main.querySelectorAll("img");
  // main.classList.add("gallary");
  main.addEventListener("click", imageFullScreen);
  markSideNav(e);
  main.innerHTML = "";
  const divEl = document.createElement("div");
  divEl.classList.add("row", "row-cols-1", "row-cols-md-6", "g-3");
  divEl.style = "margin-right: 0px";
  // Loop here below
  let images1 = [];
  axios.get(BASE_URL + "/gallery").then((res) => {
    for (let i = 0; i < res.data.length; i++) {
      const div = document.createElement("div");
      div.innerHTML = `</div> <div class="col">
		<div class="">
		  <img src="/Resources/${res.data[i].path}" class="card-img-top" alt="..." loading="lazy" />
		</div>
		</div>`;
      divEl.append(div);
    }
  });
  const fullDiv = document.createElement("div");
  const fullImg = document.createElement("img");
  fullImg.id = "full-screen-img";
  fullDiv.id = "full-screen-div";
  fullDiv.append(fullImg);
  // End loop
  main.append(divEl);
  main.append(fullDiv);
}

function renderGallaryHandler(e) {
  // loader.style.display = "block";
  // main.innerHTML = gallary;
  // const images = main.querySelectorAll("img");
  // main.classList.add("gallary");
  main.addEventListener("click", imageFullScreen);
  markSideNav(e);
  main.innerHTML = "";
  const divEl = document.createElement("div");
  divEl.classList.add("row", "row-cols-1", "row-cols-md-6", "g-3");
  divEl.style = "margin-right: 0px";
  // Loop here below
  let images1 = [];
  axios.get(BASE_URL + "/gallery").then((res) => {
    for (let i = 0; i < res.data.length; i++) {
      const div = document.createElement("div");
      div.innerHTML = `</div> <div class="col">
		<div class="">
		  <img src="https://fastapionly.herokuapp.com/images/${res.data[i].path}" class="card-img-top" alt="..." loading="lazy" />
		</div>
		</div>`;
      divEl.append(div);
    }
  });
  const fullDiv = document.createElement("div");
  const fullImg = document.createElement("img");
  fullImg.id = "full-screen-img";
  fullDiv.id = "full-screen-div";
  fullDiv.append(fullImg);
  // End loop
  main.append(divEl);
  main.append(fullDiv);
}

function imageFullScreen(e) {
  if (!e.target.src || e.target.classList != "card-img-top") {
    return;
  } else {
    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("img01");
    modal.style.display = "block";
    modalImg.src = e.target.src;
    // Get the <span> element that closes the modal
    const container = document.querySelector(".container-fluid");

    container.addEventListener("click", removeFullscreen);
    // e.target.classList.add("full-screen");
    // fullDiv.classList.add("full-screen");
    // fullDivImg.src = e.target.src;
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        removeFullscreen();
      }
    });
  }
}

function removeFullscreen(params) {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}

const newsText = `<div><h1>Health</h1></div>`;
function renderHealth(e) {
  markSideNav(e);
  main.innerHTML = newsText;
}

function sendMessageHandler(e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const sender = document.getElementById("sender").value;
  const message = document.getElementById("message").value;
  const messageObj = { title, sender, message };
  document.getElementById("title").value = "";
  document.getElementById("sender").value = "";
  document.getElementById("message").value = "";
  axios.post(BASE_URL + "/message", messageObj).then((res) => {
  });
  const toastLiveExample = document.getElementById("liveToast");
  const toast = new bootstrap.Toast(toastLiveExample);
  const toastBody = document.querySelector(".toast-body");
  toastBody.textContent = `Your message has been sent!`;
  const state = document.querySelector(".state");
  state.textContent = `Thanks ${sender}!`;
  toast.show();
  sendMessageBtn.setAttribute("disabled", true);
}

function isEmptyMessage(params) {
  const title = document.getElementById("title");
  const sender = document.getElementById("sender");
  const message = document.getElementById("message");
  if (title.value != "" && sender.value != "" && message.value != "") {
    sendMessageBtn.removeAttribute("disabled");
  } else {
    sendMessageBtn.setAttribute("disabled", true);
  }
}

const sideNavDiv = document.getElementById("sideNavDiv");
gallaryNav.addEventListener("click", renderGallaryHandler);
statsNav.addEventListener("click", renderStatsHandler);
milestonesNav.addEventListener("click", renderMilstones);
healthNav.addEventListener("click", renderHealth);
sendMessageBtn.addEventListener("click", sendMessageHandler);
carousel.addEventListener("click", renderGallaryHandler);
span.addEventListener("click", removeFullscreen);
news.addEventListener("click", renderHealth);

// load news

function getNews(e) {
  axios.get(BASE_URL + "/feed").then((res) => {
    let reversedArr = res.data.reverse();
    news.textContent = reversedArr[0].content;
  });
}
getNews();
// news.textContent =
//   "Mathi is recovering from mouth hands feet disease 😩, though he seems to feel much better!🤗🥳";
