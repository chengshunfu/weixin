let ajaxTimes = 0;
export const request = (parmas)=>{
    ajaxTimes++;
    return new Promise((resolve,reject)=>{
        wx.showLoading({
            title: '加载中',
            mask: true  
        });
       let baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1';
        wx.request({
            ...parmas,
            url:baseUrl+parmas.url,
            success:(result)=>{
                resolve(result.data.message)
            },
            fail:(err)=>{
                reject(err);
            },
            complete: ()=>{
                ajaxTimes--;
                if(ajaxTimes ===0){
                    wx.hideLoading();
                }
            }
        })
    })
}