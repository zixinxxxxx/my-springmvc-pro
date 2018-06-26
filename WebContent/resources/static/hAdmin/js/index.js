$(function() {
	// 菜单点击
	J_iframe
	$(".J_menuItem").on('click', function() {
		username = getCookie("userName");
		var url = $(this).attr('href');
		if (username) {// cookie校验，如果cookie无效，將不在iframe里跳转inpass
			$("#J_iframe").attr('src', url);
			role = $(this).attr('role');
			if (role && role == 'menuitem') {
				$('[data-toggle="dropdown"]').parent().removeClass('open');
			}
			return false;
		}
		if (url.indexOf('http://') == 0) {
			window.location.href='/';
			return false;
		}
		return true;
	});
});

function getCookie(name) {
	cookie = document.cookie;
	if (cookie.length == 0) {
		return null;
	}

	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = cookie.match(reg)) {
		return unescape(arr[2]);
	}
	return null;
}