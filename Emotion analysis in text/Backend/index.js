// server.js
import express from "express"
import cors from "cors"
import { analyzeSentiment } from "./ai.js"

const app = express()
app.use(cors())
app.use(express.json())

app.post("/sentiment", async (req, res) => {
  const { text } = req.body
  console.log("Primljen tekst: ")
  console.log(text)
  const result = await analyzeSentiment(text)
  res.json(result)
})

app.listen(3000, () => console.log("AI server dela na portu 3000"))