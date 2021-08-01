// 0 引入 用来发送请求的 方法 一定要把路径补全
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    catesList:[],
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   },
    // })
    this.getSwiperList();
    this.getCateList();
    this.getFloorList()
  },

  //获取轮播图数据
  getSwiperList(){
    request({url:"/home/swiperdata"})
    .then(result=>{
      result.forEach((v, i) => {result[i].navigator_url = v.navigator_url.replace('main', 'index');})
      this.setData({
               swiperList:result
             })
    })
  },
  //获取导航图数据
  getCateList(){
    request({url:"/home/catitems"})
    .then(result=>{
      this.setData({
        catesList:result
             })
    })

  },
  //获取楼层图数据
  getFloorList(){
    request({url:"/home/floordata"})
    .then(result=>{
      for (let k = 0;k < result.length; k++) {
        result[k].product_list.forEach((v, i) => {
            result[k].product_list[i].navigator_url = v.navigator_url.replace('?', '/index?');
        });
    }
      this.setData({
        floorList:result
             })
    })

  }

  
})