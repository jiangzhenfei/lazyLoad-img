/**
 * 懒加载图片，在图片进入可视区域才加载，对于图片很多的h5页面较为友好
 * demo在 activity/mainCenter
 */
var lazyLoad;
if( window.IntersectionObserver && /(iPhone)/.test(navigator.userAgent) ){
    lazyLoad = function ( element ) {
        const io = new IntersectionObserver(callback)// 实例化 默认基于当前视窗})  

        // 将图片的真实url设置为data-src src属性为占位图 元素可见时候替换src

        function callback(entries){  
            entries.forEach((item) => { // 遍历entries数组
                if(item.isIntersecting){ // 当前元素可见
                    item.target.src = item.target.dataset.src + '?imageView2/0/w/200/h/200'  // 替换src
                    io.unobserve(item.target)  // 停止观察当前元素 避免不可见时候再次调用callback函数
                }   
            })
            }
        setTimeout(()=>{
            let imgs = document.querySelectorAll( element )
            imgs.forEach((item)=>{  // io.observe接受一个DOM元素，添加多个监听 使用forEach
                io.observe(item)
            })
        },200)
    }
    
}else{
    lazyLoad = function ( element ){
        var getTop = function (e) {
            var T = e.offsetTop;
            while(e = e.offsetParent) {
                T += e.offsetTop;
            }
            return T;  
        }
        var isInSight = function (el) {
            const bound = el.getBoundingClientRect();
            const clientHeight = window.innerHeight;
            //如果只考虑向下滚动加载
            //const clientWidth = window.innerWeight;
            return bound.top <= clientHeight + 0; 
        }
        var H = window.innerHeight;
        var S = document.documentElement.scrollTop || document.body.scrollTop;
        var lazyLoadImg = function (imgs) {
            var H = window.innerHeight;
            var S = document.documentElement.scrollTop || document.body.scrollTop;
            for (var i = 0; i < imgs.length; i++) {
                if( imgs[i]['isLoad'] ) {//如果该图片已经加载就跳过
                    continue;
                }
                //兼容处理，getBoundingClientRect的性能更好，但不保证较低的浏览器支持
                if( imgs[i].getBoundingClientRect  ){
                    if( isInSight( imgs[i] ) ){
                        imgs[i].src = imgs[i].getAttribute('data-src') + '?imageView2/0/w/200/h/200';
                        imgs[i]['isLoad'] = true;
                    }
                }else if (H + S > getTop(imgs[i])) {
                    imgs[i].src = imgs[i].getAttribute('data-src') + '?imageView2/0/w/200/h/200';
                    imgs[i]['isLoad'] = true;
                }
            }
        }
    
        setTimeout( ( )=>{
            let imgs = document.querySelectorAll( element )
            window.onload = window.onscroll = function () {
                lazyLoadImg(imgs);
            }
            lazyLoadImg(imgs);
        },200)
    }
}

export default lazyLoad;
