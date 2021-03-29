// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    collectnum:0
  
  },
  handleinfo(e){  
    const {userInfo}=e.detail   
    wx.setStorageSync('userInfo', userInfo) 
    wx.navigateBack({
      delta: 1,
    })
   
  
    },

  onShow(){
    const userinfo=wx.getStorageSync('userInfo')
   
    let collectnum=0
    const collect=wx.getStorageSync('collect')||[]
    collectnum=collect.length
    this.setData({
      userinfo,
      collectnum
    })
  }
 
  
 

  

})