package com.rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.rva.jpa.Fakultet;
import com.rva.repository.FakultetRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(tags = {"Fakultet CRUD operacije"})
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler" })
public class FakultetRestController {
	@Autowired
	FakultetRepository fakultetRepository;
	
	@Autowired
	JdbcTemplate jdbcTemplate;
	
	@GetMapping("fakulteti")
	@ApiOperation(value = "Vraća kolekciju svih fakulteta iz baze podataka")
	public Collection<Fakultet> getFakulteti() {
		return fakultetRepository.findAll();
	}
	
	@GetMapping("fakultet/{id}")
	@ApiOperation(value = "Vraća fakultet iz baze podataka čiji ID odgovara vrednosti koja je prosleđena kao path varijabla")
	public Fakultet getFakultet(@PathVariable("id") Integer id) {
		return fakultetRepository.getOne(id);
	}
	
	@GetMapping("fakultetNaziv/{naziv}")
	@ApiOperation(value = "Vraća fakultete iz baze podataka koji u nazivu sadrže string koji je prosleđen kao path varijabla")
	public Collection<Fakultet> getFakultetByNaziv(@PathVariable("naziv") String naziv) {
		return fakultetRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@PostMapping("fakulteti")
	@ApiOperation(value = "Dodaje fakultet u bazu podataka")
	public ResponseEntity<Fakultet> insertFakultet(@RequestBody Fakultet fakultet) {
		if(!fakultetRepository.existsById(fakultet.getId())) {
			fakultetRepository.save(fakultet);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("fakulteti")
	@ApiOperation(value = "Modifikuje fakultet u bazi podataka")
	public ResponseEntity<Fakultet> updateFakultet(@RequestBody Fakultet fakultet) {
		if(!fakultetRepository.existsById(fakultet.getId())) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		fakultetRepository.save(fakultet);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@Transactional
	@DeleteMapping("fakultet/{id}")
	@ApiOperation(value = "Briše fakultet iz baze podataka čiji ID odgovara vrednosti koja je prosleđena kao path varijabla")
	public ResponseEntity<Fakultet> deleteFakultet(@PathVariable("id") Integer id) {
		if(id == -100)
			jdbcTemplate.execute("INSERT INTO \"fakultet\" (\"id\",\"naziv\", \"sediste\")" + "VALUES (-100,'Test','Test') ");
		if(!fakultetRepository.existsById(id)) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		//jdbcTemplate.execute("delete from departman where fakultet = "+id);
		fakultetRepository.deleteById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
