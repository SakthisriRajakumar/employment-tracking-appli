package com.app.employeeTimeTraker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@SpringBootApplication
@EnableTransactionManagement
public class EmployeeTimeTrakerApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmployeeTimeTrakerApplication.class, args);
	}

}
