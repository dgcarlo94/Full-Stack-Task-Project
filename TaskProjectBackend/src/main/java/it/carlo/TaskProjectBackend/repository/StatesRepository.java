package it.carlo.TaskProjectBackend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import it.carlo.TaskProjectBackend.models.States;

@Repository
public interface StatesRepository extends JpaRepository<States, Integer> {
	
	Optional<List<States>> findByState(String state);
	
	@Transactional
	Integer deleteByState(String state);
	
	@Transactional
	@Modifying
	@Query("UPDATE States u SET u.state=?1 WHERE u.id_state=?2")
	public int myUpdateStateById(String state, int id_state);
	
	@Transactional
	@Modifying
	@Query("DELETE FROM States")
	public void resetStates();
}
