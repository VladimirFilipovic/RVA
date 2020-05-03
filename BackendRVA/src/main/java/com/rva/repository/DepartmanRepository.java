package com.rva.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rva.jpa.Departman;
import com.rva.jpa.Fakultet;

public interface DepartmanRepository extends JpaRepository<Departman, Integer> {
	Collection<Departman> findByNazivContainingIgnoreCase(String naziv);
	Collection<Departman> findByFakultet(Fakultet fakultet);
}
 