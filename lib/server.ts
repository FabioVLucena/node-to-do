import app from "./config/app";

const PORT = 3333;

app.listen(PORT, () => {
   console.log('Express server listening on port ' + PORT);
})