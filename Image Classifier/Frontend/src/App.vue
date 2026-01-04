<template>
  <div>
    <h1>Image Classification</h1>
    <input type="file" @change="onFileChange"/>
    <button @click="upload" :disabled="!file">Classify</button>

    <div v-if="preview">
      <img ref="imgRef" :src="preview" style="max-width:400px;" />
      <canvas ref="canvasRef" style="position:absolute; top:0; left:0;"></canvas>
    </div>

    <div v-if="predictions.length">
      <ul>
        <li v-for="p in predictions" :key="p.class">
          {{p.class}} - {{(p.score*100).toFixed(1)}}%
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      file: null,
      preview: null,
      predictions: []
    }
  },
  methods: {
    onFileChange(e) {
      this.file = e.target.files[0];
      this.preview = URL.createObjectURL(this.file);
      this.predictions = [];
    },
    async upload() {
      const formData = new FormData();
      formData.append('image', this.file);
      const res = await axios.post('http://localhost:3000/api/classify', formData, {
        headers: {'Content-Type': 'multipart/form-data'}
      });
      this.predictions = res.data;

      // draw bounding boxes if exist
      const canvas = this.$refs.canvasRef;
      const img = this.$refs.imgRef;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.font = '16px Arial';

      this.predictions.forEach(p => {
        const [x1,y1,x2,y2] = p.bbox;
        ctx.strokeRect(x1,y1,x2-x1,y2-y1);
        ctx.fillText(`${p.class} ${(p.score*100).toFixed(1)}%`, x1, y1-5);
      });
    }
  }
}
</script>
