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

  console.log(sendStats);
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
