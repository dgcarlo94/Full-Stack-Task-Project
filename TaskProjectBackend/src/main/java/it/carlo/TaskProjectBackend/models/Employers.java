package it.carlo.TaskProjectBackend.models;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Employers {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id_employer;
	private String name;
	private String surname;
	private String email;
	
	public Employers() {}
	
	public Employers(String name, String surname, String email) {
		this.name = name;
		this.surname = surname;
		this.email = email;
	}

	public int getId_employer() {
		return id_employer;
	}

	public void setId_employer(int id_employer) {
		this.id_employer = id_employer;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "Employers [id_employer=" + id_employer + ", name=" + name + ", surname=" + surname + ", email=" + email
				+ "]";
	}
}
