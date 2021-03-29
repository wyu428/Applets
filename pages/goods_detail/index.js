// pages/goods_detail/index.js
import {
  request
} from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
  goodobject:{},
  iscollect:false
  },
  goodsinfo:{},

  /**
   * 生命周期函数--监听页面加载 
   */
  onShow: function () {
      let pages=getCurrentPages()
      let currentpage=pages[pages.length-1]
      let options=currentpage.options

    const {goods_id}=options
   this.getdetail(goods_id)
   




  },
  handcollect(){
    let iscollect=false
    let collect=wx.getStorageSync('collect')||[]
    let index=collect.findIndex(v=>v.goods_id==this.goodsinfo.data.message.goods_id)
    if(index!=-1){
      collect.splice(index,1)
      iscollect=false
      wx.showToast({
        title: '取消成功',
        icon:"success",
        mask:"true "
      })

    }else{
      collect.push(this.goodsinfo.data.message)
      iscollect=true
      wx.showToast({
        title: '收藏成功',
        icon:"success",
        mask:"true "
      })
    }
wx.setStorageSync('collect', collect)
this.setData({
  iscollect
})

  },

  //加入购物车
  handlecar(){
let cart=wx.getStorageSync('cart')||[]
let index=cart.findIndex(v=>v.goods_id==this.goodsinfo.data.message.goods_id);
if(index==-1){
  this.goodsinfo.data.message.number=1
  this.goodsinfo.data.message.checked=true
  cart.push(this.goodsinfo.data.message)
 
  
}else{
  cart[index].number++
}
wx.setStorageSync('cart', cart)
wx.showToast({
  title: '添加成功',
  icon:'success',
  mask: true,
 
})
  },
  handleimage(e){
    const url=this.goodsinfo.data.message.pics.map(v=>v.pics_mid);
    const urls=e.currentTarget.dataset.url
    
    wx.previewImage({
      
      current:urls, 
      urls: url
    })
  },
 async getdetail(goods_id){
   const goodobject=await request({
     url:'/goods/detail',
     data:{goods_id}
   });
   
   this.setData({
     goodobject:{
      goods_name:
      goodobject.data.message.goods_name,
      goods_price:goodobject.data.message.goods_price,
      pics:goodobject.data.message.pics,
      goods_introduce:goodobject.data.message.goods_introduce.replace(/\.webp/g,'.jpg'),
      iscollect


     }
   })
   this.goodsinfo=goodobject
   let collect=wx.getStorageSync('collect')||[]
 let iscollect=collect.every(v=>v.goods_id==this.goodsinfo.data.message.goods_id)
  //  console.log(goodobject);
 
}
})