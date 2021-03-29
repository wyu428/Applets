// pages/goods_list/index.js
import {
  request
} from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        value: "综合",
        isactive: true

      },
      {
        id: 1,
        value: "销量",
        isactive: false

      },
      {
        id: 2,
        value: "价格",
        isactive: false

      }
    ],
    goodlist: []

  },
  Query: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  totalpage: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.Query.cid = options.cid;
    this.getgoodlist()
    
    

  },
  onReachBottom() {
    if (this.Query.pagenum >= this.totalpage) {
      wx.showToast({
        title: '没有下一页了',
      });
    } else {
      this.Query.pagenum++;
      this.getgoodlist()
    }
  },
  async getgoodlist() {
    const res = await request({
      url: "/goods/search",
      data: this.Query
    })
    // console.log(res.data.message)
    const total = res.data.message.total;
    
    this.totalpage = Math.ceil(total / this.Query.pagesize);

    this.setData({
      goodlist:[...this.data.goodlist,...res.data.message.goods]
    })
    wx.stopPullDownRefresh()
  },
  onPullDownRefresh(){
    this.setData({
      goodlist:[]
    });
    this.Query.pagenum=1
    this.getgoodlist()
    

  },


  tabschange(e) {
    const {
      index
    } = e.detail;

    let {
      tabs
    } = this.data;

    tabs.forEach((v, i) => i == index ? v.isactive = true : v.isactive = false);


    this.setData({
      tabs
    })

  }
})