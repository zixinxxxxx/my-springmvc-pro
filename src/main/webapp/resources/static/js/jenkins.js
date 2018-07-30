function initJobsSearchBox() {
	$.get('/jenkins/getTestJobs?cluster=debug', function(data) {
		jobs = data;
		$('#jobSearcher').typeahead({
			source : data
		});
	});
	
	$('#jobSearcher').bind("change", function() {
		var job = $(this).val();
		if (job != undefined &&job != ""  && $.inArray(job, jobs) != -1) {
			if (temp != job) {
				var clusterList = document.getElementById('clusters');
				clusterList.length = 0;

				temp = job;
				$.getJSON('/jenkins/getJobParas?job=' + job, function(data) {
					if (data.Site) {
						if (data.Site.type == 'Choice') {
							clusters = data.Site.defaultValue;
							for(i = 0; i < clusters.length; i++) {
								if (clusters[i] != '') {
									clusterList.options.add(new Option(clusters[i], clusters[i]));
								}
							}
						} else {// 统一按字符串处理
							cluster = data.Site.defaultValue;
							if (cluster != '') {
								clusterList.options.add(new Option(cluster, cluster));
							}
						}
						
						if (clusterList.options.length == 0) {
							myalert('错误', '集群名为空', 'error');
						} else {
							clusterList.selectedIndex = 0; 
						}
					} else {
						myalert('错误', 'job必须配置集群名信息', 'error');
					}
				});
			}
		}
	});
}
//点击创建新任务按钮
function initForNewJobDialog() {
	//初始化form
	$('#createRpcJobForm')[0].reset()
	$('#createJmeterJobForm')[0].reset()
	$('#jobnameRPC').attr("disabled",false)
	$('#jobnameJMeter').attr("disabled",false)
	$('#connectedSiteRPC').attr("disabled",false)
	$('#connectedSiteJMeter').attr("disabled",false)
	//获取集群列表
	$.get('/jenkins/getAllCluster', function(data) {
		clusters =data;//
		$('#connectedSiteRPC').typeahead({
			source : data
		});
		$('#connectedSiteJMeter').typeahead({
			source : data
		});
	});
	
	//获取执行机列表
	$.get('/jenkins/getSlaveComputers', function(data) {
		slaveComputers =data;
		$('#slaveComputerRPC').typeahead({
			source : data
		});
		$('#slaveComputerJMeter').typeahead({
			source : data
		});
	});
}

function jobLinkFormatter(value, row) {
	url = jenkinsUrl + '/job/' + value;
	return '<a target="_blank" href="' + url + '">' + value + '</a>'
}

function jobResultFormatter(value, row) {
	if(row.clusterName!=""){
		url = visualUrl + '/echarts/cluDetail?cluster=' + row.clusterName
		return '<a href="' + url
		+ '" type="button" class="btn btn-info btn-xs">查看</a>'
	}else{
		return "";
	}
}

function tmpTriggerFormatter(value, row) {
	var para = "'" + row.clusterName + "','" + row.jobName + "'";
	var content = '<button type="button" class="btn btn-primary btn-xs" onclick="initJob('
		+ para+')">' + '初始化</button>';
	if (!deletable) {
		return content;
	}else{
		return '<button type="button" class="btn btn-danger btn-xs" onclick="updateTriggerJob('
		+ para + ',2)">' + '<i class="fa fa-remove"></i> 删除</button>'+content
		;
	}
}

function updateTriggerJob(cluster, job, type) {
	title = type == 1 ? '您确定要添加这项任务吗' : '您确定要删除这项任务吗';
	swal({
		title : title,
		text : '集群名:' + cluster + ';任务名:' + job,
		type : 'warning',
		showCancelButton : true,
		confirmButtonColor : '#DD6B55',
		confirmButtonText : '是的，我是认真的！',
		cancelButtonText : '让我再考虑一下…',
		closeOnConfirm : false,
		closeOnCancel : false
	}, function(isConfirm) {
		if (isConfirm) {
			para = 'cluster=' + cluster + '&job=' + job + '&type=' + type;
			$.getJSON('/jenkins/updateTriggerJob?' + para, function(data) {
				if (data.code == 0) {
					$('#tmp_trigger_table').bootstrapTable('refresh');
					myalert('good', '更新成功', 'success');
				} else {
					myalert('错误', data.msg, 'error');
				}
			});
		} else {
			myalert('已取消', '您取消了操作！', 'info');
		}
	});
}

function addTmpTriggerJob() {
	var job = $('#jobSearcher').val();
	var cluster = $('#clusters').val();
	if (job == '' || cluster == '') {
		myalert('错误', '任务名称/集群名称均为必填项', 'error');
		return;
	}

	$('#appendJobDialog').modal('hide');
	updateTriggerJob(cluster, job, 1);
}
//点击初始化按钮
function initJob(clusterName,jobName) {
	var jobType=$.trim($('#testTypeTap').children('.active').text());
	$('#createJobDialog').modal('show');
		$('#jobnameRPC').val(jobName) ;
		$('#jobnameRPC').attr("disabled",true);
		$('#jobnameJMeter').val(jobName) ;
		$('#jobnameJMeter').attr("disabled",true)
		if(clusterName!=""){//集群名为空时才能编辑集群名
			$('#connectedSiteRPC').val(clusterName) ;
			$('#connectedSiteRPC').attr("disabled",true);
			$('#connectedSiteJMeter').val(clusterName) ;
			$('#connectedSiteJMeter').attr("disabled",true);
		}
}


var clusters
var slaveComputers
function updateJob() {
	var jobType=$.trim($('#testTypeTap').children('.active').text());
	if(jobType=="RPC"){
		var jobName = $('#jobnameRPC').val() ;
		var siteName = $('#connectedSiteRPC').val() ;
		var slaveComputer = $('#slaveComputerRPC').val() ;
		var gitUrl = $('#urlRPC').val();
		var recipientList = $('#recipientListRPC').val();
		if(jobName==""||siteName==""||slaveComputer==""||gitUrl==""){
			myalert('错误', "必填项值不能为空", 'error');
			return;
		}
		if($.inArray(siteName, clusters)==-1){
			myalert('错误', "集群名不正确", 'error');
			return;
		}
		
		if($.inArray(slaveComputer, slaveComputers)==-1){
			myalert('错误', "slave机名称不正确", 'error');
			return;
		}
		if(gitUrl.indexOf("http://") != 0||gitUrl.indexOf(".git")==-1){
			myalert('错误', "git地址格式不正确", 'error');
			return;
		}
		if($('#jobnameRPC').attr("disabled")){//初始化job
			initRpcJob(jobName,siteName,slaveComputer,gitUrl,recipientList);
		}else{//创建job
			createRpcJob(jobName,siteName,slaveComputer,gitUrl,recipientList);
		}
		
	}else if(jobType=="JMeter"){
		var jobName = $('#jobnameJMeter').val() ;
		var siteName = $('#connectedSiteJMeter').val() ;
		var slaveComputer = $('#slaveComputerJMeter').val() ;
		var gitUrl = $('#urlJMeter').val();
		if(jobName==""||siteName==""||slaveComputer==""||gitUrl==""){
			myalert('错误', "必填项值不能为空", 'error');
			return;
		}
		if($.inArray(siteName, clusters)==-1){
			myalert('错误', "集群名不正确", 'error');
			return;
		}
		
		if($.inArray(slaveComputer, slaveComputers)==-1){
			myalert('错误', "slave机名称不正确", 'error');
			return;
		}
		if(gitUrl.indexOf("http://") != 0||gitUrl.indexOf(".git")==-1){
			myalert('错误', "git地址格式不正确", 'error');
			return;
		}
		if($('#jobnameJMeter').attr("disabled")){//初始化job
			initJmeterJob(jobName,siteName,slaveComputer,gitUrl);
		}else{//创建job
			createJmeterJob(jobName,siteName,slaveComputer,gitUrl);
		}
	}


}

function createRpcJob(jobName,siteName,slaveComputer,gitUrl,recipientList){
	$.getJSON('/jenkins/isJobNameValid?jobName=' + jobName, function(data) {
		if (data.code != 0) {
			myalert('错误', data.msg, 'error');
			return;
		}else{
			var para = 'job=' + jobName 
			+ '&siteName=' + siteName
			+ '&assignedNode=' + slaveComputer
			+ '&url=' + gitUrl
			+ '&recipientList=' + recipientList;
			
			$.getJSON('/jenkins/createRpcJob?' + para, function(data) {
				if (data.code == 0) {
					$('#createJobDialog').modal('hide');
					$('#tmp_trigger_table').bootstrapTable('refresh');
					myalert('good', data.msg, 'success');
				} else {
					myalert('错误', data.msg, 'error');
				}
			});
		}
	});
}

function initRpcJob(jobName,siteName,slaveComputer,gitUrl,recipientList){
	var para = 'job=' + jobName 
	+ '&siteName=' + siteName
	+ '&assignedNode=' + slaveComputer
	+ '&url=' + gitUrl
	+ '&recipientList=' + recipientList;
	$.getJSON('/jenkins/initRpcJob?' + para, function(data) {
		if (data.code == 0) {
			$('#createJobDialog').modal('hide');
			$('#tmp_trigger_table').bootstrapTable('refresh');
			myalert('good', data.msg, 'success');
		} else {
			myalert('错误', data.msg, 'error');
		}
	});
}



function createJmeterJob(jobName,siteName,slaveComputer,gitUrl) {
	$.getJSON('/jenkins/isJobNameValid?jobName=' + jobName, function(data) {
		if (data.code != 0) {
			myalert('错误', data.msg, 'error');
			return;
		}else{
			var para = 'job=' + jobName 
			+ '&siteName=' + siteName
			+ '&assignedNode=' + slaveComputer
			+ '&url=' + gitUrl;

			$.getJSON('/jenkins/createJmeterJob?' + para, function(data) {
				if (data.code == 0) {
					$('#createJobDialog').modal('hide');
					$('#tmp_trigger_table').bootstrapTable('refresh');
					myalert('good', data.msg, 'success');
				} else {
					myalert('错误', data.msg, 'error');
				}
			});
		}
	});


}

function initJmeterJob(jobName,siteName,slaveComputer,gitUrl){
	var para = 'job=' + jobName 
	+ '&siteName=' + siteName
	+ '&assignedNode=' + slaveComputer
	+ '&url=' + gitUrl;
	$.getJSON('/jenkins/initJmeterJob?' + para, function(data) {
		if (data.code == 0) {
			$('#createJobDialog').modal('hide');
			$('#tmp_trigger_table').bootstrapTable('refresh');
			myalert('good', data.msg, 'success');
		} else {
			myalert('错误', data.msg, 'error');
		}
	});
}

function myalert(title, text, type) {
	swal({
		title : title,
		text : text,
		type : type
	});
}