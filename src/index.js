function markSideNav(e) {
  const home = document.getElementById("home");
  navElements.forEach((el) => {
    el.classList.remove("active");
    el.style.backgroundColor = "rgb(196, 255, 255)";
  });
  if (e.target.text != "") {
    e.target.closest("a").classList.add("active");
    e.target.closest("a").style.removeProperty("background-color");
  } else {
    e.target.classList.add("active");
    e.target.style.removeProperty("background-color");
  }
}

// const response = [
//   {
//     id: 123,
//     age: 1,
//     weight: 10,
//     height: 50,
//   },
//   {
//     id: 456,
//     age: 3,
//     weight: 16,
//     height: 70,
//   },
// ];

function callStats(params) {
  axios.get(statsUrl).then((res) => {
    displayStats(res);
  });
}

function renderStats(e) {
  main.innerHTML = stats;
  markSideNav(e);
  callStats();
}

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

  console.log(statsObj);
  displayStats(statsObj);
  axios.post(statsUrl, statsObj);
  // send obj to api
}

function renderMilstones(e) {
  main.innerHTML = milestones;
  markSideNav(e);
}

function renderGallary(e) {
  main.innerHTML = gallary;
  markSideNav(e);
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
  console.log(popup);
  const toastLiveExample = document.getElementById("liveToast");
  const toast = new bootstrap.Toast(toastLiveExample);
  toast.show();
  const toastBody = document.querySelector(".toast-body");
  toastBody.textContent = `${sender}, your message has been sent!`;
  const state = document.querySelector(".state");
  state.textContent = "Server response";
  // send messageObj to API
}

statsNav.addEventListener("click", renderStats);
milestonesNav.addEventListener("click", renderMilstones);
gallaryNav.addEventListener("click", renderGallary);
health.addEventListener("click", renderHealth);
sendMessageBtn.addEventListener("click", sendMessageHandler);
carousel.addEventListener("click", renderGallary);
