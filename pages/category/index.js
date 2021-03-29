// pages/category/index.js
import {
  request
} from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightcontent: [],
    currentIndex: 0,
    scrolltop:0
    
  },
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Cates = wx.getStorageSync('cates');
    if (!Cates) {
      this.getcart();
    } else {
      if (Date.now() - Cates.time > 300000) {
        this.getcart()
      
      
      }else {
        
        
        
        this.Cates = Cates.data
        
        
        let leftMenuList = this.Cates.map(v => v.cat_name)
        let rightcontent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightcontent
        })
      }
    }
  },
   async getcart() {
    // request({
    //   url: '/categories'
    // }).then(res => {
    //   this.Cates = res.data.message
    //   wx.setStorageSync('cates', {
    //     time: Date.now(),
    //     data: this.Cates
    //   })
      
    //   let leftMenuList = this.Cates.map(v => v.cat_name)
    //   let rightcontent = this.Cates[0].children
    //   this.setData({
    //     leftMenuList,
    //     rightcontent
    //   })

    // })
const res=await request({url:'/categories'})
this.Cates = res.data.message
  wx.setStorageSync('cates', {
    time: Date.now(),
    data: this.Cates
  })
  
  let leftMenuList = this.Cates.map(v => v.cat_name)
  let rightcontent = this.Cates[0].children
  this.setData({
    leftMenuList,
    rightcontent
  })
  },
  handleitemtap(e) {

    const index = e.currentTarget.dataset.index;
    
    let leftMenuList = this.Cates.map(v => v.cat_name)
    let rightcontent = this.Cates[index].children
    this.setData({
      currentIndex: index,
     scrolltop:0,
      rightcontent
    })

  }

})