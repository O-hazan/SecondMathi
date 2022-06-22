const stats = ` <table
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
                  <input id="age" type="number" class="form-control  " />
                </div></td>
                <td><div class="row">
                  <div >
                  <input id="weight" type="number" class="form-control  " />
                </div></td>
                <td><div class="row">
                  <div >
                  <input id="height" type="number" class="form-control  " />
                </div></td>  <td><div class="row">
                  <div >
                    <input id="sendStats" class="btn btn-success cust-btn" type="submit" value="Submit">
                </div></td>
              </tr>
            </form>`;

// export default stats

function displayStats(response) {
  const statsTbody = document.querySelector("tbody");
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
