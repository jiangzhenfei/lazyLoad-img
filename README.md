# lazyLoad-img

#### 适用于所有的苹果手机和安卓手机的h5
#### IntersectionObserver在不同的手机端的表现形式不一样
性能非常好，但是安卓手机的表现不如人意，在iPhone手机的表现一直，所以在安卓手机还是利用scroll时间来监听图片是否进入可视区域，
#### 作为兼容安卓，scroll时间监听浏览器下拉，待到进入可视区域，才会执行操作
#### 原理就是在可视区域内，将img标签的data-src="url"的值赋值给src,使得图片开始加载
#### 使用
```js
 lazyLoad('[data-src]')
```
