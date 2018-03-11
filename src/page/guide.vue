<template>
    <div>
        <div class="fast-build-page">
            <div class="jianju" style="height:75px"></div>
            <p class="h1"
               style="text-indent: 69px;text-align: center;margin:0 auto;">
                教程
            </p>
            <div class="jianju" style="height:14px"></div>
            <p>
                浏览器：目前只做了谷歌浏览器的兼容
            </p>
            <p>
                <img src="../assets/img/1.png">
                如果不需要云端保存数据的话，所有功能都要从这个按钮开始
            </p>
            <p>
                <img src="../assets/img/2.png">
                点击“分配时间”按钮后弹出对话框进行分配总时长。如果接下来6个小时需要规划，那就输入7或者8
            </p>
            <p>
                <img src="../assets/img/3.png">
                点击这个加号增加时间块，可以对时间块进行命名。
                <img src="../assets/img/4.png">
            </p>
            <p>
                <img src="../assets/img/5.png">
                可以拖动左右端点或者时间块来调整时间
            </p>
            <p>
                <img src="../assets/img/6.png">
                也可以在这里输入准确时间（支持多种格式）来控制时间块长度
            </p>
            <p>
                <img src="../assets/img/7.png">
                点击这里进行删除时间块
            </p>
            <p>
                <img src="../assets/img/8.png">
                一切分配完毕就点击这里开始追踪时间，追踪时间就代表你准备好开始做分配的事情了
            </p>
            <p>
                <img src="../assets/img/9.png">
                当你提前完成一件事的时候就可以点击完成按钮，它可以帮你调整好各个时间块
            </p>
            <p>
                <img src="../assets/img/10.png">
                如果你认为这件事有可能花比计划更多的时间，那就点“延迟完成”，超过计划时间就会自动延长该时间块并调整后续时间块。不需要自动延迟时，点击“取消延迟”
            </p>
            <p>
                <img src="../assets/img/11.png">
                如果有一些计划外的突发事件发生让你不得不暂停当前做好的规划，那可以点击“突发事件暂停”，它会帮你记录这次突发事件，并调整各个时间块。记得在突发事件结束后点击“结束暂停”
                <img src="../assets/img/12.png">
            </p>
            <p>
                <img src="../assets/img/13.png">
                所有任务都完成后会显示本次分配时间内各事件的时间信息。如果有登录帐号的话这些信息就会提交到云端
            </p>
            <p>
                <img src="../assets/img/14.png">
                想要拥有云端记录功能的话要点这里进行注册和登录
            </p>
            <p>
                <img src="../assets/img/15.png">
                点击用户名就可以查看以往的时间记录
                <img src="../assets/img/16.png">
            </p>
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations,mapActions} from 'vuex'
    export default {}
</script>

<style>
</style>
