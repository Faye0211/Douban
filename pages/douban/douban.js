// pages/douban/douban.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieIndex: {
      start: 0,
      count: 9
    },
    subjects: []
  },
  // 抽取的函数
  getData: function (event) {
    // 保存起来
    var that = this;
    // 调用豆瓣接口
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/top250',
      data: that.data.movieIndex,
      success: function (backData) {
        // 处理数据 把信息 换算为 星星的数组
        // 处理星星的显示问题
        // 记录数据
        var backSub = backData.data.subjects;
        // 获取原始的subjects
        var oldSubjects = that.data.subjects;
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
          // 追加到数组中
          oldSubjects.push(backSub[i]);
        }
        // 绑定数据
        that.setData({
          subjects: oldSubjects
        })
        // 关闭loading动画
        wx.hideNavigationBarLoading();
      },
      header: {
        'content-type': 'json'
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
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

  },
  // 触底事件
  onReachBottom: function (event) {
    // console.log(event);
    // 显示loading动画
    wx.showNavigationBarLoading();

    // 获取数据 原始索引 累加 再去获取数据
    // 起始索引累加
    this.data.movieIndex.start += this.data.movieIndex.count;

    // 回调函数中 关闭loading动画 
    // 调用函数
    this.getData();
  },
  // 跳转到搜索页
  toSearch: function (event) {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  // 去到详情页
  toDetail: function (event) {
    // console.log(event);
    // 获取数据
    var movieId = event.currentTarget.dataset.id;

    // 跳转到详情页
    wx.navigateTo({
      url: '/pages/detail/detail?movieId=' + movieId,
    })
  }
})