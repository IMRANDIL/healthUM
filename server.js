require("dotenv").config();
require("./config/dbConfig");
const cors = require("cors");
const { app, express } = require("./config/dbConfig");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/signup", require("./routes/authRoute"));
