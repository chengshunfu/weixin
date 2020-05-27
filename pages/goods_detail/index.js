// pages/goods_detail/index.js
import { request } from '../../request/index.js';
import runtime from '../../lib/runtime/runtime.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
},
GoodsInfo:{},

/**
 * 生命周期函数--监听页面加载
 */
onLoad: function (options) {
  let {goods_id} = options;
  this.getGoodsDetail(goods_id);
},

async getGoodsDetail(goods_id){
    let res = await request({url:'/goods/detail',data:{goods_id}});
    this.GoodsInfo = res;
    this.setData({
        goodsObj:{
            goods_name:res.goods_name,
            goods_price:res.goods_price,
            goods_introduce:res.goods_introduce.replace(/\.webp/g,'.jpg'),
            pics:res.pics
        }
    });
},
    handlerPreview(e){
        const urls = this.GoodsInfo.pics.map(v=>v.pics_mid);
        const current = e.currentTarget.dataset.url;
        wx.previewImage({
            current,
            urls
        })
},
handlerCardAdd(){
    //把加入购物车的数据放入缓存中，初始化是一个空数组
    let cart = wx.getStorageSync('cart')||[];
    //用缓存数组购物车数据和本地的购物车数据进行对比
    let index = cart.findIndex(v=>v.goods_id ===this.GoodsInfo.goods_id);
    
    if(index===-1){
        //如果在缓存中找不到购物车数据，先让num+1，然后把购物车数据加入缓存数组
        this.GoodsInfo.num = 1;
        cart.push(this.GoodsInfo);
    }else{
        //如果在缓存中找到了购物车数据就++
        cart[index].num++;
    }
    //把缓存数组的数据全部加入storage中去
    wx.setStorageSync('cart', cart);
    //加入成功之后调用弹框告诉用户，已经成功加入购物车数据
    wx.showToast({
        title: '加入购物车成功',
        icon: 'success',
        image: '',
        mask: true
    });
}
})