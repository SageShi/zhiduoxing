// pages/home1/document/document.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*currentData: 0,
    docList: [
      {
        name: 'test',
        src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
        type: 'icon/PDF.png',
      },
      {
        name: 'test',
        src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
        type: 'icon/PDF.png',
      },
      {
        name: 'test',
        src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
        type: 'icon/WORD.png',
      },
      {
        name: 'test',
        src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
        type: 'icon/PDF.png',
      }
    ],*/
  },
  clickDoc:function(e){
    /*var src = e.currentTarget.dataset.vedio // e.currentTarget
    wx.navigateTo({
      url: '../video/video?src='+src
    })*/
      wx.cloud.downloadFile({
        fileID: 'cloud://xiaochengxu-o6nj9.7869-xiaochengxu-o6nj9-1259225399/' + e.currentTarget.dataset.fileid,
         success: res => {         
              // 返回临时文件路径
              console.log(res.tempFilePath),
                wx.openDocument({
                  filePath: res.tempFilePath,
                  success: function (res) {
                    console.log('打开文档成功')
                  }
                })
            }
          })
  },

  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database({});
    const cont = db.collection('fileID');
    // 创建一个变量来保存页面page示例中的this, 方便后续使用
    var _this = this;
    /*cont.add({
      data:{
        fileid: '2018 Multimedia 02 傅立叶变换.ppt'
      },
       success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({

        })
       }
    }),*/
    db.collection('fileID').get({
      success: res => {
        this.setData({
          fileIDList: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})