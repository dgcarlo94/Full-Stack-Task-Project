package it.carlo.TaskProjectBackend.runner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import it.carlo.TaskProjectBackend.models.States;
import it.carlo.TaskProjectBackend.models.StatesEnum;
import it.carlo.TaskProjectBackend.repository.StatesRepository;

@Component
@Order(1)
public class CLRStati implements CommandLineRunner {
	
	@Autowired
	StatesRepository myStatesRepository;
	
	public void run(String...args)
	{
		myStatesRepository.save(new States(1, StatesEnum.CREATED));
		myStatesRepository.save(new States(2, StatesEnum.IN_PROGRESS));
		myStatesRepository.save(new States(3, StatesEnum.COMPLETED));
	}
}
