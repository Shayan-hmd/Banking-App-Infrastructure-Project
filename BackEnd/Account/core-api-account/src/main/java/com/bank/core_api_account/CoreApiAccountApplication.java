package com.bank.core_api_account;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class CoreApiAccountApplication {

	public static void main(String[] args) {
		SpringApplication.run(CoreApiAccountApplication.class, args);
	}

}
