
	function randDom(obj){
		$(".callerName").text(obj.callerName)
		$(".callerKey").text(obj.callerkey)
		$(".serviceName").text(obj.serviceName)
		$(".groupName").text(decodeURI(obj.groupName))
		$(".quantity").text(obj.quantity)
		$("#explain").text(decodeURI(obj.description))
	}

	function clear(){
		$("#serviceName").html("")
		$(".callerName").text("")
		$(".callerKey").text("")
		$(".serviceName").text("")
		$(".groupName").text("")
		$(".quantity").text("")
		$("#explain").text("")

	}
	function getVal(cls){
		var val=$("."+cls).val();
		return val;
	}
	function access_server(url,data,cb){
			$.ajax({
	            url:url,
	            type:'post',
	            data:data,
	            dataType:'json',
	            success:function(data){
          	 		if(cb && data.length!=0){
	            		cb(data);
	            	}
	           	 }
            })
		}
	function access_servers(url,data,type,cb){
			$.ajax({
	            url:url,
	            type:type,
	            data:data,
	            dataType:'json',
	            success:function(data){
          	 		if(cb && data.length!=0){
	            		cb(data);
	            	}
	           	 }
            })
		}
		function showOrhide(obj){
		if(obj){
			$(".mark").show()
			$(".seeDetails").show()
		}else{
			$(".mark").hide()
			$(".seeDetails").hide()
		}
	}
	function sOrh(obj){
		if(obj){
			$(".mark").show()
			$(".pop").show()
		}else{
			$(".mark").hide()
			$(".pop").hide()
		}
	}
	function sh(obj,flg){
		if(flg){
			$(".mark").show()
			obj.show()
		}else{
			$(".mark").hide()
			obj.hide()
		}
	}
function clears(ele){
	ele.find("input").val("")
}
//模糊查询
var index=-1;
function key(obj,e,type){
		if ( e && e.stopPropagation ){
		e.stopPropagation();
		}else{
		window.event.cancelBubble = true;
	     }
	     if ( e && e.stopPropagation ){
		e.preventDefault();
		}else{
		window.event.returnValue = false;
	     }
		if(e.keyCode==38){
			index--;

			if(index<0){
				index=obj.next().find('a').length-1;
			}
			
		}else if(e.keyCode==40){
			index++;
			if(index>obj.next().find('a').length-1){
				index=0;
			}
		}else if(e.keyCode==13){
			var text=obj.next().find("a").eq(index).text();
			if(text){
				if(type ){
					obj.find(".os").append('<span class="per" uid="'+text+'"><i>'+text+'</i><a href="javascript:;" class="dlt">X</a></span>')
					$(".owner").val("").blur()
				}else{
					obj.val(text)
				}
				 obj.next().hide()
           		index=-1;
          		 obj.next().find("a").removeClass()
			}else{
				if(!type){
					 obj.next().hide()
				}
			}
          
		}
		obj.next().find("a").eq(index).addClass("active").siblings().removeClass()
	}
function  fuzzySearch(obj){
	$(".owner").on("keyup",function(e){
		var val=$(this).val(),str="";
		$(".persons").show()
		if(obj){
			key($(this).parent(),e,true)
		}else{
			key($(this),e)
		}
		
		if(e.keyCode==38 || e.keyCode==40 ||e.keyCode==13) return;
		access_server("/service/getbspusername",{"name":val},function(data){
			var obj=data;
			if(data) {
			    $.each(obj,function(i){
				    str+='<a href="javascript:;">'+obj[i].userName+'</a>'
			    })
			    $(".persons").html(str)
			}
		})
	})
	$(".position .persons").on("click","a",function(){
		$(".owner").val($(this).text())
		$(this).parent().hide()
	})
}
function select(url,name,obj){
	$(".owner").on("keyup",function(e){
		var val=$(this).val(),str="";
		$(".persons").show()
		if(obj){
			key($(this).parent(),e,true)
		}else{
			key($(this),e)
		}
		
		if(e.keyCode==38 || e.keyCode==40 ||e.keyCode==13) return;
		access_server(url,{name:val},function(data){
			var obj=data;
			if(data) {
			    $.each(obj,function(i){
				    str+='<a href="javascript:;">'+obj[i].userName+'</a>'
			    })
			    $(".persons").html(str)
			}
		})
	})
	$(".position .persons").on("click","a",function(){
		$(".owner").val($(this).text())
		$(this).parent().hide()
	})
}
	$(document).click(function(){
		/* $(".persons").click(function(){
	     return;
	   })*/
		index=-1;
	   $(".persons").hide().html("").find("a").removeClass()
	 })
	
//部门树的选择
if($(".cl").text()){
	$(".cl").on("click",function(){
		sh($(".popup"))
		$("#browser").find(".section").removeClass("active")
	})
}

	$("#browser").on("click",".section",function(){
		$("#browser").find(".section").removeClass("active")
		$(this).addClass("active")
	})
	$(".sure").on("click",function(){
		var sec=$("#browser .active").text(),
			id=$("#browser .active").prev().attr("val");
		if(sec){
			$(".org").val(sec).attr("oid",id)
		}
		sh($(".popup"))
        $("#browser").find(".section").removeClass("active")

	})
//折线图设置
function formatNumber(num, precision, separator) {
    var parts;
    if (!isNaN(parseFloat(num)) && isFinite(num)) {
        num = Number(num);
        num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString();
        parts = num.split('.');
        parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));

        return parts.join('.');
    }
    return NaN;
}
Date.prototype.Format = function(fmt){ 
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}
function formatFullDate(timeSign){
    return new Date(timeSign).Format("yyyy-MM-dd hh:mm:ss");
}
function sum(data,obj){
	 obj.prev().find(".sum").text("")
    obj.prev().find(".max").text("")
    obj.prev().find(".min").text("")
	if(data[0]){
		var sum=0,max=0,min=data[0][1];
		   $.each(data,function(i){
		   if(data[i][1]!=0){
		   		sum=Number((data[i][1]*1+sum).toFixed(2));
		   }
            
            if(data[i][1]>max){
                max=data[i][1]
            }
            if(data[i][1]<=min){
                min=data[i][1]
            }
            
        })
     var average=(sum/(data.length)).toFixed(4);
    if(obj.prev().find(".sum").attr("type")){
    	obj.prev().find(".sum").text(formatNumber(average.toString()))
			
    }else{
			obj.prev().find(".sum").text(formatNumber(sum.toString()))
		} 
    
    obj.prev().find(".max").text(formatNumber(max.toString()))
    obj.prev().find(".min").text(formatNumber(min.toString()))
	}
    
 
}
function rendChart(url,dt){
	access_server(url,dt,function(data){
		$.each(data,function(i){
			data[i].name=decodeURIComponent(data[i].name).replace(/\+/g,' ')
		})
		showChart(s,data[0])
		showChart(su,data[1])
		showChart(se,data[2])
		 sum(data[0].data,$("#s"))
        sum(data[1].data,$("#st"))
        sum(data[2].data,$("#se"))
	})
}   
       