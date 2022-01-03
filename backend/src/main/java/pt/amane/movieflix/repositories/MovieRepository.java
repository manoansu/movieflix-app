package pt.amane.movieflix.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import pt.amane.movieflix.entities.Genre;
import pt.amane.movieflix.entities.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {

	@Query("SELECT DISTINCT obj FROM Movie obj INNER JOIN obj.genre cats "
			+ "WHERE (COALESCE(:genre) IS NULL OR cats IN :genre)")
	Page<Movie> findAllIdByGenre(Genre genre, Pageable pageable);

	@Query("SELECT obj FROM Movie obj JOIN FETCH obj.genre WHERE obj IN :movie")
	Movie findMoviesWithGenres(Movie movie);

}
