$(function() {
  var getDetailData = function() {
    var url = new URLSearchParams(location.search)
    var id = url.get('id')

    $.ajax({
      type: 'get',
      url: '/product/queryProductDetail',
      data: {
        id: id
      },
      success: function(data) {
        // console.log(data)
        var detailResult = template("detail-template",data)
        $('.mui-scroll').html(detailResult)


        var size = data.size
        var first = size.slice(0,2)
        var second = size.slice(3,5)
        var obj = {
          arr: [first,second]
          
        }
        console.log(obj)
        var sizelist = template('sizeTemplate',obj)
        $('.detail-size').append(sizelist)
      }
    })
  }
  getDetailData()
})