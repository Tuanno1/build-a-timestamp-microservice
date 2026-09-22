import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

// 1. Route khi KHÔNG có tham số date (/api hoặc /api/)
app.get("/api", (_req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

// 2. Route khi CÓ tham số date (/api/:date)
app.get("/api/:date", (req, res) => {
  const dateParam = req.params.date;
  let date;

  // Nếu tham số chỉ chứa toàn chữ số -> Chuyển sang kiểu số (Unix timestamp ms)
  if (!isNaN(dateParam)) {
    date = new Date(Number(dateParam));
  } else {
    // Nếu tham số là chuỗi ngày tháng (VD: "2015-12-25")
    date = new Date(dateParam);
  }

  // Nếu ngày không hợp lệ
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Trả về JSON hợp lệ
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});