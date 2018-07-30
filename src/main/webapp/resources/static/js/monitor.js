function createMysqlMonitor() {
	host = $('#host').val();
	port = $('#port').val();
	table = $('#table').val();
	user = $('#username').val();
	pwd = $('#password').val();
	if (host == '' || port == '' || table == '' || user == '' || password == '') {
		myalert('参数错误', '数据库地址/端口/table/用户名/密码均为必填项', 'error');
		return;
	}

	paras = '?host=' + host + '&port=' + port + '&user=' + user + '&password=' + pwd 
		+ '&table=' + table;
	
	if (!term) {
		$('#terminal').terminal(function(cmd, term){
			
		},{
	        prompt: '',
	        greetings: null,
	        onInit: function(terminal) {
	        	term = terminal;
	        }
	    });
	}

	domain = window.location.host;
	target = domain.indexOf(':') > 0 ? domain : domain + ':8888';
	ws = new WebSocket('ws://' + target + '/mysql/monitor' + paras);
	ws.onopen = function() {
		switchMysqlBtnStatus(true);
	};
	ws.onmessage = function(event) {
		term.echo(event.data);
	};
	ws.onclose = function(event) {
		
	};
	ws.onerror = function(event) {
		myalert('网络错误', 'socket已断开连接', 'error');
	};
}

function disConnectMysqlMonitor() {
	ws.close();
	switchMysqlBtnStatus(false);
}

function switchMysqlBtnStatus(status) {
	if (status) {
		$('#disconnect').show();
		$('#connect').hide();
	} else {
		$('#connect').show();
		$('#disconnect').hide();
	}
}

function mysqlLogContextMenu() {
	$(document).on("mousedown", function(event) {
		//button等于0代表左键，button等于1代表中键
		if (event.button == 0 || event.button == 1) {
			$("#contextMenu").stop().fadeOut(200);//获取菜单停止动画，进行隐藏使用淡出效果
		}
	});

	$('#terminal').on("contextmenu", function(event) {
		var pageX = event.pageX;//鼠标单击的x坐标
		var pageY = event.pageY;//鼠标单击的y坐标

		//获取菜单
		var contextMenu = $('#contextMenu');

		var cssObj = {
			top : pageY + 'px',//设置菜单离页面上边距离，top等效于y坐标
			left : pageX + 'px'//设置菜单离页面左边距离，left等效于x坐标
		};

		//判断横向位置（pageX）+自定义菜单宽度之和，如果超过页面宽度及为溢出，需要特殊处理；
		var menuWidth = contextMenu.width();
		var pageWidth = $(document).width();
		if (pageX + contextMenu.width() > pageWidth) {
			cssObj.left = pageWidth - menuWidth - 5 + 'px'; //-5是预留右边一点空隙，距离右边太紧不太美观；
		}
		contextMenu.css(cssObj).stop().fadeIn(200);//显示使用淡入效果,比如不需要动画可以使用show()替换;

		event.preventDefault();//阻止浏览器与事件相关的默认行为；此处就是弹出右键菜单
	});
}

function clearMysqlLog() {
	$('.terminal-output').html('');
}

function myalert(title, text, type) {
	swal({title : title, text : text, type : type});
}