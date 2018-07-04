// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subjects: []
  },



  // 抽取函数
  getRequest: function(event) {
    var that = this;
    // 调用豆瓣接口
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/search',
      data: that.data.movieIndex,
      header: {
        'content-type': 'json'
      },
      success: function(backData) {
        // console.log(backData);
        // 把信息换算为星星的数组，处理星星的显示问题
        // 记录数据
        var backSub = backData.data.subjects;
        // 获取原始的subjects
        var oldSubjects = that.data.subjects;
        // 循环操作每一个数据
        for (var i = 0; i < backSub.length; i++) {
          // 获取星星的个数
          var starNum = backSub[i].rating.stars / 10;
          // 为了能够循环，给星星准备一个数组
          var starArr = [];
          // 跟星星的个数比较
          // 1>4 false-> 1
          // 2>4 false-> 1
          // 3>4 false-> 1
          // 4>4 false-> 1
          // 5>4 false-> 0
          for (var j = 1; j <= 5; j++) {
            starArr.push(j > Math.floor(starNum) ? 0 : 1);
          }
          // 星星数组增加到每一个subject上
          backSub[i].starArr = starArr;

          oldSubjects.push(backSub[i])

        }
        that.setData({
            subjects: oldSubjects
          }),
          wx.hideNavigationBarLoading();
      },

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 搜索电影
  searchMovie: function(event) {
    // console.log(event);
    var that = this;
    var searchValue = event.detail.value;
    wx.showNavigationBarLoading();
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/search',
      data: {
        q: searchValue
      },
      header: {
        'content-type': 'json'
      },
      success: function (backData) {
        wx.hideNavigationBarLoading();
        // 处理数据 把信息 换算为 星星的数组
        // 处理星星的显示问题
        // 记录数据
        var backSub = backData.data.subjects;

        // 循环操作每一个数据
        for (var i = 0; i < backSub.length; i++) {
          // 获取星星的个数 4.5 ->4个星
          var starsNum = backSub[i].rating.stars / 10;
          // console.log(starsNum);
          // 为了让可以循环 准备一个星星小数组
          // 记录5个星 是否可以显示
          var starsArr = [];
          // 根据个数 往数组中增加元素
          for (var j = 1; j <= 5; j++) {
            // 跟星星的个数比较
            // 1>4 false-> 1
            // 2>4 false-> 1
            // 3>4 false-> 1
            // 4>4 false-> 1
            // 5>4 false-> 0
            starsArr.push(j > Math.floor(starsNum) ? 0 : 1);
          }
          // 星星数组增加到每一个subject上面
          backSub[i].starsArr = starsArr;

        }
        // 绑定数据
        that.setData({
          subjects: backSub
        })
      }
    })
  }
})