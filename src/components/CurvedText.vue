<template>
  <div>
    <!-- <input type="checkbox" name="" id="" @change="changeColor" /> -->
    <label for="">Uppercase</label>
    <input type="checkbox" v-model="uppercase" @change="changeUppercase" />
    <label for="Curved text">Curved text</label>
    <input type="checkbox" v-model="curved" @change="changeCurvedText" />
    <input type="range" id="volume" name="volume" min="-180" max="180" v-model="degrees" @change="changeCurvedText" />
    <canvas id="canvas" width="800" height="800"></canvas>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref } from "vue";
import { fabric } from "fabric";
import { CorjlFabricCanvas } from "@/extensions";
import TyprVue from "./Typr.vue";
import { Typr, TyprU } from "typr-ts";

export default {
  setup() {
    let _canvas: CorjlFabricCanvas | null = null;
    const canvas = computed<CorjlFabricCanvas>(() => {
      if (!_canvas) {
        fabric.Object.prototype.transparentCorners = false;
        fabric.Object.prototype.cornerStrokeColor = "#0066ff";
        _canvas = new CorjlFabricCanvas("canvas", {
          preserveObjectStacking: true,
          fireRightClick: true,
          stopContextMenu: true,
          perPixelTargetFind: true,
          targetFindTolerance: 10,
        });
      }
      return _canvas as CorjlFabricCanvas;
    });
    const uppercase = ref(false);
    const curved = ref(false);
    const degrees = ref(180);

    const changeColor = () => {
      const obj =  canvas.value.getActiveObject();
      if(obj) {
        obj.set('fill', 'red')
      }
      canvas.value.requestRenderAll();
    }

    const changeUppercase = () => {
      const obj =  canvas.value.getActiveObject();
      if(obj) {
        // @ts-ignore
        obj.set('uppercase', uppercase.value)
      }
      canvas.value.requestRenderAll();
    }
    const changeCurvedText = () => {
      const obj =  canvas.value.getActiveObject();
      if(obj) {
        // @ts-ignore
        obj.set('curvedType', 'circle')
        // @ts-ignore
        obj.set('degrees', degrees.value)
        // @ts-ignore
        obj.set('curved', curved.value)

      }
      canvas.value.requestRenderAll();
    }
    onMounted(() => {
      canvas.value.setWidth(800);
      canvas.value.setHeight(800);
      // @ts-ignore
      // load("fonts/LiberationSans-Bold.ttf", fontLoaded);

      const text1 = new fabric.CText('nguyen anh van', {
        top: 200,
        left: 200,
        fontSize: 32,
        fontFamily: 'DejaVuSans',
        textAlign: 'center'
      })
      // @ts-ignore
      canvas.value.add(text1);
      canvas.value.requestRenderAll();
      canvas.value.setActiveObject(canvas.value.getObjects()[0])
    });
    return {
      uppercase,
      curved,
      degrees,
      canvas,
      changeColor,
      changeUppercase,
      changeCurvedText,
    };
  },
};
</script>