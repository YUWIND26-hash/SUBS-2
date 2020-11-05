// Kode pembuatan database

var dbPromised = idb.open("news-reader", 1, function(upgradeDb) {
    var articlesObjectStore = upgradeDb.createObjectStore("teams");
    articlesObjectStore.createIndex("name", "name", { unique: false });
  });

//   Kode menyimpan artikel baru

function saveForLater(team) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        console.log(team);
        store.put(team.result);
        return tx.complete;
      })
      .then(function() {
        console.log("Artikel berhasil di simpan.");
      });
  }

//   Untuk mengambil seluruh data dari Indexed Db
  function getAll() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("teams", "readonly");
          var store = tx.objectStore("teams");
          return store.getAll();
        })
        .then(function(teams) {
          resolve(teams);
        });
    });
  }


