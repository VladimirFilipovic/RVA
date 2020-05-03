package com.rva.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rva.jpa.Departman;
import com.rva.jpa.Fakultet;
import com.rva.jpa.Status;
import com.rva.jpa.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {
	Collection<Student> findByImeContainingIgnoreCase(String ime);	
	Collection<Student> findByDepartman(Departman d);
	Collection<Student> findByStatus(Status s);
	
	//@Query(value = "select  ")
	//Integer nextBrojIndeksa(Integer departmanId);
}
