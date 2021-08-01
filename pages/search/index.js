// pages/search/index.js
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    isFocus:false,
    inpValue:""

  },
  TimeId:-1,
  handleInput(e){ 
   // console.log(e);
       // 1 获取输入框的值
       const {value}=e.detail;
       // 2 检测合法性
       if(!value.trim()){   
        this.setData({
          goods:[],
          isFocus:false,
          
          
        })     
         // 值不合法
         return;
       }
       this.setData({
        isFocus:true,
       })
       clearTimeout(this.TimeId);
       this.TimeId=setTimeout(()=>{
        this.qsearch(value);

       },1000)
      
       
  },

  async qsearch(query){
    const res=await request({url:"/goods/qsearch",data:{query}});
    console.log(res);
    this.setData({
      goods:res
    })
  },

  handleCancel(){
    this.setData({
      goods:[],
      isFocus:false,
      inpValue:""
    })
 

  }

  
})