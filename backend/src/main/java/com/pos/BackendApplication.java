package com.pos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * Main entry point.
 *
 * Moved to com.pos package to automatically scan all sub-packages 
 * (controller, service, repository, entity, config, security).
 */
@SpringBootApplication
@ComponentScan(basePackages = "com.pos")
@EnableJpaRepositories(basePackages = "com.pos.repository")
@EntityScan(basePackages = "com.pos.entity")
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
