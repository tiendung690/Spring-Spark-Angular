package de.thm.mni.sparksfpolice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SparkSfPoliceApplication {

	@Autowired
	DataHandler dataHandler;
	public static void main(String[] args) {
		SpringApplication.run(SparkSfPoliceApplication.class, args);

	}
}
