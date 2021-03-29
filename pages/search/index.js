// pages/search/index.js
import { request } from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
goods:[],
cancel:false
  },
  Time:-1,
  // 输入框的值改变了就会触发
  handeleinput(e){
const {value}=e.detail

if(!value.trim()){
  this.setData({
    goods:[],
    cancel:false,
    // inputvalue:""
  })
  clearTimeout(this.Time);
return
}
this.setData({
  cancel:true
})
 clearTimeout(this.Time);
  this.Time=setTimeout(()=>{
    this.qsearch(value)
  },1000);




  },
   async qsearch(query){
      const res=await request({
        url:"/goods/qsearch",data:{query}
      });
      console.log(res.data.message);
      this.setData({
        goods:res.data.message
      })
      
  },
  cancelvalue(){
this.setData({
  inputvalue:"",
  cancel:false,
  goods:[]
})

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  
})