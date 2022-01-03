package pt.amane.movieflix.dtos;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import pt.amane.movieflix.entities.Review;
import pt.amane.movieflix.entities.User;

public class ReviewDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	@NotBlank(message = "Field TEXT is required!")
	@Size(min = 3, max = 60, message = "Field TEXT must have min 3 and max 60 characters!")
	private String text;
	private Long movieId;

	private UserDTO user;

	public ReviewDTO() {
	}

	public ReviewDTO(Long id, String text, Long movieId) {
		super();
		this.id = id;
		this.text = text;
		this.movieId = movieId;
	}

	public ReviewDTO(Review review) {
		super();
		id = review.getId();
		text = review.getText();
		movieId = review.getMovie().getId();
	}

	public ReviewDTO(Review review, User dto) {
		this(review);
		user = (new UserDTO(dto));
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Long getMovieId() {
		return movieId;
	}

	public void setMovieId(Long movieId) {
		this.movieId = movieId;
	}

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}
}
