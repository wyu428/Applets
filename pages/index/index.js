//index.js
//获取应用实例
import { request } from "../../request/index.js";
const app = getApp()

Page({
  data: {
    swiperList:[],
    cateList:[],
    floorList:[]
  },
  //事件处理函数
  
  onLoad: function (options) {
  // wx.request({
  //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    
   
  //   success: (result) => {
      
  //     this.setData({
  //       swiperList:result.data.message
  //     })
  //   },
   
  // })
   
 this.getSwiperList(),
 this.getcartList(),
 this.getfloorList()
  },

 getSwiperList(){
  request({url:'/home/swiperdata'}).then(result=>{
    this.setData({
      swiperList:result.data.message
    })
  
  }
  )
   
 },
 async getcartList(){
  let res=await request({url:'/home/catitems'})
    this.setData({
      cateList:res.data.message
      
    })
  
 },
 getfloorList(){
  request({url:'/home/floordata'}).then(result=>{
    this.setData({
      floorList:result.data.message
      
    })
  
  }
  )
 }
})
