package com.bankapi.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.StaticResourceLocation;
import org.springframework.boot.autoconfigure.security.servlet.StaticResourceRequest;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@SpringBootApplication
@RestController
public class BankApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(BankApiApplication.class, args);
	}

	@Configuration
	protected static class SecurityConfiguration extends WebSecurityConfigurerAdapter {
		@Override
		protected void configure(HttpSecurity http) throws Exception {
			http
//				.httpBasic()
//				.requestMatchers(StaticResourceRequest.toCommonLocations())
//				.permitAll()
//				.and()
				.authorizeRequests()
				.antMatchers("/index.html", "/", "/home", "/login").permitAll()
				.anyRequest().authenticated()
				.and().csrf()
					.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
		}
	}

	@RequestMapping("/user")
	public Principal user(Principal user) {
		return user;
	}
}
