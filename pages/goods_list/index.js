// 0 引入 用来发送请求的 方法 一定要把路径补全
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goodsList:[]

  },
    // 接口要的参数
    QueryParams:{
      query:"",
      cid:"",
      pagenum:1,
      pagesize:10
    },
      // 总页数
  totalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.QueryParams.cid=options.cid||"";
   this.QueryParams.query=options.query||"";
   this.getGoodsList()

  },

async getGoodsList(){
  const res=await request({url:"/goods/search",data:this.QueryParams});
     // 获取 总条数
     const total=res.total;
     // 计算总页数
     this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
  this.setData({
    goodsList:[...this.data.goodsList,...res.goods]
  })
},

  handleTabsItemChange(e){
    const{index} = e.detail;
    let{tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },

  onReachBottom(){
    //console.log("触底了");
     //  1 判断还有没有下一页数据
     if(this.QueryParams.pagenum>=this.totalPages){
      // 没有下一页数据
      //  console.log('%c'+"没有下一页数据","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
      wx.showToast({ title: '没有下一页数据' });
        
    }else{
      // 还有下一页数据
      //  console.log('%c'+"有下一页数据","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

    // 下拉刷新事件 
    onPullDownRefresh(){
      // 1 重置数组
      this.setData({
        goodsList:[]
      })
      // 2 重置页码
      this.QueryParams.pagenum=1;
      // 3 发送请求
      this.getGoodsList();

      wx.stopPullDownRefresh();
    }
  

 
})