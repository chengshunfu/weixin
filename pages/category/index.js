// pages/category/index.js
//
import { request } from '../../request/index.js';
import runtime from '../../lib/runtime/runtime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList:[],
    rightMenuList:[],
    rightContent:[],
    currentIndex:0,
    scrollTop:0
  },
  Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let Cates = wx.getStorageSync('String');
    if(!Cates){
        this.getCates();
    }else{
        if(Date.now()-Cates.time>10*1000){
            this.getCates();
        }else{
            console.log('缓存数据');
            this.Cates = Cates.data;
            let leftMenuList = this.Cates.map(v=>v.cat_name);
            let rightMenuList = this.Cates[0].children;
            this.setData({
                leftMenuList,
                rightMenuList
            })
        }
    }
    
  },
  async getCates(){
      let url = '/categories';
    let res = await request({url});
    this.Cates = res;
    wx.setStorageSync('cates', {time:Date.now(),data:this.Cates});
    let leftMenuList = this.Cates.map(v=>v.cat_name);
    let rightMenuList = this.Cates[0].children;
    this.setData({
        leftMenuList,
        rightMenuList
    })
  },
  handlerAcitve(e){
      let {index} = e.currentTarget.dataset;
      let rightMenuList = this.Cates[index].children;
      this.setData({
        currentIndex:index,
        rightMenuList,
        scrollTop:0
      })
  }
})