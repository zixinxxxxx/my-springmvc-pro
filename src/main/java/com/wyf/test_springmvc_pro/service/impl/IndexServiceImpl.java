package com.wyf.test_springmvc_pro.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import com.wyf.test_springmvc_pro.entity.TaskEntity;
import com.wyf.test_springmvc_pro.service.IIndexService;

@Service
public class IndexServiceImpl implements IIndexService {
	private static final Logger logger = LogManager.getLogger(IndexServiceImpl.class);

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.iqiyi.coverage_web.service.impl.IIndexService#getAllTask()
	 */
	public List<TaskEntity> getAllTask() {
		List<TaskEntity> tasks = new ArrayList<TaskEntity>();
		TaskEntity te = new TaskEntity();
		tasks.add(te);
		te.setServer_name("test");
		te.setServer_ip("127.0.0.1");

		return tasks;
	}

}
