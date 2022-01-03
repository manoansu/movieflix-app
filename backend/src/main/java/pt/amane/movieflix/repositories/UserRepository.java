package pt.amane.movieflix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import pt.amane.movieflix.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

	User findByEmail(String username);

	@Query("SELECT obj FROM User obj where obj.id = :profile ORDER BY name")
	User findByUser(Long profile);

}
