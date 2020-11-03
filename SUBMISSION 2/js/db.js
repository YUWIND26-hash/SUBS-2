// Kode pembuatan database

var dbPromised = idb.open("news-reader", 1, function(upgradeDb) {
    var articlesObjectStore = upgradeDb.createObjectStore("articles");
    articlesObjectStore.createIndex("name", "name", { unique: false });
  });

//   Kode menyimpan artikel baru

function saveForLater(article) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("articles", "readwrite");
        var store = tx.objectStore("articles");
        console.log(article);
        store.add(article.result);
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
          var tx = db.transaction("articles", "readonly");
          var store = tx.objectStore("articles");
          return store.getAll();
        })
        .then(function(articles) {
          resolve(articles);
        });
    });
  }


