package it.carlo.TaskProjectBackend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;

@Entity
public class States {
	
	@Id
	private int id_state;
	@Enumerated(EnumType.STRING)
	@JoinColumn(name = "stato")
	private StatesEnum state;
	
	public States() {}

	public States(int id_state, StatesEnum state) {
		this.id_state = id_state;
		this.state = state;
	}

	public int getId_state() {
		return id_state;
	}

	public void setId_state(int id_state) {
		this.id_state = id_state;
	}

	public StatesEnum getState() {
		return state;
	}

	public void setState(StatesEnum state) {
		this.state = state;
	}

	@Override
	public String toString() {
		return "States [id_state=" + id_state + ", state=" + state + "]";
	}
}
