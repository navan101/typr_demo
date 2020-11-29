<template>
  <div>
    <canvas id="canvas" width="800" height="800"></canvas>
  </div>
</template>

<script lang="ts">
import { computed, onMounted } from "vue";
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
      return _canvas;
    });
    onMounted(() => {
      canvas.value.setWidth(800);
      canvas.value.setHeight(800);
      // @ts-ignore
      // load("fonts/LiberationSans-Bold.ttf", fontLoaded);

      const text1 = new fabric.CJCurvedText('nguyen anh van', {
        top: 100,
        left: 100,
        fontSize: 48,
        fontFamily: 'LiberationSans-Bold',
        textAlign: 'center'
      })
      // @ts-ignore
      canvas.value.add(text1);
      canvas.value.requestRenderAll();
    });
    return {
      canvas,
    };
  },
};
</script>