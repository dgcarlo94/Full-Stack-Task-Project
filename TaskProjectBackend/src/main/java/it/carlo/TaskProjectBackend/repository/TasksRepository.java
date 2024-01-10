package it.carlo.TaskProjectBackend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import it.carlo.TaskProjectBackend.models.States;
import it.carlo.TaskProjectBackend.models.Tasks;

public interface TasksRepository extends JpaRepository<Tasks, Integer> {
	
	Optional<List<Tasks>> findByTitle(String title);
	Optional<List<Tasks>> findByDescription(String description);
	
	@Transactional
	Integer deleteByTitle(String title);
	
	@Transactional
	@Modifying
	@Query("UPDATE Tasks u SET u.title=?1, u.description=?2, u.state=?3, u.start_date=?4, u.end_date=?5 WHERE u.id_task=?6")
	public int updateTaskById(String title, String description, States state, String startDate, String endDate, int id_task);

}
