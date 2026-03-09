import type { Post } from "../../types/post";
import classes from "./PostCard.module.scss";

interface PostCardProps {
  data: Post;
}

export const PostCard = ({ data }: PostCardProps) => {
  return (
    <article className={classes.card}>
      <header>
        <div>
          <div>
            <img src={data.author_pfp} alt={data.author} />
            <span>{data.author}</span>
          </div>
          <span>{data.date}</span>
        </div>
      </header>
      <div>
        <h3>{data.title}</h3>
        <img src={data.meme} alt={data.title} />
        <p>{data.description}</p>
      </div>

      <footer>
        <button>{data.is_liked ? "лайкнуто" : "лайк"}</button>
      </footer>
    </article>
  );
};
