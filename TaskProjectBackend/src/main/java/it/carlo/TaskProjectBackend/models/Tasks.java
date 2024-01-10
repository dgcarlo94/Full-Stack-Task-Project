package it.carlo.TaskProjectBackend.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Tasks {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id_task;
	private String title;
	@Lob
	@Column(columnDefinition = "TEXT")
	private String description;
	@JoinColumn(name = "state")
	@ManyToOne
	private States state;
	private String start_date;
	private String end_date;
	@OneToOne(mappedBy = "task", cascade = CascadeType.REMOVE)
	@JsonIgnore
    private AssignedTasks assignedTask;
	
	
	public Tasks() {}

	public Tasks(String title, String description, States state, String start_date, String end_date) {
		super();
		this.title = title;
		this.description = description;
		this.state = state;
		this.start_date = start_date;
		this.end_date = end_date;
	}

	public int getId_task() {
		return id_task;
	}

	public void setId_task(int id_task) {
		this.id_task = id_task;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public States getState() {
		return state;
	}

	public void setState(States state) {
		this.state = state;
	}

	public String getStart_date() {
		return start_date;
	}

	public void setStart_date(String start_date) {
		this.start_date = start_date;
	}

	public String getEnd_date() {
		return end_date;
	}

	public void setEnd_date(String end_date) {
		this.end_date = end_date;
	}

	@Override
	public String toString() {
		return "Tasks [id_task=" + id_task + ", title=" + title + ", description=" + description + ", state=" + state
				+ ", start_date=" + start_date + ", end_date=" + end_date + "]";
	}
}
