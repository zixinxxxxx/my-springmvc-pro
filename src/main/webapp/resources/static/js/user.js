function indexFormatter(value, row, index) {  
	return index+1;  
}

function roleNameFormatter(value,row) {
	return roles[value];
}

function roleOperFormatter(value,row) {
	if (!admin || row.role == 1) {
		return '无操作权限';
	}
	
	data = ' data-id="'+row.id+'" data-username="'+row.username+'" data-realname="'+row.realname+'" data-email="'+row.email+'" data-role="'+row.role+'"data-department="'+row.department+'"';
	return '<div class="btn-group">'
		+'<button type="button" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#userRoleDialog"'+data+'><i class="fa fa-edit"></i> 修改</button>'
		+'<button type="button" class="btn btn-danger btn-xs" onclick="deleteUserRole('+row.id+')"><i class="fa fa-remove"></i> 删除</button>'
		+'</div>';
}

function initUserRoleDialog() {
	$('#userRoleDialog').on('show.bs.modal', function (event) {
		if(event.relatedTarget != undefined && event.relatedTarget!=null ){
			var button = $(event.relatedTarget);
			var id = button.data('id');
			$('#id').val(id);
			if (id > 0) {
				$('#username').val(button.data('username'));
				$('#realname').val(button.data('realname'));
				$('#email').val(button.data('email'));
				$('#department').val(button.data('department'));
				$('#role').val(button.data('role'));
			}
		}
	});
}

function getUserRoleList(value) {
	if (value == '') {
		$('#addBtn').attr("disabled", true);
		$('#user_list').bootstrapTable('removeAll');
		return;
	}

	$.getJSON('/user/rolelist?type=' + value, function(json) {
		admin = json.admin;
		$('#addBtn').attr("disabled", !admin);
		$('#user_list').bootstrapTable('destroy');
		$("#user_list").bootstrapTable({data: json.data});
	});
}

function saveUserRole() {
	username=$('#username').val();
	if (username == '') {
		alert('请填写用户名');
		return;
	}
	realname=$('#realname').val();
	if (realname == '') {
		alert('请填写真实姓名');
		return;
	}
	email=$('#email').val();
	if (email.indexOf('@') <= 0) {
		alert('请填写有效的邮箱地址');
		return;
	}
	
	department=$('#department').val();
	role=$('#role').val();
	id=$('#id').val();
	site=$('#sites').val();
	$.ajax({
		type:'post',
		url:'/user/saverole',
		async:true,
		data:{id:id,username:username,realname:realname,email:email,department:department,role:role,site:site},
		dataType:'json',
		success:function(data){
			if (data.code == 0) {
				$('#userRoleDialog').modal('hide');
				myalert('good', data.msg, 'success');
				getUserRoleList($('#sites').val());
			} else {
				myalert('提示', data.msg, 'error');
			}
		}
	});
}

function deleteUserRole(id) {
	$.get('/user/deleterole?id='+id, function(data) {
		if (data) {
			myalert('good', '删除成功', 'success');
			getUserRoleList($('#sites').val());
		} else {
			myalert('提示', '删除失败', 'error');
		}
	});
}

function myalert(title, text, type) {
	swal({title : title, text : text, type : type});
}