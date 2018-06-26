package com.wyf.test_springmvc_pro.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

@Controller
@RequestMapping()
public class ResultController extends AbstractController {

	// @RequestMapping("/result")
	// public MethodActionResult result() {
	// String reportUrl = ConfigDto.getReportUrl();
	// beat().getModel().add("reportUrl", reportUrl);
	// return new MethodActionResult("/result");
	// }

	@Override
	@RequestMapping("/result")
	protected ModelAndView handleRequestInternal(HttpServletRequest arg0, HttpServletResponse arg1) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	// @Path("/result/getData")
	// @GET
	// @POST
	// public StringActionResult getData() {
	// String clusterName = beat().getRequest().getParameter("clusterName");
	// String serverIp = beat().getRequest().getParameter("serverIp");
	// LOG.info("点击【覆盖率】跳转时传的传的集群名和ip为===" + clusterName + "---" + serverIp);
	//
	// List<PackageInfoEntity> PackageInfoEntityList =
	// coverage.getClusterVersionInfoList(serverIp, clusterName);
	// LOG.info("list的大小是：==" + PackageInfoEntityList.size());
	// JSONArray jsonArray = new JSONArray();
	//
	// for (int i = 0; i < PackageInfoEntityList.size(); i++) {
	// try {
	// String tmpStr = PackageInfoEntityList.get(i).getVersion();
	// String JENKINSBUILDNUMBER = tmpStr.split("-")[3];
	// String ftp = PackageInfoEntityList.get(i).getFtpUrl();
	// ftp = ftp.split("/")[4];
	// String BRANCHNAME = ftp.replace("DJOY", "dev/Dev");
	// String BRANCHVERSION = tmpStr.split("-")[0] + "-" + tmpStr.split("-")[1] +
	// "-" + tmpStr.split("-")[2];
	//
	// JSONObject json = new JSONObject();
	// json.put("BRANCHNAME", BRANCHNAME);
	// json.put("BRANCHVERSION", BRANCHVERSION);
	// json.put("FTPADDRESS", PackageInfoEntityList.get(i).getFtpUrl());
	// json.put("COVERAGEPOINT", PackageInfoEntityList.get(i).getCoverage());
	// json.put("CARE", PackageInfoEntityList.get(i).getSubscribedPackages());
	// json.put("OPERATION", "操作");
	// json.put("JENKINSBUILDNUMBER", JENKINSBUILDNUMBER);
	// LOG.info("SubscribedPackages是：==" +
	// PackageInfoEntityList.get(i).getSubscribedPackages());
	// jsonArray.add(json);
	// } catch (Exception e) {
	//
	// }
	//
	// }
	// return new StringActionResult(JSON.toJSONString(jsonArray));
	// }
	//
	// @Path("/result/getCare")
	// @GET
	// @POST
	// public StringActionResult addCare() {
	// String clusterName = beat().getRequest().getParameter("clusterName");
	// String serverIp = beat().getRequest().getParameter("serverIp");
	// String versionNo = beat().getRequest().getParameter("versionNo");
	// // LOG.info("添加关注时传的传的集群名和ip为==="+clusterName+"---"+serverIp);
	// String allPackages = coverage.getClusterPackages(serverIp, clusterName,
	// versionNo);
	// LOG.info("allPackages是：{}==", allPackages);
	// String[] all = allPackages.split(",");
	// JSONArray jsonArray = new JSONArray();
	// for (int i = 0; i < all.length; i++) {
	// jsonArray.add(all[i]);
	// }
	// LOG.info("jsonArray是：{}==", jsonArray);
	// return new StringActionResult(JSON.toJSONString(jsonArray));
	// }
	//
	// @Path("/result/setCare")
	// @GET
	// @POST
	// public StringActionResult setCare() {
	// String clusterName = beat().getRequest().getParameter("clusterName");
	// String serverIp = beat().getRequest().getParameter("serverIp");
	// String checkedPackages = beat().getRequest().getParameter("checkedPackages");
	// String versionNo = beat().getRequest().getParameter("versionNo");
	//
	// LOG.info("添加关注点确定时传的传的集群名和ip为===" + clusterName + "---" + serverIp);
	// LOG.info("勾选的包为{}", checkedPackages);
	// LOG.info("versionNo为{}", versionNo);
	// String SubscribedPackages = coverage.setSubscribedPackages(serverIp,
	// clusterName, versionNo, checkedPackages);
	// LOG.info("SubscribedPackages是：{}==", SubscribedPackages);
	// return new StringActionResult(JSON.toJSONString(SubscribedPackages));
	// }
	//
	// @Path("/result/detail")
	// @GET
	// @POST
	// public StringActionResult detail() {
	//
	// JSONArray jsonArray = new JSONArray();
	// jsonArray.add(0, "0");
	//
	// return new StringActionResult(JSON.toJSONString(jsonArray));
	// }
	//
	// @Path("/result/getChartData")
	// @GET
	// @POST
	// public StringActionResult getChartData() {
	// String clusterName = beat().getRequest().getParameter("clusterName");
	// String serverIp = beat().getRequest().getParameter("serverIp");
	// LOG.info(clusterName + "----" + serverIp);
	//
	// List<PackageInfoEntity> PackageInfoEntityList =
	// coverage.getClusterVersionInfoList(serverIp, clusterName);
	// JSONArray jsonArray = new JSONArray();
	// for (int i = 0; i < PackageInfoEntityList.size(); i++) {
	// try {
	// jsonArray.add(PackageInfoEntityList.get(i).getCoverage() * 100);
	// } catch (Exception e) {
	//
	// }
	// }
	// LOG.info("传给前端图表的array是：{}", jsonArray);
	// return new StringActionResult(JSON.toJSONString(jsonArray));
	// }
	//
	// @Path("/result/uploadReport")
	// @GET
	// @POST
	// public StringActionResult uploadReport() {
	// String clusterName = beat().getRequest().getParameter("clusterName");
	// String serverIp = beat().getRequest().getParameter("serverIp");
	// String version = beat().getRequest().getParameter("version");
	// LOG.info(clusterName + "----" + serverIp + "----" + version);
	//
	// coverage.uploadReport(serverIp, clusterName, version);
	//
	// LOG.info("手动上传最新报告{}", serverIp + "--" + clusterName + "--" + version);
	// return new StringActionResult(JSON.toJSONString("SUCCESS"));
	// }
}
