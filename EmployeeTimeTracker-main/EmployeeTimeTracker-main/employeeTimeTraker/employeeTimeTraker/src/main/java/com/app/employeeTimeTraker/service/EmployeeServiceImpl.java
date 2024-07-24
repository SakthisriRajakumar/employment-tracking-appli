package com.app.employeeTimeTraker.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.employeeTimeTraker.model.Employee;
import com.app.employeeTimeTraker.model.Task;
import com.app.employeeTimeTraker.repository.EmployeeRepository;
import com.app.employeeTimeTraker.repository.TaskRepository;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EmployeeServiceImpl implements EmployeeService{
   
	@Autowired
	private EmployeeRepository employeeRepository;
	@Autowired
	private TaskRepository taskRepository;
	
	@Override
	public Employee addData(Employee employee) {
		return employeeRepository.save(employee);
	}

	@Override
	public Task addTask(Task task) {
		return taskRepository.save(task);
		
	}

	@Override
	public List<Employee> authenticate(String employeeId, String password) {
		List<Employee> e = employeeRepository.findByEmployeeIdAndPassword(employeeId,password);
		return e;
	}

	@Override
	public List<Task> findByEmployeeId(String employeeId) {
		return taskRepository.findByEmployeeId(employeeId);
	}

	@Override
	public String deleteTask(Integer id) {
		taskRepository.deleteById(id);
		return "deleted";
	}

	@Override
	public String updateTask(Integer id , Task task) {
		Optional<Task> t = taskRepository.findById(id);
		if(t.isPresent()) {
			Task ta = t.get();
			 ta.setEmployeeName(task.getEmployeeName());
			 ta.setRole(task.getRole());
			 ta.setProject(task.getProject());
			 ta.setDate(task.getDate());
			 ta.setStartTime(task.getStartTime());
			 ta.setEndTime(task.getEndTime());
			 ta.setDescription(task.getDescription());
			 ta.setTaskCategory(task.getTaskCategory());
			 ta.setMyAssociate(task.getMyAssociate());
			 taskRepository.save(ta);
			 return "updated";
		}
		   
		return "error";
	}

	@Override
	public Optional<Task> findById(Integer id) {
		 
		return taskRepository.findById(id);
	}

	@Override
	public List<Task> findTaskByMyAssociate(String myAssociate) {
		return taskRepository.findByMyAssociate(myAssociate);
	}

	@Override
	public List<Employee> findAllEmployees() {
		
		return employeeRepository.findAll();
	}

	@Override
	public String deleteEmployee(Integer id) {
		
		employeeRepository.deleteById(id);
		
		return "deleted";
	}

	@Override
	@Transactional
	public String deleteTaskByEmployeeId(String id) {
		taskRepository.deleteByEmployeeId(id);
		return "deleted";
	}

	@Override
	public String updateEmployee(Integer id, Employee employee) {
		
		Optional<Employee> t = employeeRepository.findById(id);
		if(t.isPresent()) {
			Employee ta = t.get();
			 ta.setName(employee.getName());
			 ta.setRole(employee.getRole());
			 ta.setMail(employee.getMail());
	
			 employeeRepository.save(ta);
			 return "updated";
		}
		   
		return "error";
	}

	@Override
	public Optional<Employee> getEmployee(Integer id) {
		
		return employeeRepository.findById(id);
	}

	
	}
