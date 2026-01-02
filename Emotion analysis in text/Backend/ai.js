// ai.js
import { pipeline } from "@xenova/transformers"

let classifier = null

export async function analyzeSentiment(text) {
  if (!classifier) {
    classifier = await pipeline(
      "sentiment-analysis",
      "Xenova/distilbert-base-uncased-finetuned-sst-2-english"
    )
  }

  const result = await classifier(text)
  return result[0]
}
