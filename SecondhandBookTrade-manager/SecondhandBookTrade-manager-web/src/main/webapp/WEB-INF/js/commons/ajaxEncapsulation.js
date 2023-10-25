/*****************************************************************
jQuery Ajax封装通用类 (xander) 
*****************************************************************/
$(function(){
	/**
	* ajax封装
	* url 发送请求的地址
	* data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
	* async 默认值: true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。
	* 注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
	* type 请求方式("POST" 或 "GET")， 默认为 "GET"
	* dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
	* successfn 成功回调函数
	* errorfn 失败回调函数
	*/
	jQuery.ax = function(url, data, async, type, dataType, successfn, errorfn) {
		async = (async==null || async=="" || typeof(async)=="undefined")? "true" : async;
		type = (type==null || type=="" || typeof(type)=="undefined")? "post" : type;
		dataType = (dataType==null || dataType=="" || typeof(dataType)=="undefined")? "json" : dataType;
		data = (data==null || data=="" || typeof(data)=="undefined")? {"date": new Date().getTime()} : data;
		$.ajax({
			type: type,
			async: async,
			data: data,
			url: url,
			dataType: dataType,
			beforeSend : function(){
				addloadding(); 
			},
			complete: function(){
				delloadding();
			},
			success: function(d){
				successfn(d);
			},
			error: function(e){
				errorfn(e);
			}
		});
	};
	/**
	* ajax封装
	* url 发送请求的地址
	* data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
	* successfn 成功回调函数
	*/
	jQuery.axs = function(url, data, successfn) {
		data = (data==null || data=="" || typeof(data)=="undefined")? {"date": new Date().getTime()} : data;
		$.ajax({
			type: "post",
			data: data,
			url: url,
			dataType: "json",
			beforeSend : function(){
				addloadding(); 
			},
			complete: function(){
				delloadding();
			},
			success: function(d){
				successfn(d);
			},
			error: function(e){
				errorfn(e);
			}
		});
	};
	/**
	* ajax封装
	* url 发送请求的地址
	* data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
	* dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
	* successfn 成功回调函数
	* errorfn 失败回调函数
	*/
	jQuery.axse = function(url, data, successfn, errorfn) {
	data = (data==null || data=="" || typeof(data)=="undefined")? {"date": new Date().getTime()} : data;
		$.ajax({
			type: "post",
			data: data,
			url: url,
			dataType: "json",
			beforeSend : function(){
				addloadding(); 
			},
			complete: function(){
				delloadding();
			},
			success: function(d){
				successfn(d);
			},
			error: function(e){
				errorfn(e);
			}
		});
	};
	function addloadding(){
		var loadingimg=document.createElement("img");
		loadingimg.style.position="fixed";
		loadingimg.style.zIndex="2000";
		loadingimg.src="images/loading.gif";
		loadingimg.id="loadimgid";
		var sTop=document.body.scrollTop+document.documentElement.scrollTop;
		var w=document.body.clientWidth;
		loadingimg.style.top=(sTop+200)+"px";
		loadingimg.style.left=(w-62)/2+"px";
		loadingimg.style.height="62px";
		loadingimg.style.width="62px";
		document.body.appendChild(loadingimg);
	}
	function delloadding(){
		var id = document.getElementById("loadimgid");
		document.body.removeChild(id);
	}
}); 

/*封装后ajax调用示例*/
/*$.ax(url,null,null,null,null, 
function(data){
	var jsonObjDataFile = {};
	jsonObjDataFile.Rows = data.rows;
	jsonObjDataFile.total = data.total;
	setDataFieldGrid(jsonObjDataFile);
}, function(){
	alert("出错了");
}
);*/
/*$.axs(url,null,function(data){
	var jsonObjDataFile = {};
	jsonObjDataFile.Rows = data.rows;
	jsonObjDataFile.total = data.total;
	setDataFieldGrid(jsonObjDataFile);
});*/
/*
$.axse(url,null,function(data){
	var jsonObjDataFile = {};
	jsonObjDataFile.Rows = data.rows;
	jsonObjDataFile.total = data.total;
	setDataFieldGrid(jsonObjDataFile);
	},function(){
	pop("调用失败",0);
});
*/
/*原生jquery ajax调用示例*/
/*
$.ajax({
	 url:url,
	 async : false,
	 type : 'get',
	 contentType : 'application/json',
	 //data : str,
	 error:function(data){
		 layer.msg("请求失败");
	 },beforeSend : function(){
		 index = loadingTO();
	 },complete: function(){
		 loadindClose(index); 
	 },
	 success:function(data){
		 layer.confirm("str", {
			  btn: ['确定','取消'] //按钮
			}, function(){
				test();
			});
		 var jsonObjDataFile = {};
		 jsonObjDataFile.Rows = data.rows;
		 jsonObjDataFile.total = data.total;
		 setDataFieldGrid(jsonObjDataFile);
	 }
});*/
