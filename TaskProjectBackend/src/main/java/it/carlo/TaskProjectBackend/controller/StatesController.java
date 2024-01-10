package it.carlo.TaskProjectBackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.carlo.TaskProjectBackend.models.States;
import it.carlo.TaskProjectBackend.services.StatesService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/states")
public class StatesController {
	
	@Autowired
	StatesService myStateService;
	
	@GetMapping("/getstates")
	public List<States> getStates()
	{
		return myStateService.findAllStates();
	}
	
	//Non inserisco chiamate POST o DELETE o PUT perchè gli stati non sono modificabili.

}
