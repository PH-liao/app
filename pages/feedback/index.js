// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"体验问题",
        isActive:true
      },
      {
        id:1,
        value:"商品、商家投诉",
        isActive:false
      }
    ],
    latitude:22.8244,
    longitude:113.694857,
    scale:12,
    markers:[
      {
        latitude:22.8244,
        longitude:113.694857,
        width:30,
        height:30
      }
    ]
    
  },

  handleTabsItemChange(e){
    const{index} = e.detail;
     // 2 修改源数组
     let { tabs } = this.data;
     tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
     // 3 赋值到data中
     this.setData({
       tabs
     })

  },
  call(){
    wx.makePhoneCall({
      phoneNumber: '1536170287'
    })
  }

 
})