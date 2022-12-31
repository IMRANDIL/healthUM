require("dotenv").config();
require("./config/dbConfig");
const cors = require("cors");
const { app, express } = require("./config/dbConfig");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", require("./routes/authRoute"));
app.use("/api/admin", require("./routes/adminRoute"));
app.use("/api/doctor", require("./routes/doctorRoute"));
app.use("/api/doctor/appointment", require("./routes/appointmentRoute"));
