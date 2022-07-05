/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// window.addEventListener("load", function () {
//   removeLoader();
// });

// -------NOT NEEDED ANY MORE --------------

// function markSideNav(e) {
//   navElements.forEach((el) => {
//     el.classList.remove("active");
//     // el.style.backgroundColor = "rgb(196, 255, 255)";
//   });
//   if (e.target.id == "caru-image") {
//     galleryNav.classList.add("active");
//     // galleryNav.style.removeProperty("background-color");
//   } else if (e.target.text != "") {
//     e.target.closest("a").classList.add("active");
//     // e.target.closest("a").style.removeProperty("background-color");
//   } else {
//     e.target.classList.add("active");
//     // e.target.style.removeProperty("background-color");
//   }
// }

// ------------------ HOMEPAGE CONTENT-------------------------

// -------------SEND MESSAGE------------

// Get today date and time
let today = new Date();
const dd = String(today.getDate()).padStart(2, "0");
const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
const yyyy = today.getFullYear();
let hour = today.getHours();
let minutes = today.getMinutes();
// let minutes = "9";
const nada = 0;
if (minutes < 10) {
  minutes = "0" + minutes;
}
if (hour < 10) {
  hour = "0" + hour;
}
time.value = hour + ":" + minutes;
today = yyyy + "-" + mm + "-" + dd;
date.value = today;

function sendMessageHandler(e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const sender = document.getElementById("sender").value;
  const message = document.getElementById("message").value;
  const messageObj = { title, sender, message };
  document.getElementById("title").value = "";
  document.getElementById("sender").value = "";
  document.getElementById("message").value = "";
  axios.post(BASE_URL + "/message", messageObj).then((res) => {});
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

// -------------STATS------------

function callStats() {
  axios.get(statsUrl).then((res) => {
    // removeLoader();
    displayStats(res);
  });
}

function renderStatsHandler(e) {
  callStats();
  //   showLoader(); // loader.style.visibility = "";
  main.innerHTML = stats;
  // const loader = document.getElementById("loader");
}

// -------------Milstones------------

function renderMilstones(e) {
  main.innerHTML = milestones;
}

// -------------Gallery------------

// function renderGalleryHandler_org(e) {
//   // loader.style.display = "block";
//   main.addEventListener("click", imageFullScreen);
//   markSideNav(e);
//   main.innerHTML = "";
//   const divEl = document.createElement("div");
//   divEl.classList.add("row", "row-cols-1", "row-cols-md-6", "g-3");
//   divEl.style = "margin-right: 0px";
//   // Loop here below
//   let images1 = [];
//   axios.get(BASE_URL + "/gallery").then((res) => {
//     for (let i = 0; i < res.data.length; i++) {
//       const div = document.createElement("div");
//       div.innerHTML = `</div> <div class="col">
// 		<div class="">
// 		  <img src="/Resources/${res.data[i].path}" class="img-fluid rounded card-img-top" alt="..." loading="lazy" />
// 		</div>
// 		</div>`;
//       divEl.append(div);
//     }
//   });
//   const fullDiv = document.createElement("div");
//   const fullImg = document.createElement("img");
//   fullImg.id = "full-screen-img";
//   fullDiv.id = "full-screen-div";
//   fullDiv.append(fullImg);
//   // End loop
//   main.classList.add("container");
//   main.append(divEl);
//   main.append(fullDiv);
// }

function renderGalleryHandler(e) {
  // loader.style.display = "block";
  main.addEventListener("click", imageFullScreen);
  main.innerHTML = "";
  const divEl = document.createElement("div");
  divEl.classList.add(
    "row",
    "row-cols-1",
    "row-cols-md-4",
    "row-cols-lg-6",
    "g-3"
  );
  // divEl.style = "margin-right: 0px";
  // Loop here below
  axios.get(BASE_URL + "/gallery").then((res) => {
    for (let i = 0; i < res.data.length; i++) {
      const div = document.createElement("div");
      div.innerHTML = `</div> <div class="col">
		<div class="">
		  <img src="${BASE_URL}/images/${res.data[i].path}" class=" img-fluid rounded" id="cardImgTop" alt="..." loading="lazy" />
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
  main.classList.remove("container-sm");
  main.classList.add("container-fluid", "pt-3");
  main.append(divEl);
  main.append(fullDiv);
}

function imageFullScreen(e) {
  if (e.target.id != "cardImgTop") {
    return;
  } else {
    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("img01");
    modal.style.display = "block";
    modalImg.src = e.target.src;
    // Get the <span> element that closes the modal
    const container = document.querySelector(".container-fluid");

    document
      .getElementById("myModal")
      .addEventListener("click", removeFullscreen);
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

function removeFullscreen(e) {
  if (!e) {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
  } else {
    if (e.target.classList == "modal-content") {
      return;
    } else {
      const modal = document.getElementById("myModal");
      modal.style.display = "none";
    }
  }
}

// -------------Health------------

function renderHealth(e) {
  main.innerHTML = healthPage;
}

// -------------NEWS------------

function getNews(e) {
  axios.get(BASE_URL + "/feed").then((res) => {
    let reversedArr = res.data.reverse();
    news.textContent = reversedArr[0].content;
  });
}

// -------------SHOW LOADER------------

// function showLoader() {
//   loader.style.display = "block";
// }

// function removeLoader() {
//   loader.style.display = "none";
// }

const sideNavDiv = document.getElementById("sideNavDiv");
galleryNav.addEventListener("click", renderGalleryHandler);
statsNav.addEventListener("click", renderStatsHandler);
milestonesNav.addEventListener("click", renderMilstones);
healthNav.addEventListener("click", renderHealth);
sendMessageBtn.addEventListener("click", sendMessageHandler);
carousel.addEventListener("click", renderGalleryHandler);
span.addEventListener("click", removeFullscreen);
news.addEventListener("click", renderHealth);
getNews();
