import express from "express";


const server = express();
const PORT = 3333;

server.get ("/", (req, res) => {
    res.send("server is running");
});


server.listen(PORT,() => {
    console.log ("Server is running on port " + PORT);
})

