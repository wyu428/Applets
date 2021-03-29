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
  async handlechoose() {
    //获取权限状态
    try {
      const res1 = await getSetting();
      const scopeaddress = res1.authSetting["scope.address"];
      if (scopeaddress == false) {
        await openSetting()
      }
      const address = await chooseAddress()
      wx.setStorageSync('address', address)
      // console.log(res2);

    } catch (error) {
      console.log(error);

    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow() {
    const address = wx.getStorageSync('address')
    const cart = wx.getStorageSync('cart') || []
    // const allcheck=cart.length?cart.every(v=>v.checked):false性能优化
    this.setCart(cart)
    this.setData({address})
    // let totalnum = 0
    // let totalprice = 0
    // let allcheck = true
    // cart.forEach(v => {
    //     if (v.checked) {
    //       totalnum += v.number
    //       totalprice += v.number * v.goods_price
    //     } else {
    //       allcheck = false
    //     }
    //   }

    // );
    // allcheck=cart.length!=0?allcheck:false


    // this.setData({
    //   address,
    //   cart,
    //   allcheck,
    //   totalprice,
    //   totalnum

    // })
  },
  handlechange(e){
    const goods_id=e.currentTarget.dataset.id;
    let{cart}=this.data
    let index=cart.findIndex(v=>v.goods_id==goods_id)
    cart[index].checked=!cart[index].checked
    this.setCart(cart)
    // this.setData({
    //   cart
    // })
    // wx.setStorageSync('cart', cart)
    // let totalnum = 0
    // let totalprice = 0
    // let allcheck = true
    // cart.forEach(v => {
    //     if (v.checked) {
    //       totalnum += v.number
    //       totalprice += v.number * v.goods_price
    //     } else {
    //       allcheck = false
    //     }
    //   }

    // );
    // allcheck=cart.length!=0?allcheck:false
    // this.setData({
      
    //   cart,
    //   allcheck,
    //   totalprice,
    //   totalnum

    // })
    

  },
  //设置购物车状态同时，重新计算底部工具栏数据全选总价格购买的数量 
  setCart(cart){
   
    
    let totalnum = 0
    let totalprice = 0
    let allcheck = true
    cart.forEach(v => {
        if (v.checked) {
          totalnum += v.number
          totalprice += v.number * v.goods_price
        } else {
          allcheck = false
        }
      }

    );
    allcheck=cart.length!=0?allcheck:false
    this.setData({
      
      cart,
      allcheck,
      totalprice,
      totalnum

    })
    wx.setStorageSync('cart', cart)

  },
  handlecheck(){
    let {cart,allcheck}=this.data
    allcheck=!cart.every(v=>v.checked)
    cart.forEach(v=>{
      v.checked=allcheck
    })
    this.setCart(cart)
  },
  add(e){
    const goods_id=e.currentTarget.dataset.id;
    let{cart}=this.data
    let index=cart.findIndex(v=>v.goods_id==goods_id)
    cart[index].number++
    this.setCart(cart)
    
  },
  // 结算
   async afford(){
  const {address,totalnum}=this.data;
  if(!address.userName){
   await showtoast({title:"无收货地址"})
  
  }
  if(totalnum==0){
    await showtoast({title:"请添加商品"})
  }
  wx.navigateTo({
    url: '/pages/pay/index',
  })

  },
   async reduce(e){
    const goods_id=e.currentTarget.dataset.id;
    let{cart}=this.data
    let index=cart.findIndex(v=>v.goods_id==goods_id)

    cart[index].number--
    if( cart[index].number<1){
      cart[index].number=1
      
      const res=await showModal({content:"确定要删除?"})
      if (res.confirm) {
        cart.splice(index,1)
        this.setCart(cart)
      } 
      
    }
    this.setCart(cart)

   

  }





})