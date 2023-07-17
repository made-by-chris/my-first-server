// to read env vars, use dotenv
import dotenv from "dotenv";
dotenv.config();
console.log("hello im a javascript program, my env port is", process.env.PORT);
console.log("super secret api key is:", process.env.SECRET_API_KEY);
