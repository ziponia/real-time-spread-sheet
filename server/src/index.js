const express = require("express");
const Pusher = require("pusher");
const cors = require("cors");
const bodyParser = require("body-parser");

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSER,
  encrypted: true,
});

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

const router = express.Router();

// message 수신
router.post("/message", (req, res) => {
  console.log("Receive Message");
  console.log(req.body);
  const socketId = req.body.socket_id;
  pusher.trigger("sheet-1", "save-sheet", req.body, socketId);

  res.send(req.body);
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Server Runnint At :${PORT}`);
});
