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

// Blok kode untuk melakukan request data json
function getArticles() {
  if ("caches" in window) {
    caches.match(base_url + "standings").then(function(response) {
      if (response) {
        response.json().then(function(data) {
          const {
            standings: [{
                table: imgData
            }]
        } = data;
        const articlesHTML = imgData.reduce(
            (html, {
                team: {
                    id,
                    name,
                    crestUrl
                }
            }) => html += `
            <div class="card">
            <div class="col s4">
              <img class="center-align" width="100px" height="100px" src="${crestUrl}">
              <span class="center-align">${name}</span>
            <br>
            </div>
            </div>
        `, '');
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("articles").innerHTML = articlesHTML;
        });
      }
    });
  }

  fetch(base_url + "standings", {
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
        const articlesHTML = imgData.reduce(
            (html, {
                team: {
                    id,
                    name,
                    crestUrl
                }
            }) => html += `
          <div class="card">
          <div class="col s4">
            <img class="center-align" width="100px" height="100px" src="${crestUrl}">
            <span class="center-align">${name}</span>
          <br>
          </div>
          </div>
        `, '');
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("articles").innerHTML = articlesHTML;
    })
    .catch(error);
}





function getSavedArticles() {
  getAll().then(function(articles) {
    console.log(articles);
    // Menyusun komponen card artikel secara dinamis
    var articlesHTML = "";
    articles.forEach(function(article) {
      var description = article.post_content.substring(0,100);
      articlesHTML += `
                  <div class="card">
                    <a href="./article.html?id=${article.ID}&saved=true">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${article.cover}" />
                      <span class="card-title truncate">${article.post_title}</span>
                      <p>${description}</p>
                    </div>
                  </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = articlesHTML;
  });
}



