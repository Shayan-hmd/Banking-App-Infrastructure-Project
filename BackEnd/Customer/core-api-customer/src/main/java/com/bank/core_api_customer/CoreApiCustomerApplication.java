package com.bank.core_api_customer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class CoreApiCustomerApplication {

	public static void main(String[] args) {
		SpringApplication.run(CoreApiCustomerApplication.class, args);
	}

}
