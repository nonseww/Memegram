-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    about VARCHAR(300),
    role VARCHAR(50) DEFAULT 'user',
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(255),
    created_at TIMESTAMP(6) DEFAULT NOW()
);

-- Posts table
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(3000),
    image_url VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP(6) DEFAULT NOW(),

    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE NO ACTION
);

-- Comments table
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP(6) DEFAULT NOW(),

    CONSTRAINT fk_comment_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,

    CONSTRAINT fk_comment_post
        FOREIGN KEY (post_id)
        REFERENCES posts(id)
        ON DELETE CASCADE
        ON UPDATE NO ACTION
);

-- Likes table
CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,

    CONSTRAINT fk_like_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,

    CONSTRAINT fk_like_post
        FOREIGN KEY (post_id)
        REFERENCES posts(id)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,

    CONSTRAINT unique_user_post_like
        UNIQUE (user_id, post_id)
);

-- ============================================
-- Optional: Create indexes for better performance
-- ============================================

CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_likes_user_id ON likes(user_id);
CREATE INDEX idx_likes_post_id ON likes(post_id);