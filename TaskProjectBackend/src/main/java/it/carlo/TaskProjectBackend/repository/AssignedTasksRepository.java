package it.carlo.TaskProjectBackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import it.carlo.TaskProjectBackend.models.AssignedTasks;
import it.carlo.TaskProjectBackend.models.Employers;
import it.carlo.TaskProjectBackend.models.Tasks;

@Repository
public interface AssignedTasksRepository extends JpaRepository<AssignedTasks, Integer> {
	@Transactional
	@Modifying
	@Query("UPDATE AssignedTasks u SET u.employer=?1, u.task=?2 WHERE u.id_assigned_task=?3")
	public int updateAssignedTaskById(Employers employer, Tasks task, int id_assigned_task);
}
