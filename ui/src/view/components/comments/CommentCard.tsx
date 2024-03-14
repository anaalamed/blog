import React from "react";
import { Button, Card, Flex } from "antd";
import { Comment } from "../../../rest/commentRequests";
import CommentModal from "./CommentModal";
import { useGlobalContext } from "../../../state/state";
import { DeleteOutlined } from "@ant-design/icons";
import { buttonStyle } from "../../../styles/global";
import { deleteComment } from "../../../rest/commentRequests";
import UserName from "../user/UserName";

const cardStyle = {
  backgroundColor: "#EBEAFB",
  color: "#3928BD",
  textAlign: "start" as const,
  width: "70%",
};

const titleStyle = {
  backgroundColor: "#5c6cfa",
  color: "#fff",
};

const CommentCard: React.FC<{ comment: Comment }> = ({ comment }) => {
  const { isLoggedIn, user, setComments, comments } = useGlobalContext();

  const onDeleteComment = async () => {
    await deleteComment(user?.token || "", comment.id);
    const newComments = comments.filter((e) => e.id !== comment.id);
    setComments(newComments);
  };

  const author = <UserName user={comment.author} />;

  return (
    <Card
      title={author}
      style={cardStyle}
      size="default"
      headStyle={titleStyle}
      hoverable
      extra={
        <Flex style={titleStyle} gap={10}>
          <div>{comment.creationTime.toLocaleString()}</div>
          {isLoggedIn && user?.id === comment.author.id ? (
            <>
              <CommentModal comment={comment} />
              <Button style={buttonStyle} onClick={onDeleteComment}>
                <DeleteOutlined />
              </Button>
            </>
          ) : null}
        </Flex>
      }
    >
      {comment.content}
    </Card>
  );
};

export default CommentCard;
