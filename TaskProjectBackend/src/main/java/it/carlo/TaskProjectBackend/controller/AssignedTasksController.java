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

import it.carlo.TaskProjectBackend.models.AssignedTasks;
import it.carlo.TaskProjectBackend.services.AssignedTasksService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/assignedtasks")
public class AssignedTasksController {
	
	@Autowired
	AssignedTasksService myAssignedTasksService;
	
	//GET
	@GetMapping("/getassignedtasks")
	public List<AssignedTasks> getEmployers()
	{
		return myAssignedTasksService.findAllAssignedTasks();
	}
	
	//INSERT
	@PostMapping("/insertassignedtask")
	public void insertAssignedTask(@RequestBody AssignedTasks assignedTask)
	{
		myAssignedTasksService.insertAssignedTask(assignedTask);
	}
	
	//DELETE
	@DeleteMapping("/deleteassignedtask/{id_assigned_task}")
	public void deleteAssignedTask(@PathVariable("id_assigned_task") int id_assigned_task)
	{
		myAssignedTasksService.deleteAssignedTask(id_assigned_task);
	}
	
	//UPDATE
	@PostMapping(value = "/updateassignedtask", consumes = MediaType.ALL_VALUE)
	public void updateEmployer(@RequestBody AssignedTasks assignedTask)
	{
		myAssignedTasksService.updateAssignedTask(assignedTask);
	}
}
