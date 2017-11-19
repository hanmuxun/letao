$(function () {
	var productManage = function (pageNum) {
		$.ajax({
			type: 'get',
			url: '/product/queryProductDetailList',
			data: {
				page: pageNum || 1,
				pageSize: 5
			},
			success: function (data) {
				console.log(data)
				var productResult = template('product-template', data)
				$('tbody').html(productResult)

				$('.pagination').bootstrapPaginator({
					/*当前使用的是3版本的bootstrap*/
					bootstrapMajorVersion: 3,
					/*配置的字体大小是小号*/
					size: 'small',
					/*当前页*/
					currentPage: data.page,
					/*一共多少页*/
					// 总页数=数据的总数/每页显示多少条数据
					totalPages: Math.ceil(data.total / data.size),
					/*点击页面事件*/
					onPageClicked: function (event, originalEvent, type, page) {
						/*改变当前页再渲染 page当前点击的按钮的页面*/
						productManage(page);
					}
				});
			}
		})
	}
	productManage()
	initUpload()

	$('#productform').bootstrapValidator({

		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			// 字段名是name属性的值
			proName: {
				validators: {
					notEmpty: {
						message: '请输入商品名称'
					}
				}
			},
			// 字段名是name属性的值
			proDesc: {
				validators: {
					notEmpty: {
						message: '请输入商品描述'
					}
				}
			},
			// 字段名是name属性的值
			num: {
				validators: {
					notEmpty: {
						message: '请输入商品库存'
					}
				}
			},
			// 字段名是name属性的值
			price: {
				validators: {
					notEmpty: {
						message: '请输入商品价格'
					}
				}
			},
			// 字段名是name属性的值
			oldPrice: {
				validators: {
					notEmpty: {
						message: '请输入商品原价'

					}
				}
			},
			// 字段名是name属性的值
			size: {
				validators: {
					notEmpty: {
						message: '请输入商品尺码'
					}
				}
			}
		},
	}).on('success.form.bv', function (e) {
		// Prevent form submission
		e.preventDefault();
		// Get the form instance
		var $form = $(e.target);
		// console.log($form.serialize());
		 //console.log($form); 
		// serialize(); 序列化 
		// send() 对象-- 这是自己传
		// http协议要的是什么 键值对  key=value&key1=value1
		// Get the BootstrapValidator instance
		var bv = $form.data('bootstrapValidator');
		// 使用ajax提交表单数据
		var data = $form.serialize();
		//console.log(data);

		$.each(picList,function(i,item) {
			// console.log(i,item)
			data+='&picName'+(i+1)+'='+item.picName+'&picAddr'+(i+1)+'='+item.picAddr;
		})
		// console.log(data)

		data = data+'&brandId=4';


		$.ajax({
			type: 'post',
			url: '/product/addProduct',
			data: data,
			success: function(data) {
				console.log(data)
				$('#product-modal').modal('hide');
				productManage()
			}
		})
	});


})


var picList= []
var initUpload = function() {
	$('#pic').fileupload({
		url: ' /product/addProductPic',
		done: function(e, data) {
			$('.fileupload').append('<img width="50" height="auto" src="'+data.result.picAddr+'" alt="">')
			picList.push(data.result)
		}
	})
}