let mongoClient = require("mongodb").MongoClient;

let url = "mongodb://uikanghome.iptime.org:3003";
let mongodb = "test";
let mondb = "";
let add_seq = 0;
//Mongo mainDB명
function connMongo(callback) {
  mongoClient.connect(url, (err, db) => {
    // assert.equal(null,err);
    if (err) {
      console.log(err);
    }
    console.log("Connect Succes to Server");
    db.close();
  });
}

let mongo = {
  mongConnect: async () => {
    return mongoClient.connect(url);
  },

  alltheaterfound: async (callback) => {
    try {
      console.log();
      mongoClient.connect(url, async (err, db) => {
        if (err) {
          throw err;
          return;
        }
        mondb = db.db(mongodb);
        await mondb
          .collection("theaters")
          .find({}, {})
          .toArray()
          .then((result) => {
            db.close();
            console.log(result);
            callback(result);
          });
      });
    } catch (e) {
      throw e;
      return "DB is Error";
    }
  },
  searchTheater: async (seq, callback) => {
    try {
      console.log();
      mongoClient.connect(url, async (err, db) => {
        if (err) {
          throw err;
          return;
        }
        mondb = db.db(mongodb);
        await mondb
          .collection("theaters")
          .find({ theaters_seq: seq }, {})
          .toArray()
          .then((result) => {
            db.close();
            callback(result[0]);
          });
      });
    } catch (e) {
      throw e;
      return "DB is Error";
    }
  },
  playonMovieth: async (seq, callback) => {
    try {
      console.log(seq);
      mongoClient.connect(url, async (err, db) => {
        if (err) {
          throw err;
          return;
        }
        mondb = db.db(mongodb);
        await mondb
          .collection("movie_play")
          .find({ THEATERS_SEQ: seq }, {})
          .toArray()
          .then((result) => {
            db.close();
            console.log(result);
            callback(result);
          });
      });
    } catch (e) {
      throw e;
      return "DB is Error";
    }
  },
  playonMovie: (callback) => {
    try {
      mongoClient.connect(url, async (err, db) => {
        if (err) {
          throw err;
          return;
        }
        mondb = db.db(mongodb);
        try {
          mondb
            .collection("movie_play")
            .distinct("MOVIE_SEQ")
            .then((result) => {
              console.log(result);
              mondb
                .collection("movie")
                .find({ _id: { $in: result } }, { fields: { SUBJECT: 1 } })
                .toArray((err, result) => {
                  console.log(result);
                  db.close();
                  callback(result);
                });
              // mondb.collection('')
              // console.log(result[0])
            });
        } catch (e) {
          throw e;
        }
      });
    } catch (e) {
      throw e;
      return "DB is Error";
    }
  },
  playonMovieTH: (seq, callback) => {
    try {
      mongoClient.connect(url, (err, db) => {
        if (err) {
          throw err;
          return;
        }
        mondb = db.db(mongodb);
        try {
          mondb
            .collection("movie_play")
            .distinct("THEATERS_SEQ", { MOVIE_SEQ: 1 })
            .then((result) => {
              mondb
                .collection("theaters")
                .find({ theaters_seq: { $in: result.sort() } }, { fields: { th_name: 1 } })
                .toArray()
                .then((result) => {
                  db.close();
                  callback(result);
                });
            });
        } catch (e) {
          throw e;
        }
      });
    } catch (e) {
      throw e;
      return "DB is Error";
    }
  },

  insertCgvData: async (data, count, db, mongod) => {
    // console.log(data.length)
    if (count == data.length) {
      console.log("데이터 없음");
      mongod.close();
      return "end";
    }
    db.collection("movie")
      .find({ SUBJECT: data[count].title }, {})
      .toArray()
      .then((result) => {
        if (result.length == 0) {
          db.collection("movie")
            .find({}, {})
            .toArray()
            .then((result) => {
              db.collection("movie")
                .insertOne({
                  _id: ++add_seq,
                  SUBJECT: data[count].title,
                  COUNTRY: "대한민국",
                  GENRE: "",
                  DIRECTOR: "",
                  SUMMARY: "",
                  GRADE: "",
                })
                .then(() => {
                  db.collection("movie_play")
                    .insertOne({
                      MOVIE_SEQ: add_seq,
                      THEATERS_SEQ: data[count].theater,
                      START_TIME: data[count].time,
                      RUNNING_TIME: "",
                      SEATS: "100",
                      SEATS_LEFT: data[count].seat.replace("잔여좌석", "").replace("석", "").replace("마감", "0").replace("매진", "0").replace("준비중", "0"),
                      LINK: data[count].href,
                    })
                    .then(() => {
                      mongo.insertCgvData(data, count + 1, db, mongod);
                      return;
                    });
                });
            });
        } else {
          db.collection("movie_play")
            .insertOne({
              MOVIE_SEQ: result[0]._id,
              THEATERS_SEQ: data[count].theater,
              START_TIME: data[count].time,
              RUNNING_TIME: "",
              SEATS: "100",
              SEATS_LEFT: data[count].seat.replace("잔여좌석", "").replace("석", "").replace("마감", "0").replace("매진", "0").replace("준비중", "0"),
              LINK: data[count].href,
            })
            .then(() => {
              mongo.insertCgvData(data, count + 1, db, mongod);
              return;
            });
        }
      });
  },
};

module.exports = mongo;
