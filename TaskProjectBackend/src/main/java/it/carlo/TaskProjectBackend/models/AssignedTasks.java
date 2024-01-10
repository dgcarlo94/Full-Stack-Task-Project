package it.carlo.TaskProjectBackend.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class AssignedTasks {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id_assigned_task;
	@ManyToOne
	@JoinColumn(name = "employer")
	private Employers employer;
	@OneToOne
	@JoinColumn(name = "task")
	private Tasks task;
	
	public AssignedTasks() {}
	
	public AssignedTasks(Employers employer, Tasks task) {
		super();
		this.employer = employer;
		this.task = task;
	}

	public int getId_assigned_task() {
		return id_assigned_task;
	}

	public void setId_assigned_task(int id_assigned_task) {
		this.id_assigned_task = id_assigned_task;
	}

	public Employers getEmployer() {
		return employer;
	}

	public void setEmployer(Employers employer) {
		this.employer = employer;
	}

	public Tasks getTask() {
		return task;
	}

	public void setTask(Tasks task) {
		this.task = task;
	}

	@Override
	public String toString() {
		return "AssignedTasks [id_assigned_task=" + id_assigned_task + ", employer=" + employer + ", task=" + task
				+ "]";
	}
	
	
}
