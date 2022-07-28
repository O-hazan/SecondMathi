let messageCount = 0;
const main = document.querySelector(".main");
const messagesNav = document.getElementById("messagesNav");
const newsNav = document.getElementById("newsNav");
const noMoreMessages = `<div class="pt-5 noMessage"><h1 class="noMessageH">No new messages</h1></div>`;
const galleryNav = document.getElementById("galleryNav");
// const BASE_URL = "https://fastapionly.herokuapp.com";
// const BASE_URL = "http://127.0.0.1:3000"; // Local serve

// Staging
const BASE_URL = "https://fastapi-docker-mathias.herokuapp.com";
// const BASE_URL = "http://127.0.0.1:8000"; // Local url
const stats = `<table
class="table table-hover mx-auto pt-4"
>
<thead>
  <tr>
    <th scope="col" class="col-2">Age</th>
    <th scope="col" class="col-2">Weight</th>
    <th scope="col" class="col-2">Height</th>
    <th scope="col"></th>
  </tr>
</thead>
<tbody>

  <form action="">
              <tr>
                <td><div class="row">
                  <div >
                  <input id="age" type="number" class="form-control" onkeyup="isEmpty()"   />
                </div></td>
                <td><div class="row">
                  <div >
                  <input id="weight" type="number" class="form-control" onkeyup="isEmpty()"  />
                </div></td>
                <td><div class="row">
                  <div >
                  <input id="height" type="number" class="form-control" onkeyup="isEmpty()" />
                </div></td>  <td><div class="row">
                  <div >
                    <input id="sendStats" class="btn btn-success cust-btn disabled" type="submit" value="Submit" >
                </div></td>
              </tr>
            </form>`;

const statsUrl = BASE_URL + "/stats";

function renderMessages(params) {
  main.innerHTML = "";
  axios.get(BASE_URL + "/message").then((res) => {
    let div = document.createElement("div");
    div.classList.add("contain");
    //   div.style='max-height: 20px;'
    if (res.data.length == 0) {
      main.innerHTML = noMoreMessages;
      main.classList.add("pt-5");
    }
    messageCount = 0;
    messageCount = res.data.length;
    for (let i = 0; i < res.data.length; i++) {
      let card = document.createElement("div");
      card.classList.add("card", "col-4");
      const titleCapitalized =
        res.data[i].title.charAt(0).toUpperCase() + res.data[i].title.slice(1);
      const senderCapitalized =
        res.data[i].sender.charAt(0).toUpperCase() +
        res.data[i].sender.slice(1);
      card.style = "width: 20rem";
      card.id = res.data[i].id;
      // Make res.data[i].title capital case
      card.innerHTML = `
          <div class="card-body">
          <h5 class="card-title title" id="title">${titleCapitalized}</h5>
          <h6 class="card-subtitle mb-2 text-muted">From ${senderCapitalized}</h6>
          <p class="card-text">${res.data[i].message}</p>
          <a href="#" class="card-link" id="deleteBtn">Delete</a>
          <a href="#" class="card-link">Reply</a>
          <a href="#" class="card-link">Archive</a>

        </div>
        <div class="card-footer text-muted">
            2 days ago
          </div>
      </div>`;
      div.append(card);
    }
    main.append(div);
    const deleteBtns = document.querySelectorAll("#deleteBtn");
    for (let i = 0; i < deleteBtns.length; i++) {
      deleteBtns[i].addEventListener("click", deleteMessages);
    }
    // deleteBtn.addEventListener("click", deleteMessages);
  });
}

function deleteMessages(e) {
  const messageId = e.target.closest("div").closest(".card").id;
  const message = e.target.closest("div").closest(".card");
  const deleteObj = { data: { id: messageId } };
  const el = document.getElementById(messageId);
  el.remove();
  axios.delete(`${BASE_URL}/message/${messageId}`, deleteObj).then((res) => {
    if (res.status == 200) {
      messageCount--;
    }
    if (messageCount == 0) {
      main.innerHTML = noMoreMessages;
    }
  });
}

function renderStatsHandler(e) {
  main.innerHTML = "";
  main.innerHTML = stats;
  callStats();
}

function callStats() {
  axios.get(statsUrl).then((res) => {
    // removeLoader();
    displayStats(res);
  });
}

function displayStats(response) {
  const statsTbody = document.querySelector("tbody");
  main.removeAttribute("class");

  main.classList.add("container-sm", "px-0");

  let sendStats = document.getElementById("sendStats");
  if (response.data) {
    response = response.data;
    for (let i = 0; i < response.length; i++) {
      let tr = "";
      tr = `<tr>
        <td>
        ${response[i].age} 
         Month</td><td> 
        ${response[i].weight} 
         KG</td><td>
        ${response[i].hight} 
         CM</td><td> <input
         class="btn btn-primary deleteBtn cust-btn"
         type="delete"
         value="Delete"
         id="${response[i].id}"
       /></td></tr>`;
      statsTbody.innerHTML += tr;
    }
  } else {
    let newTr = document.createElement("tr");
    newTr.innerHTML = `
    <td>
    ${response.age} 
     Month</td><td> 
    ${response.weight} 
     KG</td><td>
    ${response.hight} 
     CM</td><td> <input
     class="btn btn-primary deleteBtn cust-btn"
     type="delete"
     value="Delete"
     id="${response.id}"
   /></td>`;
    statsTbody.append(newTr);
  }
  sendStats = document.getElementById("sendStats");
  sendStats.addEventListener("click", sendStatsHandler);
  const tableEl = document.querySelector("table");
  tableEl.addEventListener("click", onDeleteRow);
}

function onDeleteRow(e) {
  if (!e.target.classList.contains("deleteBtn")) {
    return;
  }
  const btn = e.target;
  deleteBtnId = btn.id;
  formData = '{ "id": ' + deleteBtnId + " }";
  btn.closest("tr").remove();
  axios.delete(`${statsUrl}/${btn.id}`, {
    data: { id: deleteBtnId },
  });
}

function isEmpty() {
  const age = document.getElementById("age").value;
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;
  if (age != "" && height != "" && weight != "") {
    const sendStats = document.getElementById("sendStats");
    sendStats.classList.remove("disabled");
    // sendStats.classList.toggle("disabled");
    // } else {
    //   statSubmitBtn.setAttribute("disabled", true);
    //   statSubmitBtn.style.removeProperty("color");
    //   statSubmitBtn.style.removeProperty("background-color");
    //
  } else {
    sendStats.classList.add("disabled");
  }
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
  axios.post(statsUrl, statsObj).then((res) => {
    statsObj.id = res.data.id;
    displayStats(statsObj);
  });
}

function renderNewsHandler(e) {
  // e.preventDefault();
  main.innerHTML = "";
  const addNews = document.createElement("div");
  addNews.classList.add("mb-3", "gap-2", "mx-auto", "messageDiv");
  addNews.innerHTML = `<label for="message" class="form-label ">Add news about Mathi or the family</label>
  <textarea class="form-control Message" id="message" rows="3" style="max-width:600px ;"></textarea>
  <p></p>
  <button type="submit" class="btn btn-primary btn-sm SendBtn">Send</button>
  `;
  main.append(addNews);
  axios.get(BASE_URL + "/feed").then((res) => {
    let ul = document.createElement("ul");
    ul.classList.add("news-list");
    for (let i = 0; i < res.data.length; i++) {
      const element = document.createElement("div");
      element.classList.add("news-el");
      element.id = res.data[i].id;
      element.innerHTML = `<li class="feed-el">${res.data[i].content}</li>
      <button type="submit" class="btn btn-primary btn-sm delete">Delete</button>
      `;
      ul.prepend(element);
      main.append(ul);
      const deleteButton = document.querySelector(".delete");
      deleteButton.addEventListener("click", deleteNewsHandler);
    }
    const SendBtn = document.querySelector(".SendBtn");
    SendBtn.addEventListener("click", sendMessage);
  });
}

function sendMessage(e) {
  const message = document.getElementById("message").value;
  const requestData = { content: message };
  axios.post(`${BASE_URL}/feed`, requestData);
  renderNewsHandler();
}

function deleteNewsHandler(e) {
  const newsEl = e.target.closest(".news-el");
  const id = e.target.closest(".news-el").id;
  const requestData = { data: { id: id } };
  axios.delete(`${BASE_URL}/feed/${id}`, requestData).then((res) => {});
  newsEl.remove();
}

const statsNav = document.getElementById("statsNav");
statsNav.addEventListener("click", renderStatsHandler);
messagesNav.addEventListener("click", renderMessages);
newsNav.addEventListener("click", renderNewsHandler); //
messagesNav.click();

function upload(e) {
  e.preventDefault();
  const formData = new FormData();
  const imagefile = document.querySelector("#file");
  formData.file = imagefile.files[0];
  // formData.append("image", imagefile.files[0]);
  // formData.append(enctype="multipart/form-data")
  axios.post(
    BASE_URL + "/image",
    { data: { data: formData } },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

function renderGalleryHandler(params) {
  main.innerHTML = "";
  let form = document.createElement("form");
  form.classList.add("pt-5");
  form.style = "text-align: center";
  form.id = "uploadForm";
  form.action = "upload_file";
  form.role = "form";
  form.method = "post";
  form.enctype = "multipart/form-data";
  form.innerHTML = `<input type="file" id="file" name="file">  
  <input type="text" id="desc" name="desc">
  <input type=submit value=Upload id="submit">`;
  main.append(form);
  let newId = submit.id + " 123";
  // submit.id = submit.id + " 123";

  submit.addEventListener("click", uploadFile);
}

{
  /* <form id="uploadForm" action='upload_file' role="form" method="post" enctype=multipart/form-data>
<input type="file" id="file" name="file">
<input type=submit value=Upload id="up">
</form> */
}

// WORKS??????
function uploadFile(e) {
  e.preventDefault();
  const formData = new FormData();
  let fileInput = document.getElementById("file");
  let desc = document.getElementById("desc").value;
  if (
    fileInput.files[0].type == "image/heic" ||
    fileInput.files[0].type == ""
  ) {
    return alert("file is not supported");
  }
  if (fileInput.files[0]) {
    formData.append("classified_id", 2);
    formData.append("file", fileInput.files[0]);
    axios
      .post(BASE_URL + "/images/", formData)
      // axios({
      //   method: "post",
      //   url: BASE_URL + "/images",
      //   data: formData,
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "multipart/form-data",
      //   },
      // })
      .then((res) => {
        const galleryObj = { path: res.data.filename, desc: desc };
        axios.post(`${BASE_URL}/gallery`, galleryObj);
      });
  }
  document.getElementById("desc").value = "";
  fileInput.value = "";
}

galleryNav.addEventListener("click", renderGalleryHandler);
