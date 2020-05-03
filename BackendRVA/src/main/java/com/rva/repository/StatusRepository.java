package com.rva.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rva.jpa.Status;

public interface StatusRepository extends JpaRepository<Status, Integer> {
	Collection<Status> findByNazivContainingIgnoreCase(String naziv);
}
