package com.rva;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication
@ComponentScan()
public class BackendRvaApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendRvaApplication.class, args);
	}

}
