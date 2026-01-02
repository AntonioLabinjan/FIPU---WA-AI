<script setup>
import { ref } from "vue"

const text = ref("")
const result = ref(null)

async function analyze() {
  const res = await fetch("http://localhost:3000/sentiment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: text.value })
  })
  result.value = await res.json()
}
</script>

<template>
  <div>
    <textarea v-model="text" placeholder="Upiši tekst"></textarea>
    <button @click="analyze">Analyze</button>

    <div v-if="result">
      <h2>{{ result.label }}</h2>
      <p>Confidence: {{ (result.score * 100).toFixed(2) }}%</p>
    </div>
  </div>
</template>
