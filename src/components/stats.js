/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const stats = `<table
class="table table-hover mx-auto pt-4"
>
<thead>
  <tr>
    <th scope="col" class="col-2">Age</th>
    <th scope="col" class="col-2">Weight</th>
    <th scope="col" class="col-2">Height</th>
  </tr>
</thead>
<tbody>`;

function displayStats(response) {
  const statsTbody = document.querySelector("tbody");
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
         CM</td></tr>`;
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
     CM</td><td>`;
    statsTbody.append(newTr);
  }
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
  console.log("in");
  const age = document.getElementById("age").value;
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;
  if (age != "" && height != "" && weight != "") {
    console.log(";why");
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

// const loader = document.getElementById("loader");
// window.addEventListener("load", function (e) {
// loader.style.height = "100%";
// loader.style.width = "100%";
// loader.style.display = "none";
// loader.style.borderRadius = "50%";
// loader.style.visibility = "hidden";
// });
