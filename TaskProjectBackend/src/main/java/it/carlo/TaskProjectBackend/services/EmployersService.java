package it.carlo.TaskProjectBackend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.carlo.TaskProjectBackend.models.Employers;
import it.carlo.TaskProjectBackend.repository.EmployersRepository;

@Service
public class EmployersService {
	
	@Autowired
	EmployersRepository myEmployersRepository;
	
	//GET
	public List<Employers> findAllEmployers()
	{
		return myEmployersRepository.findAll();
	}
	
	//INSERT
	public void insertEmployer(Employers employer)
	{
		myEmployersRepository.save(employer);
	}
	
	//UPDATE
	public void updateEmployer(Employers employer)
	{
		System.out.println(employer);
		myEmployersRepository.updateEmployerById(employer.getName(), employer.getSurname(), employer.getEmail(), employer.getId_employer());
	}
	
	//DELETE
	public void deleteEmployer(int id_employer)
	{
		myEmployersRepository.deleteById(id_employer);
	}
	
}
