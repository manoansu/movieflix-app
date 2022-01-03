package pt.amane.movieflix.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import pt.amane.movieflix.entities.User;
import pt.amane.movieflix.repositories.UserRepository;
import pt.amane.movieflix.services.exceptions.ForbiddenException;
import pt.amane.movieflix.services.exceptions.UnAuthorizedException;

@Service
public class AuthService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Transactional(readOnly = true)
	public User authenticated() {
		try {
			// get authenticated user..
			String username = SecurityContextHolder.getContext().getAuthentication().getName();
			return userRepository.findByEmail(username);
		} catch (Exception e) {
			throw new UnAuthorizedException("Invalid User!");
		}
	}
	
	/**
	 *  verify if user is a member or not.
	 * @param userId
	 */
	public void validateSelfOrMember(Long userId) {
		User user = authenticated();
		if(!user.getId().equals(userId) && !user.hasHole("ROLE_MEMBER")) {
			throw new ForbiddenException("Access danied!");
		}
	}
}
