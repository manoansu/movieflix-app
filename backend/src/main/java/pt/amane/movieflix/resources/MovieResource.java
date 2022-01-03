package pt.amane.movieflix.resources;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pt.amane.movieflix.dtos.MovieDTO;
import pt.amane.movieflix.dtos.MovieDTOByGenre;
import pt.amane.movieflix.dtos.ReviewDTO;
import pt.amane.movieflix.services.MovieService;

@RestController
@RequestMapping(value = "/movies")
public class MovieResource {
	
	@Autowired
	private MovieService service;
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<MovieDTO> findById(@PathVariable Long id){
		MovieDTO dto = service.findById(id);
		return ResponseEntity.ok().body(dto);
	}
	
	@GetMapping(value = "/{id}/reviews")
	public ResponseEntity<List<ReviewDTO>> findReviewsByMovieId(@PathVariable Long id){
		List<ReviewDTO> list = service.findReviewsByMovieId(id);
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping
	private ResponseEntity<Page<MovieDTOByGenre>> findAll(
			@RequestParam(value = "genreId", defaultValue = "0") Long genreId, 
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "linesPerPage", defaultValue = "12") Integer linesPerPage,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction,
			@RequestParam(value = "orderby", defaultValue = "title") String orderby){
	
		PageRequest pageRequest = PageRequest.of(page,linesPerPage, Direction.valueOf(direction), orderby);
		// PARAMETROS: page, size, sort
		Page<MovieDTOByGenre> list = service.findAllPaged(genreId,pageRequest);
		return ResponseEntity.ok().body(list);
	}

}
