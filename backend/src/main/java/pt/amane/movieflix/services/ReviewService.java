package pt.amane.movieflix.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import pt.amane.movieflix.dtos.ReviewDTO;
import pt.amane.movieflix.dtos.UserDTO;
import pt.amane.movieflix.entities.Review;
import pt.amane.movieflix.entities.User;
import pt.amane.movieflix.repositories.ReviewRepository;

@Service
public class ReviewService {
	
	@Autowired
	private ReviewRepository repository;
	
	@Autowired
	private UserService userService;

	@Transactional
	public ReviewDTO create(ReviewDTO dto) {
		
		UserDTO userDto = userService.getProfile();
		dto.setUser(userDto);
		Review review = new Review();	
		review.setText(dto.getText());
		review.setMovieId(dto.getMovieId());
		review.setUser(new User(dto.getUser().getId(), dto.getUser().getName(), dto.getUser().getEmail(), null));
		review = repository.save(review); 
		return new ReviewDTO(review, review.getUser());
	}
	
	

}
