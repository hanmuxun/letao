$(function() {
  getsearchListData()



})

$('.search-result-list').on('tap','button',function() {
  var id = $(this).data('id')
  // console.log(id)
  location.href = './detail.html?id='+id
})


var getsearchListData = function(pageNum,price,num) {
  var url = new URLSearchParams(location.search)
  var proName = url.get('proName')
  // console.log(proName)
  $.ajax({
    type: 'get',
    url: '/product/queryProduct',
    data: {
      proName: proName||'',
      page: pageNum||1,
      price: price||2,
      pageSize: 6,
      num: num||2
    },
    success: function(data) {
      console.log(data)
      var searchListResult = template('searchList-template',data);
      $('.search-result-list').html(searchListResult)
    }
  })
}