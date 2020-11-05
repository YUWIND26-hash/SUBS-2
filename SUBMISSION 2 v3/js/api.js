var base_url = "https://api.football-data.org/v2/competitions/2014/";

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

// HALAMAN KE 1

// Blok kode untuk melakukan request data json
function getStandings() {
  if ("caches" in window) {
    caches.match(base_url + "standings").then(function(response) {
      if (response) {
        response.json().then(function(data) {
          const {
            standings: [{
                table: imgData
            }]
        } = data;
        const standingsHTML = imgData.reduce(
            (html, {
                team: {
                    id,
                    name,
                    crestUrl
                }
            }) => html += `
            <div class="card">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img src="${crestUrl}" />
                    </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${name}</span>
                    </div>
            </div>
           
        `, '');
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("klasemen").innerHTML = standingsHTML;
        });
      }
    });
  }

  fetch("https://api.football-data.org/v2/competitions/2014/standings", {
        method: "GET",
        headers: {
            "X-Auth-Token": "eef638e30ce248bcaef620dfedb5a12e"
        }
    })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
        const {
            standings: [{
                table: imgData
            }]
        } = data;
        const standingsHTML = imgData.reduce(
            (html, {
                team: {
                    id,
                    name,
                    crestUrl
                }
            }) => html += `

            <div class="card">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${crestUrl}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${name}</span>
                    </div>
            </div>
        
        `, '');
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("klasemen").innerHTML = standingsHTML;
    })
    .catch(error);
}







// HALAMAN ke 2 (Tapi tetap tidak bisa tampil)
// http://api.football-data.org/v2/competitions/2014/teams

// Blok kode untuk melakukan request data json
function getTeam() {
  if ("caches" in window) {
    caches.match(base_url + "teams").then(function(response) {
      if (response) {
        response.json().then(function(data) {

          // Untuk pengambilan nya benar atau tidak?
          
          var standingsHTML = "";
          teams.forEach(function(team) {
          standingsHTML += `

            <div class="card">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${team.crestUrl}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${team.name}</span>
                    </div>
            </div>
        
        `; ''});
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("clubs").innerHTML = standingsHTML;
        });
      }
    });
  }


  fetch("https://api.football-data.org/v2/competitions/2014/teams", {
        method: "GET",
        headers: {
            "X-Auth-Token": "eef638e30ce248bcaef620dfedb5a12e"
        }
    })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
      var standingsHTML = "";
          teams.forEach(function(team) {
          standingsHTML += `

            <div class="card">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${team.crestUrl}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${team.name}</span>
                    </div>
            </div>
        
        `; ''});
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("clubs").innerHTML = standingsHTML;
    })
    .catch(error);
}



// Untuk bagian saved sudah saya perbaiki mohon koreksinya

function getSavedTeams() {
  getAll().then(function(teams) {
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
    var teamsHTML = "";
    teams.forEach(function(teams) {
      var address = teams.address;
      var phone = teams.phone;
      var website = teams.website;
      var email = teams.email;
     teamsHTML += `
                  <div class="card">
                    <a href="./article.html?id=${teams.id}&saved=true">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${teams.crestUrl}" />
                      <span class="card-title truncate">${teams.name}</span>
                      <p>${address}</p>
                      <p>${phone}</p>
                      <p>${website}</p>
                      <p>${email}</p>
                    </div>
                  </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #teamsHTML
    document.getElementById("saved").innerHTML = teamsHTML;
  });
}



