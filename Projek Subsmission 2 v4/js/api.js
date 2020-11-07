var base_url = "http://api.football-data.org/v2/";
var token = "eef638e30ce248bcaef620dfedb5a12e";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getCompetition() {
  if ("caches" in window) {
    caches
      .match(base_url + "competitions/", {
        headers: {
          "X-Auth-Token": token,
        },
      })
      .then((response) => {
        if (response) {
          response.json().then((data) => {
            // Objek/array JavaScript dari response.json() masuk lewat data.

            // Menyusun komponen card artikel secara dinamis
            var competitionsArticle = "";
            let currentMatchday = 0;

            data.competitions.forEach((dataCompetition) => {
              // for (let index = 0; index < 20; index++) {
              // const dataCompetition = data.competitions[index];
              // console.log(dataCompetition);
              if (dataCompetition.currentSeason !== null) {
                currentMatchday = dataCompetition.currentSeason;
                if (dataCompetition.currentSeason.currentMatchday !== null) {
                  currentMatchday =
                    dataCompetition.currentSeason.currentMatchday;
                  competitionsArticle += `
                  <li class = "active" >
                    <div class="collapsible-header">
                    ${dataCompetition.name}
                    </div>
                    <div class="collapsible-body">
                    <table>
                    <thead>
                      <tr>
                          <th class="center">Area</th>
                          <th class="center">Code</th>
                          <th class="center">Match Day</th>
                          <th class="center">Start</th>
                          <th class="center">End</th>

                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td class="center">${dataCompetition.area.name}</td>
                        <td class="center">${dataCompetition.area.countryCode}</td>
                        <td class="center">${currentMatchday}</td>
                        <td class="center">${dataCompetition.currentSeason.startDate}</td>
                        <td class="center">${dataCompetition.currentSeason.endDate}</td>
                      </tr>

                    </tbody>
                  </table>
                    </div>
                  </li>
                  `;
                }
              }
            });

            document.getElementById(
              "competitionPage",
            ).innerHTML = competitionsArticle;
            const collapsible = document.querySelectorAll(".collapsible");
            M.Collapsible.init(collapsible);
          });
        }
      });
  }

  fetch(base_url + "competitions/", {
    headers: {
      "X-Auth-Token": token,
    },
  })
    .then(status)
    .then(json)
    .then((data) => {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
      var competitionsArticle = "";
      let currentMatchday = 0;

      data.competitions.forEach((dataCompetition) => {
        // for (let index = 0; index < 20; index++) {
        // const dataCompetition = data.competitions[index];
        // console.log(dataCompetition);
        if (dataCompetition.currentSeason !== null) {
          currentMatchday = dataCompetition.currentSeason;
          if (dataCompetition.currentSeason.currentMatchday !== null) {
            currentMatchday = dataCompetition.currentSeason.currentMatchday;
            competitionsArticle += `
                  <li class = "active" >
                    <div class="collapsible-header">
                    ${dataCompetition.name}
                    </div>
                    <div class="collapsible-body">
                    <table>
                    <thead>
                      <tr>
                          <th class="center">Area</th>
                          <th class="center">Code</th>
                          <th class="center">Match Day</th>
                          <th class="center">Start</th>
                          <th class="center">End</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td class="center">${dataCompetition.area.name}</td>
                        <td class="center">${dataCompetition.area.countryCode}</td>
                        <td class="center">${currentMatchday}</td>
                        <td class="center">${dataCompetition.currentSeason.startDate}</td>
                        <td class="center">${dataCompetition.currentSeason.endDate}</td>
                      </tr>

                    </tbody>
                  </table>
                    </div>
                  </li>
                  `;
          }
        }
      });

      document.getElementById(
        "competitionPage",
      ).innerHTML = competitionsArticle;

      // Sisipkan komponen card ke dalam elemen dengan id #content

      const collapsible = document.querySelectorAll(".collapsible");
      M.Collapsible.init(collapsible);
    })
    .catch((error) => {
      console.log("Error : ", error);
    });
}

// Blok kode untuk melakukan request data json
function getTeam() {
  if ("caches" in window) {
    caches
      .match(base_url + "teams/", {
        headers: {
          "X-Auth-Token": token,
        },
      })
      .then((response) => {
        if (response) {
          response.json().then((data) => {
            var teamsArticle = "";
            data.teams.forEach((team) => {
              teamsArticle += `
              <div class="col s12 m6" >
              <div>
              <div class="card">
                <div class="card-image">
                  <img src="${team.crestUrl}">
                  <a href="./article.html?id=${team.id}" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">directions</i></a>
                  </div>
                  <div class="card-content teal lighten-5">
                  <span class="card-title black-text"><b>${team.name}</b></span>
                  <p>Alamat : <b>${team.address}</p></b>
                  <p>Telepon : <b>${team.phone}</p></b>
                  <p>Website : <b>${team.website}</p></b>
                  <p>Email : <b>${team.email}</p></b>
                  <p>Warna Club : <b>${team.clubColors}</p></b>
                  <p>Markas: <b>${team.venue}</p></b>
                  <p class="right">${team.lastUpdated}</p>
                  <span></span>
                </div>
              </div>
                </div>
                </div>
                  `;
            });
            document.getElementById("teamPage").innerHTML = teamsArticle;

            // Sisipkan komponen card ke dalam elemen dengan id #content
          });
        }
      });
  }

  fetch(base_url + "teams/", {
    headers: {
      "X-Auth-Token": token,
    },
  })
    .then(status)
    .then(json)
    .then((data) => {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      var teamsArticle = "";

      data.teams.forEach((team) => {
        console.log("TEAM", team);
        teamsArticle += `
        <div class="col s12 m6 " >
          <div>
          <div class="card">
            <div class="card-image">
              <img src="${team.crestUrl}">
              <a href="./article.html?id=${team.id}" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">directions</i></a>
              </div>
              <div class="card-content teal lighten-5">
              <span class="card-title black-text"><b>${team.name}</b></span>
              <p>address : <b>${team.address}</p></b>
              <p>phone : <b>${team.phone}</p></b>
              <p>website : <b>${team.website}</p></b>
              <p>email : <b>${team.email}</p></b>
              <p>clubColors : <b>${team.clubColors}</p></b>
              <p>venue : <b>${team.venue}</p></b>
              
              <p class="right">${team.lastUpdated}</p>
            </div>
          </div>
            </div>
        </div>
        
        `;
      });
      document.getElementById("teamPage").innerHTML = teamsArticle;
    })
    .catch((error) => {
      console.log("Error : ", error);
    });
}

function getTeamById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);

    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches
        .match(base_url + "teams/" + idParam, {
          headers: {
            "X-Auth-Token": token,
          },
        })
        .then((response) => {
          if (response) {
            response.json().then((team) => {
              let articleHTML = `
              <div class="card">
                  <div class="card-image">
                    <img src="${team.crestUrl}">
                    
                    </div>
                    <div class="card-content teal lighten-5">
                    <span class="card-title black-text center"><b>${team.name}</b></span>
                    <p>address : <b>${team.address}</p></b>
                    <p>phone : <b>${team.phone}</p></b>
                    <p>website : <b>${team.website}</p></b>
                    <p>email : <b>${team.email}</p></b>
                    <p>clubColors : <b>${team.clubColors}</p></b>
                    <p>venue : <b>${team.venue}</p></b>
                    <p class="right">Last Update : ${team.lastUpdated}</p>
                  </div>
                </div>
          `;
              // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
              document.getElementById("body-content").innerHTML = articleHTML;

              resolve(team);
            });
          }
        });
    }

    fetch(base_url + "teams/" + idParam, {
      headers: {
        "X-Auth-Token": token,
      },
    })
      .then(status)
      .then(json)
      .then((team) => {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log("TEAMMMSSS", team);

        // Menyusun komponen card artikel secara dinamis
        var articleHTML = `
        <div class="card">
          <div class="card-image">
            <img src="${team.crestUrl}">
            
            
          </div>
          <div class="card-content teal lighten-5">
          <span class="card-title black-text center"><b>${team.name}</b></span>
            <p>address : <b>${team.address}</p></b>
            <p>phone : <b>${team.phone}</p></b>
            <p>website : <b>${team.website}</p></b>
            <p>email : <b>${team.email}</p></b>
            <p>clubColors : <b>${team.clubColors}</p></b>
            <p>venue : <b>${team.venue}</p></b>
            <p class="right">Last Update : ${team.lastUpdated}</p>
          </div>
        </div>
        `;

        document.getElementById("body-content").innerHTML = articleHTML;

        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(team);
      });
  });
}

function getAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then((db) => {
        var tx = db.transaction("articles", "readonly");
        var store = tx.objectStore("articles");
        return store.getAll();
      })
      .then((articles) => {
        resolve(articles);
      });
  });
}

function getSavedTeams() {
  getAll().then((articles) => {
    console.log(articles);
    // Menyusun komponen card artikel secara dinamis
    var articlesHTML = "";
    articles.forEach((team) => {
      articlesHTML += `
      <div class="card">
      <div class="card-image">
        <img src="${team.crestUrl}" width="700">
        
        
      </div>
      <div class="card-content teal lighten-5">
      <a href="#" id="deleteSaved" onclick="deleteSaved(${team.id})" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">delete</i></a>
      <span class="card-title black-text center"><b>${team.name}</b></span>
        <p>address : <b>${team.address}</p></b>
        <p>phone : <b>${team.phone}</p></b>
        <p>website : <b>${team.website}</p></b>
        <p>email : <b>${team.email}</p></b>
        <p>clubColors : <b>${team.clubColors}</p></b>
        <p>venue : <b>${team.venue}</p></b>
        <p class="right">Last Update : ${team.lastUpdated}</p>
      </div>
    </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = articlesHTML;
  });
}

function loadPage(page) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      var content = document.querySelector("#body-content");

      // tambahkan blok if berikut
      if (page === "home") {
        getCompetition();
      } else if (page === "saved") {
        getSavedTeams();
      } else if (page === "team") {
        getTeam();
      }
      // ---
      if (this.status == 200) {
        content.innerHTML = xhttp.responseText;
      } else if (this.status == 404) {
        content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
      } else {
        content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
      }
    }
  };
  xhttp.open("GET", "pages/" + page + ".html", true);
  xhttp.send();
}

function getById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then((db) => {
        var tx = db.transaction("articles", "readonly");
        var store = tx.objectStore("articles");
        return store.get(id);
      })
      .then((team) => {
        resolve(team);
      });
  });
}

function getSavedTeamById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  getById(idParam).then((team) => {
    articleHTML = "";
    var articleHTML = `
    <div class="card">
      <div class="card-image">
        <img src="${team.crestUrl}">
        
        
      </div>
      <div class="card-content teal lighten-5">
      <span class="card-title black-text center"><b>${team.name}</b></span>
      <a href="#" id="deleteSaved" onclick="deleteSaved(${team.id})" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">delete</i></a>
        <p>address : <b>${team.address}</p></b>
        <p>phone : <b>${team.phone}</p></b>
        <p>website : <b>${team.website}</p></b>
        <p>email : <b>${team.email}</p></b>
        <p>clubColors : <b>${team.clubColors}</p></b>
        <p>venue : <b>${team.venue}</p></b>
        <p class="right">Last Update : ${team.lastUpdated}</p>
      </div>
    </div>
  `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articleHTML;
  });
}
