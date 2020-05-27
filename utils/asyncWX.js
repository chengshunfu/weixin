/*
    封装wx.getSetting
*/
export const getSetting = ()=>{
    return new Promise((resolve,reject)=>{
        wx.getSetting({
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                reject(err);
            }
        });
    })
}

/*
    封装wx.chooseAddress
*/
export const chooseAddress = ()=>{
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                reject(err);
            }
        });
    })
}

/*
    封装wx.openSetting
*/
export const openSetting = ()=>{
    return new Promise((resolve,reject)=>{
        wx.openSetting({
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                reject(err);
            }
        });
    })
}