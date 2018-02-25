<template>
    <div class="drag-bar__filling">
        <div class="drag-bar__name">
            <span>
                <slot></slot>
            </span>
        </div>
        <div class="drag-bar__bg" :style="{width:right-left-20+'px'}"></div>
        <div class="drag-bar__left-handle"></div>
        <div class="drag-bar__right-handle"></div>
    </div>
</template>

<script>
    export default {
        props: ['left','right'],
    }
</script>

<style>

    .drag-bar__filling{
        width: 220px;
        height: 100%;
        left:0;
        position: absolute;
        cursor:all-scroll;
    }
    .drag-bar__name{
        position: absolute;
        top: -24px;
        left: 50%;
        transform: translateX(-50%);
        background: #d5e7fb;
        border-radius: 9px;
        padding: 2px 8px;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        -khtml-user-select: none;
        user-select: none;
        text-align: center;
        cursor: default;
    }
    .drag-bar__name span{
        position: relative;
        white-space: nowrap;
    }
    .drag-bar__name:before{
        content: '';
        text-align: center;
        position: absolute;
        border-bottom: 9px #d5e7fb solid;
        border-right: 9px #d5e7fb solid;
        transform: matrix(1,1,-1,1,-4,16);
        left: 50%;
    }
    .drag-bar__bg{
        /*width: 200px;*/
        background:rgb(85, 143, 208);
        height:10px;
        top:9px;
        position:absolute;
        left:10px;
    }
    .drag-bar__right-handle{
        width: 16px;
        height: 16px;
        top: 4px;
        background:#e6e6e6;
        position: absolute;
        right: 0;
        border-radius:6px;
        border:2px rgb(85, 143, 208) solid;
        cursor:e-resize;
    }
    .drag-bar__left-handle{
        width: 16px;
        height: 16px;
        top: 4px;
        background:#e6e6e6;
        position: absolute;
        border-radius:6px;
        border:2px rgb(85, 143, 208) solid;
        left: 0;
        cursor:e-resize;
    }
</style>
