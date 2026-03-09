import type { Post } from "../types/post";

export const MOCK_POSTS: Post[] = [
  {
    id: 1,
    title: "Мой первый мем",
    date: new Date().toISOString(),
    author: "Админ",
    author_pfp: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
    meme: "https://i.imgflip.com/30zz5g.jpg",
    description: "Когда наконец-то настроил TS без ошибок",
    is_liked: false,
  },
  {
    id: 2,
    title: "Проблема с any",
    date: new Date().toISOString(),
    author: "Frontender",
    author_pfp: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dev",
    meme: "https://i.imgflip.com/1ur9b6.jpg",
    description: "Твое лицо, когда в ТЗ запретили использовать any",
    is_liked: true,
  },
];
