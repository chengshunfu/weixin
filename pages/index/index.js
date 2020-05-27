//index.js
//获取应用实例
import { request } from '../../request/index.js'; 
const app = getApp()

Page({
  data: {
    swiperList:[],
    cateList:[],
    foolList:[]
  },
  onLoad: function () {
    this.gitSwiperList();
    this.getCateList();
    this.getFollList();
  },
  //获取轮播图
  gitSwiperList(){
    let url = '/home/swiperdata';
    request({url}).then(res=>{
        this.setData({
            swiperList:res
        })
    })
  },
  //获取分类导航
  getCateList(){
    let url = '/home/catitems';
    request({url}).then(res=>{
        this.setData({
            cateList:res
        })
    })
  },
  getFollList(){
    let url = '/home/floordata';
    request({url}).then(res=>{
        this.setData({
            foolList:res
        })
    })
  }
})
