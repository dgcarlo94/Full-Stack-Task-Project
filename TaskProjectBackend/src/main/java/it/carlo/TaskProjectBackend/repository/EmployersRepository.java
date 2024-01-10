package it.carlo.TaskProjectBackend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import it.carlo.TaskProjectBackend.models.Employers;

@Repository
public interface EmployersRepository extends JpaRepository<Employers, Integer> {
	
	Optional<List<Employers>> findByName(String name);
	Optional<List<Employers>> findBySurname(String surname);
	
	@Transactional
	Integer deleteBySurname(String surname);
	
	@Transactional
	@Modifying
	@Query("UPDATE Employers u SET u.name=?1, u.surname=?2, u.email=?3 WHERE u.id_employer=?4")
	public int updateEmployerById(String name, String surname, String email, int id_employer);
}
