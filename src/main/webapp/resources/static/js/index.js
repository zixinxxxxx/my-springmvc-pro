function sendfeedback() {
	email = $('#mail_address').val();
	subject = $('#mail_subject').val();
	body = $('#mail_body').summernote('code');
	if (email == '' || subject == '' || body == '') {
		alert('邮箱地址/主题/内容均为必填项');
		return;
	}

	$.ajax({
		type:'post',
		url:'/user/sendmail',
		async:true,
		data:{email:email,subject:subject,message:body},
		dataType:"text",
		success:function(data){
			if (data == 'true') {
				alert("信息发送成功");
			} else {
				alert("信息发送异常");
			}
		}
	});
}