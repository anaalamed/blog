package com.hexagon.commentservice.repository;

import com.hexagon.commentservice.entity.Comment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
  List<Comment> findAllByPostIdOrderByCreationTimeDesc(int postId);
}
