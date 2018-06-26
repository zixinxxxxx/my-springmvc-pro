package com.wyf.test_springmvc_pro.entity;

import java.util.Date;

public class TaskEntity {

	private long cover_id;
	private String server_name;
	private String server_ip;
	private int server_port;
	private String start_location;
	private int status;
	private String code_path;
	private String class_path;
	private String exe_path;
	private String report_path;

	private Date updata_time;
	private Date create_time;

	public long getCover_id() {
		return cover_id;
	}

	public void setCover_id(long cover_id) {
		this.cover_id = cover_id;
	}

	public String getServer_name() {
		return server_name;
	}

	public void setServer_name(String server_name) {
		this.server_name = server_name;
	}

	public String getServer_ip() {
		return server_ip;
	}

	public void setServer_ip(String server_ip) {
		this.server_ip = server_ip;
	}

	public int getServer_port() {
		return server_port;
	}

	public void setServer_port(int server_port) {
		this.server_port = server_port;
	}

	public String getStart_location() {
		return start_location;
	}

	public void setStart_location(String start_location) {
		this.start_location = start_location;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getCode_path() {
		return code_path;
	}

	public void setCode_path(String code_path) {
		this.code_path = code_path;
	}

	public String getClass_path() {
		return class_path;
	}

	public void setClass_path(String class_path) {
		this.class_path = class_path;
	}

	public String getExe_path() {
		return exe_path;
	}

	public void setExe_path(String exe_path) {
		this.exe_path = exe_path;
	}

	public String getReport_path() {
		return report_path;
	}

	public void setReport_path(String report_path) {
		this.report_path = report_path;
	}

	public Date getUpdata_time() {
		return updata_time;
	}

	public void setUpdata_time(Date updata_time) {
		this.updata_time = updata_time;
	}

	public Date getCreate_time() {
		return create_time;
	}

	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}

}
