import express from "express";
import cors from "cors";
import { sample_foods, sample_tags, sample_users } from "./data";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json())
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

    user.token = token;
    return user;
}

// port koji koristimo,
const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port)
})