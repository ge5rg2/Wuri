const express = require("express");
const path = require("path");
const app = express();
const fetch = require("node-fetch");
const port = process.env.PORT || 8080;
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "./build"))); // 배포시 사용할 코드(server가 읽는 html 경로)

// CPI 개요 정보 가져오기
app.get("/api", (req, res) => {
  let accountID = req.query.accountID;
  let POCurl = `https://p200024-iflmap.hcisbp.ap1.hana.ondemand.com/http/AccountInfo?AccountID=${accountID}`;
  fetch(POCurl, {
    method: "GET",
    headers: {
      Authorization: req.headers.authorization,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      console.log("Network response was not ok.");
    })
    .then((data) => {
      //data.d.results[0].ObjectID -> 불러온 데이터에서 가장 처음 데이터의 ID
      res.send(data); // locall 용
      //res.send(data).sendFile(path.join(__dirname, "./build/index.html")); // 배포시 사용할 코드(server가 읽는 html 경로)
    });
  console.log(`${accountID} 사용자가 개요 정보를 불러왔습니다🕊️`);
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./build/index.html")); // 배포시 사용할 코드(server가 읽는 html 경로)
});

app.listen(port, function () {
  console.log(`🚀 Listening on http://localhost:${port} 🚀`);
});
