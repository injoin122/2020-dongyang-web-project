let mongoClient = require("mongodb").MongoClient;

let url = "mongodb://uikanghome.iptime.org:3001";
let mongodb = "test";
let mondb = "";

let mongo = {
  mongConnect: async () => {
    return mongoClient.connect(url);
  },

  gettheaters: (callback) => {
    mongoClient.connect(url, (err, db) => {
      console.log("호출");
      if (err) {
        db.close();
        console.log(err);
        throw err;
        return;
      }
      mondb = db.db(mongodb);
      mondb
        .collection("theaters")
        .find({}, { _id: "0", theaters_seq: "1" })
        .toArray((err, result) => {
          if (err) {
            console.log(err);
            throw err;
            return;
          }
          let data = result;
          db.close();
          callback(data);
        });
    });
  },
  getmovieseq: async (title) => {
    let seq = 0;
    let data = await mongoClient.connect(url, async (err, db) => {
      if (err) {
        db.close();
        console.log(err);
        throw err;
        return;
      }
      mondb = await db.db(mongodb);
      await mondb
        .collection("movie")
        .find({ subject: title })
        .toArray((err, result) => {
          if (result.length == 0) seq = 0;
          else {
            // console.log("있음")
            // console.log(result)
            seq = result;
            console.log("리턴처리함");
            db.close();
            return seq;
          }
        });
      let result = await mondb.collection("movie").find({ subject: title });
      return result;
    });
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
                      promiseProcessing(data, count + 1, db, mongod);
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
              promiseProcessing(data, count + 1, db, mongod);
              return;
            });
        }
      });
  },
};

module.exports = mongo;
