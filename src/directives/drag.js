
import store from '../store/index';

export default {
    drag: {
        store,
        bind:function (el,binding,vnode) {
            const rightHandle=$(el).children('.drag-bar__right-handle')[0],
                  leftHandle=$(el).children('.drag-bar__left-handle')[0],
                  bg=$(el).children('.drag-bar__bg')[0],
                  vuexDragbar=store.state.dragBar[binding.value];
            let minLeft,maxRight,dragbarWidth_bind;
            //↓依赖vuex计算拖拽条left最小值和right最大值↙
            //（在新增拖拽条时会依靠这个函数计算出left最小值）
            CalLimitvalue()


            //第一次新建拖拽条时设置宽度
            if(vuexDragbar.right===null){
                dragbarWidth_bind=store.state.dragBarDefaultWidth_dom
            }
            //拖拽条vuex数据都存在时获取宽度
            else{
                dragbarWidth_bind=vuexDragbar.right-
                                  vuexDragbar.left
            }


            let maxLeft=maxRight-dragbarWidth_bind

            /*
              下行代码原理：
                  这个括号内的内容是state数据dragBar在当前拖拽条上的left值
                  在新增拖拽条时括号内值应为null
                  然后在这个函数内就会将dom的left设置为之前计算好的minLeft
            */
            EntireDragBarPutRight(vuexDragbar.left)
            vuexDragbar.right=vuexDragbar.left+dragbarWidth_bind
            //DomLeftRightToMutation()//【】

            //-----以上是不点击拖拽条情况下的所有命令------

            //点击拖拽条左手柄触发的函数
            leftHandle.onmousedown = function (e) {
                CalLimitvalue()
                const vuexWidth=vuexDragbar.right-vuexDragbar.left
                let oldClientX = e.clientX
                const disX = e.clientX - el.offsetLeft;
                const right=vuexDragbar.right
                document.onmousemove = function (e) {
                    //e.clientX是鼠标x坐标
                    //el.offsetLeft是el左边x坐标
                    //【】对这一系列l等存疑
                    let l = e.clientX - disX;
                    let dragWidth = vuexWidth+oldClientX-e.clientX;
                    if(l<=minLeft){//左侧碰撞暂停、溢出回弹
                        vuexDragbar.left=minLeft
                    }else if(l>=right){//右侧碰撞暂停、溢出回弹
                        vuexDragbar.left=right
                    }else {//无碰撞、溢出情况
                        vuexDragbar.left=l
                    }
                }
                document.onmouseup = function (e) {//用函数封装无效
                    DomLeftRightToMutation()
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            }

            //点击拖拽条右手柄触发的函数
            rightHandle.onmousedown = function (e) {
                CalLimitvalue()
                const styleWidth=parseFloat($(el).css('width'))
                let oldClientX = e.clientX
                const maxWidth=maxRight-vuexDragbar.left
                const right=vuexDragbar.right
                document.onmousemove = function (e) {
                    //e.clientX是鼠标x坐标
                    //el.offsetLeft是el左边x坐标
                    //dragWidth是不触及边缘情况下拖拽右侧的拖拽条宽度
                    let dragRight = right+e.clientX - oldClientX

                    if(dragRight>=maxRight){
                        vuexDragbar.right=maxRight
                    }else {
                        vuexDragbar.right=dragRight
                    }

                }
                document.onmouseup = function (e) {
                    DomLeftRightToMutation()
                    document.onmousemove = null;
                    document.onmouseup = null;
                }
            }

            //点击拖拽条中部（主体/背景）手柄触发的函数
            bg.onmousedown = function (e) {
                CalLimitvalue()
                const disX = e.clientX - el.offsetLeft;
                const vuexWidth=vuexDragbar.right-vuexDragbar.left
                maxLeft=maxRight-vuexWidth
                document.onmousemove = function (e) {
                    let l = e.clientX - disX;
                    EntireDragBarPutRight(l)
                    vuexDragbar.right=vuexDragbar.left+vuexWidth
                };
                document.onmouseup = function (e) {
                    DomLeftRightToMutation()
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            };

            //--------------以下是封装的函数--------------


            //在抬起鼠标后根据dom获取的left、right来同步vuex中的left、right
            //因为变量作用域与闭包的规则及vue指令bind的机制，所以如果要把三个事件中这段代码写在一个函数内，只能用dom写
            function DomLeftRightToMutation(){
                const left=parseFloat($(el).css('left'))
                const right=left+parseFloat($(el).css('width'))
                let payloadLeft={}
                let payloadRight={}
                payloadLeft.index=binding.value
                payloadLeft.attr='left'
                payloadLeft.value=left
                payloadRight.index=binding.value
                payloadRight.attr='right'
                payloadRight.value=right
                store.commit('SetDragbarSubkeyAttr',payloadLeft)
                store.commit('SetDragbarSubkeyAttr',payloadRight)
            }

            //计算最小left以及最大right
            function CalLimitvalue() {
                minLeft=0;maxRight=777;

                for (let i=binding.value;i>=0;i--){
                    if(!store.state.dragBar[i-1]){
                        break
                    }else if(store.state.dragBar[i-1].show===true){
                        minLeft=store.state.dragBar[i-1].right
                        break
                    }
                }

                for (let i=binding.value;i<=store.state.dragBar.length-1;i++){
                    if(!store.state.dragBar[i+1]){
                        break
                    }else if(store.state.dragBar[i+1].show===true){
                        maxRight=store.state.dragBar[i+1].left
                        break
                    }
                }

            }

            //根据左端点判断拖拽条放入情况
            //并根据判断结果操作拖拽条dom的左端位置
            function EntireDragBarPutRight(l) {
                vuexDragbar.left=(function(){
                    switch (true){
                        case minLeft>maxLeft:
                            alert('没有空间放置该拖拽条,即将进行删除')
                            document.onmousemove = null;
                            vuexDragbar.show=false
                            break

                        //新建拖拽条时这个l为null
                        //接下来这个判断语句就会成立
                        case l<=minLeft:
                            return minLeft
                        case minLeft<l&&l<maxLeft:
                            return l
                        case maxLeft<=l:
                            return maxLeft
                        default:
                            console.error('Something go wrong when you put DragBar in. (from fn EntireDragBarPutRight)');
                    }
                }())
            }


        }
    }
}