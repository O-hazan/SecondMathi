const images = [
  {
    id: 1,
    path: "amit.jpg",
    desc: "amit",
  },
  {
    id: 2,
    path: "pregnancy/p-ball.jpg",
    desc: "Tanning pregnant",
  },
  {
    id: 3,
    path: "pregnancy/p-omer-pancha.jpg",
    desc: "Omer and Pancha expecting",
  },
  {
    id: 4,
    path: "pregnancy/p-park-tan.jpg",
    desc: "Tanning in the sun",
  },
  {
    id: 5,
    path: "pregnancy/p-mirror-together.jpg",
    desc: "mer and Pancha in the mirror",
  },
  {
    id: 6,
    path: "pregnancy/p-mirror-check.jpg",
    desc: "Pancha in mirrow",
  },
  {
    id: 7,
    path: "driving.jpg",
    desc: "Drive",
  },
  {
    id: 8,
    path: "bread.jpeg",
    desc: "Loves bread",
  },
  {
    id: 9,
    path: "sleep.jpg",
    desc: "sleeping",
  },
];

window.addEventListener("load", function (e) {
  removeLoader();
});

function markSideNav(e) {
  const home = document.getElementById("home");
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

function callStats(params) {
  axios.get(statsUrl).then((res) => {
    removeLoader();
    displayStats(res);
  });
}

function renderStatsHandler(e) {
  // console.log(e.target.classList[4]);
  // const script = document.createElement("script");
  // script.src = "/src/components/stats.js";
  // document.documentElement.firstChild.appendChild(script);
  callStats();
  showLoader(); // loader.style.visibility = "";
  main.innerHTML = stats;
  markSideNav(e);
  // const loader = document.getElementById("loader");
}

function showLoader(params) {
  loader.style.display = "block";
}

function removeLoader(params) {
  loader.style.display = "none";
}

function sendStatsHandler(e) {
  console.log("sendStatsHandler");
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
  for (let i = 0; i < images.length; i++) {
    const div = document.createElement("div");
    div.innerHTML = `</div> <div class="col">
    <div class="">
      <img src="/Resources/${images[i].path}" class="card-img-top" alt="..." loading="lazy" />
    </div>
    </div>`;
    divEl.append(div);
  }
  const fullDiv = document.createElement("div");
  const fullImg = document.createElement("img");
  fullImg.id = "full-screen-img";
  fullDiv.id = "full-screen-div";
  fullDiv.append(fullImg);
  // End loop
  main.append(divEl);
  main.append(fullDiv);
  console.log(main.lastChild.id);
}

function imageFullScreen(e) {
  const fullDiv = document.getElementById("full-screen-div");
  const fullDivImg = document.getElementById("full-screen-img");
  if (!e.target.src || e.target.classList != "card-img-top") {
    return;
  } else {
    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("img01");
    modal.style.display = "block";
    modalImg.src = e.target.src;
    console.log(span);
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

function renderHealth(e) {
  markSideNav(e);
}

function sendMessageHandler(e) {
  e.preventDefault();
  const title = document.getElementById("exampleFormControlInput1").value;
  const sender = document.getElementById("exampleFormControlInput2").value;
  const message = document.getElementById("exampleFormControlTextarea1").value;
  const messageObj = {
    title: title,
    sender: sender,
    message: message,
  };
  const popup = document.querySelector(".popup");
  const toastLiveExample = document.getElementById("liveToast");
  const toast = new bootstrap.Toast(toastLiveExample);
  toast.show();
  const toastBody = document.querySelector(".toast-body");
  toastBody.textContent = `${sender}, your message has been sent!`;
  const state = document.querySelector(".state");
  state.textContent = "Server response";
  // send messageObj to API
}

const sideNavDiv = document.getElementById("sideNavDiv");
gallaryNav.addEventListener("click", renderGallaryHandler);
statsNav.addEventListener("click", renderStatsHandler);
milestonesNav.addEventListener("click", renderMilstones);
healthNav.addEventListener("click", renderHealth);
sendMessageBtn.addEventListener("click", sendMessageHandler);
carousel.addEventListener("click", renderGallaryHandler);
span.addEventListener("click", removeFullscreen);
