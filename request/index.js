export const request = (parmas)=>{
    return new Promise((resolve,reject)=>{
        wx.request({
            ...parmas,
            success:(result)=>{
                resolve(result)
            },
            fail:(err)=>{
                reject(err);
            }
        })
    })
}