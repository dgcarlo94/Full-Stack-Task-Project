package it.carlo.TaskProjectBackend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.carlo.TaskProjectBackend.models.AssignedTasks;
import it.carlo.TaskProjectBackend.repository.AssignedTasksRepository;

@Service
public class AssignedTasksService {
	
	@Autowired
	AssignedTasksRepository myAssignedTasksRepository;
	
	//GET
	public List<AssignedTasks> findAllAssignedTasks()
	{
		return myAssignedTasksRepository.findAll();
	}
	
	//INSERT
	public void insertAssignedTask(AssignedTasks assignedTask)
	{
		myAssignedTasksRepository.save(assignedTask);
	}
	
	//UPDATE
	public void updateAssignedTask(AssignedTasks assignedTask)
	{
		myAssignedTasksRepository.updateAssignedTaskById(assignedTask.getEmployer(), assignedTask.getTask(), assignedTask.getId_assigned_task());
	}
	
	//DELETE
	public void deleteAssignedTask(int id_assigned_task)
	{
		myAssignedTasksRepository.deleteById(id_assigned_task);
	}
}
