package com.app.employeeTimeTraker.service;


import java.util.*;

import com.app.employeeTimeTraker.model.Employee;
import com.app.employeeTimeTraker.model.Task;

public interface EmployeeService {
    
public abstract Employee addData(Employee employee);

public abstract Task addTask(Task task);



public abstract List<Employee> authenticate(String employeeId, String password);

public abstract List<Task> findByEmployeeId(String employeeId);

public abstract String deleteTask(Integer id);


public abstract String updateTask(Integer id, Task task);
 
public abstract String updateEmployee(Integer id, Employee employee);

public abstract Optional<Task> findById(Integer id);

public abstract List<Employee> findAllEmployees();

public abstract List<Task> findTaskByMyAssociate(String id);


public abstract String deleteEmployee(Integer id);

public abstract String deleteTaskByEmployeeId(String id);

public abstract Optional<Employee> getEmployee(Integer id);

}
