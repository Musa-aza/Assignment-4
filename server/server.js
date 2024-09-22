import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import pg from "pg"

const app = express()
const dbConnectionString = process.env.DATABASE_URL;
export const db = new pg.Pool({
  connectionString: dbConnectionString,
});

dotenv.config();

app.use(express.json())
app.use(cors())

app.listen(8080, function () {
    console.log("Server is running! you got this musa");
});

app.get("/", function (request, response) {
  response.json({ message: "Hello there! I hope this works." });
}); 

app.get("/add-data", function (request, response) {
  response.json({
    message: "Hello there"
  })
})

app.get("/name", async (req, res) => {
  const query = await db.query(`SELECT * FROM name`);

  res.json(query.rows);
  console.log(query);
});

app.get("/userComments", async function (req, res) {
  const query = await db.query(`SELECT * FROM userComments WHERE TEXT = $1`, ["Comment"]);
  res.json(query.rows);
});

//===========================================
//In the .env file, you need your database connection string with the correct PASSWORD

//your .env file should contain your connection string, for example:

//DATABASE_URL=postgresql://postgres.yrtldcjmflhjbatquwdb:[YOUR-PASSWORD]@aws-0-eu-west-2.pooler.supabase.com:6543/postgres
//DATABASE_PASSWORD=password

//!Add your password without square brackets!

//======================
//For this assignment, the minimum you need is one table to store your user feedback
