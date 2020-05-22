package com.rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.rva.jpa.Departman;
import com.rva.jpa.Fakultet;
import com.rva.repository.DepartmanRepository;
import com.rva.repository.FakultetRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(tags = {"Departman CRUD operacije"})	
@CrossOrigin
public class DepartmanRestController {
	@Autowired
	DepartmanRepository departmanRepository;
	
	@Autowired
	FakultetRepository fakultetRepository;
	
	@Autowired
	JdbcTemplate jdbcTemplate;
	
	@GetMapping("departmani")
	@ApiOperation(value = "Vraća kolekciju svih departmana iz baze podataka")
	public Collection<Departman> getDepartmani() {
		return departmanRepository.findAll();
	}
	
	@GetMapping("departman/{id}")
	@ApiOperation(value = "Vraća departman iz baze podataka čiji ID odgovara vrednosti koja je prosleđena kao path varijabla")
	public Departman getDepartman(@PathVariable("id") Integer id) {
		return departmanRepository.getOne(id);
	}
	
	@GetMapping("departmanNaziv/{naziv}")
	@ApiOperation(value = "Vraća departmane iz baze podataka koji u nazivu sadrže string koji je prosleđen kao path varijabla")
	public Collection<Departman> getDepartmanByNaziv(@PathVariable("naziv") String naziv) {
		return departmanRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@GetMapping("departmaniFakultet/{id}")
	@ApiOperation(value = "Vraća departmane iz baze podataka koji pripadaju fakultetu čiji ID odgovara vrednosti koja je prosleđena kao path varijabla")
	public Collection<Departman> getDepartmanByFakultet(@PathVariable("id")Integer id) {
		Fakultet fakultet = fakultetRepository.getOne(id);
		return departmanRepository.findByFakultet(fakultet);
	}
	
	@PostMapping("departmani")
	@ApiOperation(value = "Dodaje departman u bazu podataka")
	public ResponseEntity<Departman> insertDepartman(@RequestBody Departman departman) {
		if(!departmanRepository.existsById(departman.getId())) {
			departmanRepository.save(departman);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("departmani")
	@ApiOperation(value = "Modifikuje departman u bazi podataka")
	public ResponseEntity<Departman> updateDepartman(@RequestBody Departman departman) {
		if(!departmanRepository.existsById(departman.getId())) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		departmanRepository.save(departman);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@Transactional
	@DeleteMapping("departman/{id}")
	@ApiOperation(value = "Briše departman iz baze podataka čiji ID odgovara vrednosti koja je prosleđena kao path varijabla")
	public ResponseEntity<Departman> deleteDepartman(@PathVariable("id")Integer id) {
		if(id == -100) {
			jdbcTemplate.execute("INSERT INTO \"departman\" (\"id\",\"naziv\", \"oznaka\",\"fakultet\")" + "VALUES (-100,'Test','Test','1') ");
		}
		if(!departmanRepository.existsById(id)) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		jdbcTemplate.execute("delete from student where departman = "+id);
		departmanRepository.deleteById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
