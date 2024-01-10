package it.carlo.TaskProjectBackend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.carlo.TaskProjectBackend.models.Tasks;
import it.carlo.TaskProjectBackend.repository.TasksRepository;

@Service
public class TasksService {

	@Autowired
	TasksRepository myTasksRepository;

	// GET
	public List<Tasks> findAllTasks() {
		return myTasksRepository.findAll();
	}

	// INSERT
	public void insertTask(Tasks task) {
		myTasksRepository.save(task);
	}

	// UPDATE
	public void updateTask(Tasks task) {
		myTasksRepository.updateTaskById(task.getTitle(), task.getDescription(),task.getState(), task.getStart_date(), task.getEnd_date(), task.getId_task());
	}

	// DELETE
	public void deleteTask(int id_task) {
		myTasksRepository.deleteById(id_task);
	}
}
