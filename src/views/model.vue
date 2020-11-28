<template>
    <div class="model-wrapper" id="model-wrapper">
        <div class="tools">
            <a-button type="dashed" size="small">
                居中显示
            </a-button>
            <a-button type="dashed" size="small" @click="autoRotate">
                自动旋转
            </a-button>
            <a-button type="dashed" size="small" @click="changeBGC">
                换背景色
            </a-button>
        </div>
    </div>
</template>
<script>
import Three3D from '../Three3D';

let modelResources = ['http://192.168.10.50:8000/吊机.glb', 'http://192.168.10.50:8000/1段.glb'];

function random(lower, upper) {
    return Math.floor(Math.random() * (upper - lower)) + lower;
}

export default {
    data() {
        return {};
    },
    created() {},
    beforeDestroy() {},
    mounted() {
        this.three3D = new Three3D({
            container: '#model-wrapper',
            stats: true,
            modelResources: modelResources,
        });
    },
    methods: {
        changeBGC() {
            let r = random(0, 255),
                g = random(0, 255),
                b = random(0, 255);
            this.three3D.setSceneBackground(`rgb(${r},${g},${b})`);
            this.three3D.render();
        },
        autoRotate() {
            this.three3D.controls.autoRotate = !this.three3D.controls.autoRotate;
        },
    },
};
</script>
<style lang="scss" scoped>
.model-wrapper {
    height: 100%;
    border: 1px solid #ccc;
    .tools {
        position: absolute;
        top: 0;
        left: 80px;
        padding: 8px 20px;

        .ant-btn {
            margin-right: 12px;
        }
    }
}
</style>
