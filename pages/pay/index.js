// pages/cart/index.js
import {
  getSetting,
  openSetting,
  chooseAddress,
  showModal,
  showtoast
} from "../../utils/async"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allcheck: false,
    totalprice: 0,
    totalnum: 0
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  
  onShow() {
    const address = wx.getStorageSync('address')
    let cart = wx.getStorageSync('cart') || []
    // const allcheck=cart.length?cart.every(v=>v.checked):false性能优化
    let carts=cart.filter(v=>v.checked)
  
    this.setData({address})
    
   
    
    let totalnum = 0
    let totalprice = 0
    
    carts.forEach(v => {
       
          totalnum += v.number
          totalprice += v.number * v.goods_price
        
      }

    );
    
    this.setData({
      
      cart:carts,
    
      totalprice,
      totalnum,
      address

    })
    wx.setStorageSync('cart', cart)

  
   


  
  },

  //设置购物车状态同时，重新计算底部工具栏数据全选总价格购买的数量 


 




})