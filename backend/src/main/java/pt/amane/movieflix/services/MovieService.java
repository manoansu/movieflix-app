package pt.amane.movieflix.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import pt.amane.movieflix.dtos.MovieDTO;
import pt.amane.movieflix.dtos.MovieDTOByGenre;
import pt.amane.movieflix.dtos.ReviewDTO;
import pt.amane.movieflix.entities.Genre;
import pt.amane.movieflix.entities.Movie;
import pt.amane.movieflix.entities.Review;
import pt.amane.movieflix.repositories.GenreRepository;
import pt.amane.movieflix.repositories.MovieRepository;
import pt.amane.movieflix.services.exceptions.ObjectNotFoundException;

@Service
public class MovieService {

	@Autowired
	private MovieRepository repository;
	
	@Autowired
	private GenreRepository genreRepository;
	
	@Transactional(readOnly = true)
	public MovieDTO findById(Long id) {
		Optional<Movie> movieId = repository.findById(id);
		Movie movie = movieId.orElseThrow(() -> new ObjectNotFoundException("Object not found! id: " + id + ", type: " + Movie.class.getName()));
		return new MovieDTO(movie, movie.getGenre());
	}
	
	@Transactional(readOnly = true)
	public List<ReviewDTO> findReviewsByMovieId(Long id) {
		Movie movie = (id == 0) ? null : repository.getOne(id);
		List<Review> reviews = movie.getReviews();
		return reviews.stream().map(x -> new ReviewDTO(x,x.getUser())).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public Page<MovieDTOByGenre> findAllPaged(Long genreId, Pageable pageable) {
		Genre genre = (genreId == 0) ? null :  genreRepository.getOne(genreId);
		Page<Movie> page = repository.findAllIdByGenre(genre,pageable);
		//repository.findMoviesWithGenres(page.getContent());
		return page.map(x -> new MovieDTOByGenre(x));
	}
	
}
