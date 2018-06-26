package com.wyf.test_springmvc_pro.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.wyf.test_springmvc_pro.entity.TaskEntity;
import com.wyf.test_springmvc_pro.service.IIndexService;

@Controller
@RequestMapping("/")
public class IndexController extends AbstractController {
	private static final Logger LOG = LogManager.getLogger(IndexController.class);
	@Autowired
	private IIndexService indexService;

	@Override
	@RequestMapping()
	protected ModelAndView handleRequestInternal(HttpServletRequest arg0, HttpServletResponse arg1) throws Exception {
		LOG.info("进入首页");
		return new ModelAndView("index");

	}

	@RequestMapping("index")
	public String getIndex() {
		return "index";
	}

	@RequestMapping("index/getIndexData")
	public @ResponseBody String getIndexData() {
		JSONArray jsonArray = new JSONArray();
		List<TaskEntity> tasks = indexService.getAllTask();
		System.out.println(IndexController.class + "   " + tasks.size());
		if (tasks != null && tasks.size() > 0) {
			for (int i = 0; i < tasks.size(); i++) {
				try {
					JSONObject json = new JSONObject();
					json.put("server_name", tasks.get(i).getServer_name());
					json.put("server_ip", tasks.get(i).getServer_ip());
					// json.put("server_port", tasks.get(i).getServer_port());
					// json.put("status", tasks.get(i).getStatus());
					// json.put("report", "报告");
					// json.put("operation", "操作");
					// json.put("updata_time", tasks.get(i).getUpdata_time().toString());
					// json.put("start_location", tasks.get(i).getStart_location());
					jsonArray.add(json);
				} catch (Exception e) {

				}

			}
		}
		System.out.println(jsonArray);
		return JSON.toJSONString(jsonArray);
	}

	// @RequestMapping("/index/startMonitor")
	// public StringActionResult startMonitor() throws Exception {
	// String clusterName = beat().getRequest().getParameter("clusterName");
	// String serverIp = beat().getRequest().getParameter("serverIp");
	// String mail = UserInfoHelper.getUserEmail(beat().getRequest());
	// LOG.info("点击[开始] ", clusterName + serverIp + mail);
	//
	// String email = coverageservice.checkOccupyEmail(serverIp, clusterName);
	// LOG.info("email={}", email);
	// if (email.equals(mail)) {
	// LOG.info("占用者和使用者是同一人");
	// String startReturn = coverage.startJacoco(serverIp, clusterName, mail);
	// LOG.info("调启动接口 返回 " + startReturn);
	// return new StringActionResult(startReturn);
	// } else if (email.equals("") || email == null) {
	// LOG.info("未占用，提示用户去占用");
	// return new StringActionResult("notOccupy");
	// } else {
	// LOG.info("email不同，已被其他人占用，提示用户去tmp占用");
	// return new StringActionResult("occupyByOther");
	// }
	// }
	//
	// @RequestMapping("/index/stopMonitor")
	// public StringActionResult stopMonitor() throws Exception {
	// String clusterName = beat().getRequest().getParameter("clusterName");
	// String serverIp = beat().getRequest().getParameter("serverIp");
	// String mail = UserInfoHelper.getUserEmail(beat().getRequest());
	// LOG.info("点击[关闭] clusterName= " + clusterName + " serverIp=" + serverIp);
	// LOG.info("邮箱是:{}", mail);
	//
	// String email = coverageservice.checkOccupyEmail(serverIp, clusterName);
	// LOG.info("email={}", email);
	// if (email.equals(mail) || email.equals("") || email == null) {
	// LOG.info("未占用，或占用者和使用者是同一人");
	// String stopReturn = coverage.stopJacoco(serverIp, clusterName, mail);
	// LOG.info("调关闭接口 返回 " + stopReturn);
	// return new StringActionResult(stopReturn);
	// } else {
	// LOG.info("email不同，已被其他人占用，提示用户去tmp占用");
	// return new StringActionResult("occupyByOther");
	// }
	// }
	//
	// @RequestMapping("/index/resetMonitor")
	// public StringActionResult resetMonitor() throws Exception {
	//
	// String clusterName = beat().getRequest().getParameter("clusterName");
	// String serverIp = beat().getRequest().getParameter("serverIp");
	// String mail = UserInfoHelper.getUserEmail(beat().getRequest());
	//
	// LOG.info("点击[重置] clusterName= " + clusterName + " serverIp=" + serverIp);
	//
	// String email = coverageservice.checkOccupyEmail(serverIp, clusterName);
	// LOG.info("email={}", email);
	// if (email.equals(mail) || email.equals("") || email == null) {
	// LOG.info("未占用，或占用者和使用者是同一人");
	// String resetReturn = coverage.resetJacoco(serverIp, clusterName, mail);
	// LOG.info("调重置接口 返回 " + resetReturn);
	// return new StringActionResult(resetReturn);
	// } else {
	// LOG.info("email不同，已被其他人占用，提示用户去tmp占用");
	// return new StringActionResult("occupyByOther");
	// }
	// }
	//
	// @RequestMapping("/index/occupyCluster")
	// public StringActionResult occupy() throws Exception {
	//
	// String clusterName = beat().getRequest().getParameter("clusterName");
	// String serverIp = beat().getRequest().getParameter("serverIp");
	// String mail = UserInfoHelper.getUserEmail(beat().getRequest());
	// String loginUserName = UserInfoHelper.getRealName(beat().getRequest());
	// String occupyTime = beat().getRequest().getParameter("occupyTime");
	//
	// String occupyResult = coverageservice.occupySiteOnTmp(serverIp, clusterName,
	// mail, loginUserName, occupyTime);
	// if (occupyResult.contentEquals("{'code':0,'msg':'占用成功'}")) {
	// return new StringActionResult("success");
	// } else {
	// return new StringActionResult("failed");
	// }
	// }
}
