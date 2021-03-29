let time=0
export const request=(params)=>{ 
  time++ 
  wx.showLoading({
    title: '加载中',
    mask:true
  })
  
 
  const baseurl="https://api-hmugo-web.itheima.net/api/public/v1";
  return new Promise((resolve,reject)=>{
wx.request({
 ...params,
 url:baseurl+params.url,
 success:(result)=>{
   
   
   resolve(result);
 },
 fail:(err)=>{
   reject(err)
 },
 complete:()=>{
   time--
   if(time==0){
    wx.hideLoading() 
   }
    
 }
})
  })
}