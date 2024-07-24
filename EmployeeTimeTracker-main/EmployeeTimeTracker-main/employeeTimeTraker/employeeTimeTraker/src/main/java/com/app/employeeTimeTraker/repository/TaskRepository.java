package com.app.employeeTimeTraker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.employeeTimeTraker.model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task,Integer>{
 List<Task> findByEmployeeId(String employeeId);
 List<Task> findByMyAssociate(String myAssociate);
 void deleteByEmployeeId(String employeeId);
}
