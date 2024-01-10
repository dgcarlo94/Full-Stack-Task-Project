package it.carlo.TaskProjectBackend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.carlo.TaskProjectBackend.models.States;
import it.carlo.TaskProjectBackend.repository.StatesRepository;

import java.util.List;

@Service
public class StatesService {
	
	@Autowired
	StatesRepository myStatesRepository;
	
	// Recupera tutti gli stati disponibili dalla lista
	public List<States> findAllStates()
	{
		return myStatesRepository.findAll();
	}
	
	//Gli stati non sono modificabili quindi non aggiungo servizi di modifica o update
}
