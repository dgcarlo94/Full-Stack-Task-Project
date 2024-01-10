package it.carlo.TaskProjectBackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.carlo.TaskProjectBackend.models.Employers;
import it.carlo.TaskProjectBackend.services.EmployersService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/employers")
public class EmployersController {
	
	@Autowired
	EmployersService myEmployersService;
	
	//GET
	@GetMapping("/getemployers")
	public List<Employers> getEmployers()
	{
		return myEmployersService.findAllEmployers();
	}
	
	//INSERT
	@PostMapping("/insertemployer")
	public void insertEmployer(@RequestBody Employers employer)
	{
		myEmployersService.insertEmployer(employer);
	}
	
	//DELETE
	@DeleteMapping("/deleteemployer/{id_employer}")
	public void deleteEmployer(@PathVariable("id_employer") int id_employer)
	{
		myEmployersService.deleteEmployer(id_employer);
	}
	
	//UPDATE
	@PostMapping(value = "/updateemployer", consumes = MediaType.ALL_VALUE)
	public void updateEmployer(@RequestBody Employers employer)
	{
		myEmployersService.updateEmployer(employer);
	}
}
