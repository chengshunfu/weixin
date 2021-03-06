// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onShow(){
    let address = wx.getStorageSync('address');
    this.setData({
        address
    })
  },

handlerAddress(){
   wx.getSetting({
       success: (result)=>{
           const scopeAddress = result.authSetting['scope.address'];
           if(scopeAddress===true||scopeAddress===undefined){
               wx.chooseAddress({
                   success: (result1)=>{
                    wx.setStorageSync('address', result1);
                   }
               });
           }else{
               wx.openSetting({
                   success: (result2)=>{
                       wx.chooseAddress({
                           success: (result3)=>{
                               wx.setStorageSync('address', result3);
                           }
                       });
                   }
               });
           }
       }
   });
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})