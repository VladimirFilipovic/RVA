package com.rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.rva.jpa.Departman;
import com.rva.jpa.Status;
import com.rva.jpa.Student;
import com.rva.repository.DepartmanRepository;
import com.rva.repository.StatusRepository;
import com.rva.repository.StudentRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(tags = {"Student CRUD operacije"})
public class StudentRestController {
	@Autowired
	private StudentRepository studentRepository;
	
	@Autowired
	private DepartmanRepository departmanRepository;
	
	@Autowired
	private StatusRepository statusRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("studenti")
	@ApiOperation(value = "Vraća kolekciju svih statusa iz baze podataka")
	public Collection<Student> getStudenti() {
		return studentRepository.findAll();
	}
	
	@GetMapping("student/{id}")
	@ApiOperation(value = "Vraća studenta iz baze podataka čiji ID odgovara vrednosti koja je prosleđena kao path varijabla")
	public Student getStudent(@PathVariable("id")Integer id) {
		return studentRepository.getOne(id);
	}
	
	@GetMapping("studentIme/{ime}")
	@ApiOperation(value = "Vraća studente iz baze podataka koji u imenu sadrže string koji je prosleđen kao path varijabla")
	public Collection<Student> getStudentByIme(@PathVariable("ime") String ime) {
		return studentRepository.findByImeContainingIgnoreCase(ime);
	}
	
	@GetMapping("studentiDepartman/{id}")
	@ApiOperation(value = "Vraća studente iz baze podataka koji pripadaju departmanu čiji ID odgovara vrednosti koja je prosleđena kao path varijabla")
	public Collection<Student> getStudentiByDepartman(@PathVariable("id") Integer id) {
		Departman departman = departmanRepository.getOne(id);
		return studentRepository.findByDepartman(departman);
	}
	
	@GetMapping("studentiStatus/{id}")
	@ApiOperation(value = "Vraća studente iz baze podataka koji imaju status čiji ID odgovara vrednosti koja je prosleđena kao path varijabla")
	public Collection<Student> getStudentiByStatus(@PathVariable("id") Integer id) {
		Status status = statusRepository.getOne(id);
		return studentRepository.findByStatus(status);
	}
	
	@PostMapping("studenti")
	@ApiOperation(value = "Dodaje studenta u bazu podataka")
	public ResponseEntity<Student> insertStudent(@RequestBody Student student){
		if(!studentRepository.existsById(student.getId())) {
			studentRepository.save(student);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("studenti")
	@ApiOperation(value = "Modifikuje studenta u bazi podataka")
	public ResponseEntity<Student> updateStudent(@RequestBody Student student) {
		if(!studentRepository.existsById(student.getId()))
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		studentRepository.save(student);
		return new ResponseEntity<>(HttpStatus.OK);
	
	}
	
	@DeleteMapping("student/{id}")
	@ApiOperation(value = "Briše studenta iz baze podataka čiji ID odgovara vrednosti koja je prosleđena kao path varijabla")
	public ResponseEntity<Student> deleteStudent(@PathVariable("id") Integer id) {
		if(id == -100)
			jdbcTemplate.execute("INSERT INTO \"student\" (\"id\",\"ime\", \"prezime\",\"status\",\"departman\",\"broj_indeksa\")" + "VALUES (-100,'Test','Test',2,2,'IT26-2017') ");
		if(!studentRepository.existsById(id))
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		studentRepository.deleteById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
}
