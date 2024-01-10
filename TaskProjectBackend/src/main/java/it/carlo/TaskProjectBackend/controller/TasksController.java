package it.carlo.TaskProjectBackend.controller;

import java.util.List;

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

import it.carlo.TaskProjectBackend.models.Tasks;
import it.carlo.TaskProjectBackend.services.TasksService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/tasks")
public class TasksController {
	
	@Autowired
	TasksService myTasksService;
	
	//GET
	@GetMapping("/gettasks")
	public List<Tasks> getEmployers()
	{
		return myTasksService.findAllTasks();
	}
	
	//INSERT
	@PostMapping("/inserttask")
	public void insertTask(@RequestBody Tasks task)
	{
		myTasksService.insertTask(task);
	}
	
	//DELETE
	@DeleteMapping("/deletetask/{id_task}")
	public void deleteEmployer(@PathVariable("id_task") int id_task)
	{
		myTasksService.deleteTask(id_task);
	}
	
	//UPDATE
	@PostMapping(value = "/updatetask", consumes = MediaType.ALL_VALUE)
	public void updateEmployer(@RequestBody Tasks task)
	{
		myTasksService.updateTask(task);
	}
}
