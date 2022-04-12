<template>
  <div class="wrap">
    <canvas
      ref="mycanvasRef"
      id="mycanvas"
      :style="state.transform"
      width="1000"
      height="1000"
    ></canvas>
  </div>
</template>

<script>
import { watch, onMounted, reactive, ref } from "vue";
import { initScrollCenter } from "../lib/actions";
export default {
  name: "game",
  setup() {
    let mycanvasRef = ref(null);
    // 放大倍数
    let scale = ref(4);
    const state = reactive({
      transform: "transform: scale(4);",
    });

    watch(scale, (newValue, oldValue) => {
      //直接监听
      // console.log(newValue, oldValue);
      // 设置新缩放
      state.transform = `transform: scale(${newValue});`;
    });

    onMounted(() => {
      const canvas = document.querySelector("#mycanvas");
      var ctx = canvas.getContext("2d");
      ctx.fillRect(500-50, 500 - 50, 100, 100);
      // 监听滚轮
      handleZoom();
      // 画布居中
      initScrollCenter();
    });

    const handleMouseScroll = (e) => {
      e.preventDefault();
      let delta = 0;
      if (!e) e = window.event;
      if (e.wheelDelta) {
        //IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
        delta = e.wheelDelta / 120;
        if (window.opera) delta = -delta; //因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
      } else if (e.detail) {
        //FF浏览器使用的是detail,其值为“正负3”
        delta = -e.detail / 3;
      }
      if (delta) {
        toggleZoom(delta);
      }
    };

    const handleZoom = () => {
      // 监听鼠标滚轮事件
      //FF,火狐浏览器会识别该方法
      window.addEventListener("DOMMouseScroll", handleMouseScroll, {
        passive: false,
      });
      window.addEventListener("mousewheel", handleMouseScroll, {
        passive: false,
      });
    };
    const toggleZoom = (type) => {
      let flag = type > 0 ? 1 : 0;
      if (flag) {
        //向上滚动
        console.log("向上滚动");

        // 每次增加放大 2 倍数，最大到 10

        let temp = scale.value + 2;
        if(temp > 10) return
        scale.value = temp;

      } else {
        //向下滚动
        console.log("向下滚动");
         // 每次减小放大 2 倍数，最小到 1

        let temp = scale.value - 1;
        if(temp < 1) return
        scale.value = temp;
      }
    };

    return {
      mycanvasRef,
      scale,
      state,
    };
  },
};
</script>

<style>
.wrap {
  width: 100%;
  height: 100%;
  background-color: green;
}
#mycanvas {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  transition: all 1s;
  /* scale: 4 4; */
  background-color: aqua;
}
</style>
