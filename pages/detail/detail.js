// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取id值
    console.log(options.movieId);
    // 接收id
    var movieId = options.movieId;
    // 保存this
    var that = this;
    // 根据id 查询电影的详细信息
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/subject/' + movieId,
      header: {
        'content-type': 'json'
      },
      success: function (backData) {
        console.log(backData)
        that.setData({
          movieData: backData.data
        })
      }
    })
    // 回调函数中 渲染页面
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