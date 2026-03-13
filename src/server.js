const express = require('express');
const app = express();
const screenshotRoute = require("./routes/screenshot");
const port = 3000;

app.use(express.json());
app.use("/screenshot", screenshotRoute);


app.listen(port, () => {
    console.log("Server is active on port:", port);
});
