// miniprogram/pages/allPages/ManagerPages/noticeManager/noticeManager.js
let currentPage = 0 // 当前第几页,0代表第一页 
let pageSize = 4 //每页显示多少数据 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeList: [],
    noticeListShow: [],
    listButtons: [
      {
        type: 'warn',
        text: '删除',
      }
    ],
  },
  getNotice() {
    // let that = this;
    // let imgArr = [];
    // wx.cloud.database().collection("notice").get({
    //   success(res) {
    //     that.setData({
    //       noticeList: res.data
    //     })
    //   },
    //   fail(res) {
    //     wx.showModal({
    //       title: '警告',
    //       content: '获取通知数据失败',
    //       showCancel: false
    //     })
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getNotice()
    //保证第二次点进来之后的正常加载
    currentPage = 0;
    this.data.noticeList = [];
    this.noticeListShow = [];
    this.data.loadMore = false;
    this.data.loadAll = false;
    this.getData()
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

  //页面上拉触底事件的处理函数
  onReachBottom: function () {
    console.log("上拉触底事件")
    let that = this
    if (!that.data.loadMore) {
      that.setData({
        loadMore: true, //加载中  
        loadAll: false //是否加载完所有数据
      });
      //加载更多，这里做下延时加载
      setTimeout(function () {
        that.getData()
      }, 300)
    }
  },
  //访问网络,请求数据  
  getData() {
    let that = this;
    //第一次加载数据
    if (currentPage == 1) {
      this.setData({
        loadMore: true, //把"上拉加载"的变量设为true，显示  
        loadAll: false //把“没有数据”设为false，隐藏  
      })
    }
    console.log(currentPage)
    //云数据的请求
    wx.cloud.database().collection("notice").orderBy('Year', 'desc')              //时间逆序
      .orderBy('Month', 'desc')
      .orderBy('Date', 'desc')
      .orderBy('Hour', 'desc')
      .orderBy('Minutes', 'desc')
      .skip(currentPage * pageSize) //从第几个数据开始
      .limit(pageSize)
      .get({
        success(res) {
          if (res.data && res.data.length > 0) {
            console.log("请求成功", res.data)
            currentPage++
            //把新请求到的数据添加到dataList里  
            let list = that.data.noticeListShow.concat(res.data)
            that.setData({
              noticeList: list, //获取数据数组    
              noticeListShow: list,
              loadMore: false //把"上拉加载"的变量设为false，显示  
            });
            if (res.data.length < pageSize) {
              that.setData({
                loadMore: false, //隐藏加载中。。
                loadAll: true //所有数据都加载完了
              });
            }
          } else {
            that.setData({
              loadAll: true, //把“没有数据”设为true，显示  
              loadMore: false //把"上拉加载"的变量设为false，隐藏  
            });
          }
        },
        fail(res) {
          console.log("请求失败", res)
          that.setData({
            loadAll: false,
            loadMore: false
          });
        }
      })
  },

//滑动删除
  slideButtonTap:function(e){
    var id = e.currentTarget.dataset.id
    var that = this
    wx.showModal({
      title: '注意',
      content: '你确定要删除该通知？',
      success: function (res) {
        if (res.confirm) {
          that.deleteNotice(id)
        }
      }
    })
  },
  deleteNotice: function (ID) {
    wx.cloud.callFunction({
      name: 'remove',
      data: {
        id: ID,
        collection: 'notice'
      },
      complete: res => {
        wx.showToast({
          title: '删除成功',
        })
      },
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})