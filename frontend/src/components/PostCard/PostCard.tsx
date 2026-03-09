import type { Post } from "../../types/post";
import classes from "./PostCard.module.scss";
import { calcDates } from "../../utils/calcDates";
import { isTooLongText } from "../../utils/isTooLongText";
import { updateText } from "../../utils/updateText";
import { HeartButton } from "../../ui/HeartButton";
import { CommentButton } from "../../ui/CommentButton";
import { useState } from "react";

interface PostCardProps {
  data: Post;
}

export const PostCard = ({ data }: PostCardProps) => {
  const limit = 50;
  const correctDate = calcDates(data.date);
  const isTooLongDescription = isTooLongText({
    description: data.description,
    limit: limit,
  });
  const [isLiked, setIsLiked] = useState(data.is_liked);

  return (
    <article className={classes.card}>
      <header className={classes.headerContainer}>
        <div className={classes.authorInfo}>
          <img
            src={data.author_pfp}
            alt={data.author}
            className={classes.authorImage}
          />
          <a className={classes.authorName}>{data.author}</a>
        </div>
        <span className={classes.date}>{correctDate}</span>
      </header>

      <div className={classes.mainContainer}>
        <img src={data.meme} alt={data.title} className={classes.memeImage} />
        <div className={classes.infoContainer}>
          <h3 className={classes.title}>{data.title}</h3>
          <p className={classes.description}>
            {isTooLongDescription
              ? updateText({ description: data.description, limit: limit })
              : data.description}
          </p>
          {isTooLongDescription && (
            <a className={classes.readContinue}>Читать полностью...</a>
          )}
        </div>
      </div>

      <footer className={classes.footerContainer}>
        <HeartButton
          isLiked={isLiked}
          onClick={() => setIsLiked((prev) => !prev)}
        />
        <CommentButton onClick={() => {}} />
      </footer>
    </article>
  );
};
