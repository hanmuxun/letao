$(function() {

  showHistoryData();
  // 2.点击搜索按钮 把关键词加入历史记录
  var searchInput = $('.search-box input');
  $('#search-btn').on('tap',function() {
    var keyWord = searchInput.val();
    // console.log(keyWord)
    
    setHistoryData(keyWord)
    location.href = './searchList.html?proNane='+keyWord
    showHistoryData()
  })

  // 3点击清空记录按钮 清空历史记录
  $('#delete').on('tap',function() {
    localStorage.removeItem('ltHistory')
    showHistoryData();
  })

  // 4点击删除按钮 删除这一条数据
  $('.search-history-list').on('tap','i',function() {
    var deleteData = $(this).siblings('span').html()
    // console.log(deleteData)
    removeHistoryData(deleteData)
    showHistoryData()
  })

  // 5点击历史列表中的字 把这个字放到地址栏跳转进行搜索
  $('.search-history-list').on('tap','span',function() {
    var keyWord = $(this).html();
    console.log(1)
    location.href = './searchList.html?proNane='+keyWord
  })
})


// 获取搜索记录
var getHistoryData = function() {
  return JSON.parse(window.localStorage.getItem('ltHistory')||'[]')

}
console.log(getHistoryData())

// 设置搜索记录
var setHistoryData = function(value) {
  // 获取历史记录
  var list = getHistoryData();
  // 遍历数组（数组去重）
  $.each(list,function(i,item) {
    if(value==item) {
      list.splice(i,1)
    }
  })
  list.push(value)
  localStorage.setItem('ltHistory',JSON.stringify(list)); 
}

// 移除数据

var removeHistoryData = function(value) {
  // 获取历史数据
  var list = getHistoryData();
  $.each(list,function(i,item) {
    if(value==item) {
      list.splice(i,1)
    }
  })
  // 把切掉后的数组 放回历史记录中
  window.localStorage.setItem('ltHistory',JSON.stringify(list));
}
// 显示历史记录
var showHistoryData = function() {
  var list = getHistoryData();
  if(list.length == 0) {
    $('.empty-history').show()
    $('.search-history').hide()
  }else {
    var historyList = template("history-template",{
      list: list
    })
    $('.search-history-list').html(historyList)
    $('.empty-history').hide();
    $('.search-history').show()
  }
}