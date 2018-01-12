
//该项目所有拖拽条的begin、end属性 都是 该时间段开始与结束时间 距离 开始追踪的时间 的 秒数

import store from '../store/index';

export default {
    drag: {
        store,
        bind:function (el,binding,vnode) {
            const rightHandle=$(el).children('.drag-bar__right-handle')[0],
                  leftHandle=$(el).children('.drag-bar__left-handle')[0],
                  bg=$(el).children('.drag-bar__bg')[0],
                  vuexDragbar=store.state.dragBar[binding.value];
            let minBegin,maxEnd,dragbarWidth_bind;
            //↓依赖vuex计算拖拽条left最小值和right最大值↙
            //（在新增拖拽条时会依靠这个函数计算出left最小值）
            CalLimitvalue()

            //第一次新建拖拽条时设置宽度
            if(vuexDragbar.end===null){
                dragbarWidth_bind=store.state.dragBarDefaultLength
            }
            //拖拽条vuex数据都存在时获取宽度
            else{
                dragbarWidth_bind=vuexDragbar.end-
                                  vuexDragbar.begin
            }

            let maxBegin=maxEnd-dragbarWidth_bind

            /*
              下行代码原理：
                  这个括号内的内容是state数据dragBar在当前拖拽条上的left值
                  在新增拖拽条时括号内值应为null
                  然后在这个函数内就会将dom的left设置为之前计算好的minLeft
            */
            EntireDragBarPutRight(vuexDragbar.begin)
            vuexDragbar.end=vuexDragbar.begin+dragbarWidth_bind

            //-----以上是不点击拖拽条情况下的所有命令------

            //点击拖拽条左手柄触发的函数
            leftHandle.onmousedown = function (e) {
                CalLimitvalue()
                const oldClientX = e.clientX;
                const end=vuexDragbar.end
                const begin=vuexDragbar.begin
                document.onmousemove = function (e) {
                    let l = (e.clientX - oldClientX )*store.state.timeLength/store.state.dragBarWrapWidth+begin;
                    if(l<=minBegin){//左侧碰撞暂停、溢出回弹
                        vuexDragbar.begin=minBegin
                    }else if(l>=end){//右侧碰撞暂停、溢出回弹
                        vuexDragbar.begin=end
                    }else {//无碰撞、溢出情况
                        vuexDragbar.begin=l
                    }
                }
                document.onmouseup = function (e) {//用函数封装无效
                    MutationBeginEnd()
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            }

            //点击拖拽条右手柄触发的函数
            rightHandle.onmousedown = function (e) {
                CalLimitvalue()
                const oldClientX = e.clientX
                const end=vuexDragbar.end
                document.onmousemove = function (e) {
                    //e.clientX是鼠标x坐标
                    //dragWidth是不触及边缘情况下拖拽右侧的拖拽条宽度
                    let dragEnd = end+(e.clientX - oldClientX)*store.state.timeLength/store.state.dragBarWrapWidth

                    if(dragEnd>=maxEnd){
                        vuexDragbar.end=maxEnd
                    }else {
                        vuexDragbar.end=dragEnd
                    }

                }
                document.onmouseup = function (e) {
                    MutationBeginEnd()
                    document.onmousemove = null;
                    document.onmouseup = null;
                }
            }

            //点击拖拽条中部（主体/背景）手柄触发的函数
            bg.onmousedown = function (e) {
                CalLimitvalue()
                const begin=vuexDragbar.begin
                const oldClientX = e.clientX;
                const vuexWidth=vuexDragbar.end-vuexDragbar.begin
                maxBegin=maxEnd-vuexWidth
                document.onmousemove = function (e) {
                    let l = (e.clientX - oldClientX)*store.state.timeLength/store.state.dragBarWrapWidth+begin;
                    EntireDragBarPutRight(l)
                    vuexDragbar.end=vuexDragbar.begin+vuexWidth
                };
                document.onmouseup = function (e) {
                    MutationBeginEnd()
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            };

            //--------------以下是封装的函数--------------


            //正式用mutation提交begin、end
            function MutationBeginEnd(){
                const begin=vuexDragbar.begin
                const end=vuexDragbar.end
                let payloadBegin={}
                let payloadEnd={}
                payloadBegin.index=binding.value
                payloadBegin.attr='begin'
                payloadBegin.value=begin
                payloadEnd.index=binding.value
                payloadEnd.attr='end'
                payloadEnd.value=end
                store.commit('SetDragbarSubkeyAttr',payloadBegin)
                store.commit('SetDragbarSubkeyAttr',payloadEnd)
            }

            //计算最小left以及最大right
            function CalLimitvalue() {
                minBegin=0;maxEnd=store.state.timeLength;

                //算出minBegin
                for (let i=binding.value;i>=0;i--){
                    if(!store.state.dragBar[i-1]){
                        break
                    }else if(store.state.dragBar[i-1].show===true){
                        minBegin=store.state.dragBar[i-1].end
                        break
                    }
                }

                //算出maxEnd
                for (let i=binding.value;i<=store.state.dragBar.length-1;i++){
                    if(!store.state.dragBar[i+1]){
                        break
                    }else if(store.state.dragBar[i+1].show===true){
                        maxEnd=store.state.dragBar[i+1].begin
                        break
                    }
                }

            }

            //根据左端点判断拖拽条放入情况
            //并根据判断结果操作拖拽条dom的左端位置
            function EntireDragBarPutRight(l) {
                vuexDragbar.begin=(function(){
                    switch (true){
                        case minBegin>maxBegin:
                            alert('没有空间放置该拖拽条')
                            document.onmousemove = null;
                            vuexDragbar.show=false
                            break

                        //新建拖拽条时这个l为null
                        //接下来这个判断语句就会成立
                        case l<=minBegin:
                            return minBegin
                        case minBegin<l&&l<maxBegin:
                            return l
                        case maxBegin<=l:
                            return maxBegin
                        default:
                            console.error('Something go wrong when you put DragBar in. (from fn EntireDragBarPutRight)');
                    }
                }())
            }


        }
    }
}