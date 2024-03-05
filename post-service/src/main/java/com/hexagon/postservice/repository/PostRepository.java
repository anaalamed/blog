package com.hexagon.postservice.repository;

import com.hexagon.postservice.entity.Post;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
  List<Post> findAllByOrderByCreationTimeDesc();

  List<Post> findAllByUserIdOrderByCreationTimeDesc(int userId);
}
