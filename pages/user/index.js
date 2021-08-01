// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    collectNums:0
    
  },

  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const userinfo=wx.getStorageSync("userinfo");
    const collect=wx.getStorageSync("collect")||[];

    this.setData({userinfo,collectNums:collect.length});
  },
  call(){
    wx.makePhoneCall({
      phoneNumber: '1536170287'
    })
  }

 
})