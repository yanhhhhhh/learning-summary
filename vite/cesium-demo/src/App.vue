<template>
  <div id="cesiumContainer"></div>
</template>
 
<script setup>
import * as Cesium from 'cesium';
import { onMounted } from 'vue';


//添加回调函数
function drawCanvas(time, result) {
    var canvas = document.createElement("canvas");
    canvas.width =600
    canvas.height =100
    var context = canvas.getContext('2d');
    context.clearRect(0, 0,600, 100);
    context.font = 'italic 40pt Calibri';
    context.fillStyle = "red";
    context.fillText(Cesium.JulianDate.toDate(Cesium.JulianDate.now()).getTime(), 20, 100);
    return canvas;
}
onMounted(() => {
  Cesium.Ion.defaultAccessToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2OTA4ZDAyMy0wMTAwLTRlYTMtOTIwMy0wYWI2ZTljMDFhZjEiLCJpZCI6MTAwOTQ2LCJpYXQiOjE2NTc2Mzk3NTN9.o-i3BLOuSrD3XtPEzj_8CULkttOosGfrQmUuzbtqJCw'
  const viewer = new Cesium.Viewer('cesiumContainer');
  viewer.entities.add({
    name: 'Rotating rectangle with rotating texture coordinate',
    rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(-90.0, 30.0, -70.0, 35.0),
        material: new Cesium.ImageMaterialProperty({
            //添加回调
            image: new Cesium.CallbackProperty(drawCanvas, false),
            transparent: true
        })
    }
});

});
</script>
 
<style>

html,body,#app,#cesiumContainer{
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
</style>