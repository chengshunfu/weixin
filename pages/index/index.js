//index.js
//获取应用实例
import { request } from '../../request/index.js'; 
const app = getApp()

Page({
  data: {
    swiperList:[]
  },
  onLoad: function () {
    let url = 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata';
    request({url}).then(res=>{
        this.setData({
            swiperList:res.data.message
        })
    })
  }
})
