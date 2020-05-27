// pages/goods_list/index.js
import { request } from '../../request/index.js';
import runtime from '../../lib/runtime/runtime.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
        {
            id:0,
            value:'你好',
            isActive:true      
        },
        {
            id:0,
            value:'你好',
            isActive:false      
        },
        {
            id:0,
            value:'你好',
            isActive:false      
        }
    ],
    goodsList:[]
},

QueryParams:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
},
totalPages:1,

/**
 * 生命周期函数--监听页面加载
 */
onLoad: function (options) {
  this.QueryParams.cid = options.cid;
  this.getGoodsList();
},
//子组件的点击事件被触发之后会直接调用父组件的方法，然后传索引值过来，通过索引值来更改tabs数组的isActive
handlerTapItemChange(e){
    let {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({tabs});
},
async getGoodsList(){
    let res = await request({url:'/goods/search',data:this.QueryParams});
    let total = res.total;
    this.totalPages = Math.ceil(total/this.QueryParams.pagesize);
    this.setData({
        goodsList:[...this.data.goodsList,...res.goods]
    })

    wx.stopPullDownRefresh();
},

//滚动条上拉加载生命周期
onReachBottom(){
   if(this.QueryParams.pagenum>=this.totalPages){
       wx.showToast({title:'没有下一页数据了'});
   }else{
    this.QueryParams.pagenum++;
    this.getGoodsList();
   }
},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh(){
    this.setData({
        goodsList:[]
    });
    this.QueryParams.pagenum=1;
    this.getGoodsList();
}
})