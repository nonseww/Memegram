import type { Post } from "../types/post";

export const MOCK_POSTS: Post[] = [
  {
    id: 1,
    title: "Мем с сумкой и сосисками",
    date: new Date().toISOString(),
    author: "Эщкере постер",
    authorPfp:
      "https://preview.redd.it/ryan-beckford-hackerman-computer-hack-meme-in-hd-using-the-v0-rprze5xd9fk31.png?width=640&crop=smart&auto=webp&s=a07f0ce91d312f4424ef432865458cff8f9ff85e",
    meme: "https://i.pinimg.com/736x/4a/91/20/4a9120f9e9072cfeeb8163776bf2452b.jpg",
    description:
      "Бла бла бла этот мем очень веселый смешной у меня есть мать...",
    isLiked: false,
    likesCount: 10,
    commentsCount: 1,
  },
  {
    id: 2,
    title: "Смешно!!!!",
    date: new Date().toISOString(),
    author: "умный человек фото скачать",
    authorPfp:
      "https://i.pinimg.com/736x/e0/37/43/e03743b1a49e18d04883ecbdf3ec0b35.jpg",
    meme: "https://i.pinimg.com/736x/f4/21/6d/f4216d475eb1c8e97cbf67da212b7c30.jpg",
    description: "Какая-то штука из пинтереста",
    isLiked: true,
    likesCount: 2,
    commentsCount: 0,
  },
  {
    id: 3,
    title: "Ну жиза",
    date: new Date().toISOString(),
    author: "Салдина Мария",
    authorPfp:
      "https://i.pinimg.com/736x/5f/12/cd/5f12cd846e2305afcc2a8ad68d2975f9.jpg",
    meme: "https://i.pinimg.com/736x/ab/6e/cf/ab6ecf2a16178caea4cde231d79a73e5.jpg",
    description:
      "Я в своем сознании уже настолько преисполнился что я проживаю миллионы лет",
    isLiked: true,
    likesCount: 8751530,
    commentsCount: 14511,
  },
  {
    id: 4,
    title: "Котики!!!",
    date: new Date().toISOString(),
    author: "Салдина Мария",
    authorPfp:
      "https://i.pinimg.com/736x/5f/12/cd/5f12cd846e2305afcc2a8ad68d2975f9.jpg",
    meme: "https://i.pinimg.com/originals/96/d7/cd/96d7cdda7baf60d9669fc34caa1aabc7.jpg",
    description: "Мои любимые котики!",
    isLiked: false,
    likesCount: 7,
    commentsCount: 11,
  },
  {
    id: 5,
    title: "So true",
    date: new Date().toISOString(),
    author: "nonseww",
    authorPfp:
      "https://i.pinimg.com/736x/6e/ac/5b/6eac5beb19bae979766738edbb229ca7.jpg",
    meme: "https://i.pinimg.com/736x/f2/0c/a1/f20ca11632cd9bb7f6d7068c9844a8ff.jpg",
    description: "I'm cooked",
    isLiked: false,
    likesCount: 10,
    commentsCount: 1,
  },
  {
    id: 6,
    title: "БОМЖ КОР",
    date: new Date().toISOString(),
    author: "nonseww",
    authorPfp:
      "https://i.pinimg.com/736x/6e/ac/5b/6eac5beb19bae979766738edbb229ca7.jpg",
    meme: "https://i.pinimg.com/474x/0a/cb/a5/0acba50c5632c3ba474ce42d0cad58b0.jpg",
    description: "ГДЕ ДЕНЬГИ",
    isLiked: false,
    likesCount: 10,
    commentsCount: 1,
  },
  {
    id: 7,
    title: "к черту все",
    date: new Date().toISOString(),
    author: "nonseww",
    authorPfp:
      "https://i.pinimg.com/736x/6e/ac/5b/6eac5beb19bae979766738edbb229ca7.jpg",
    meme: "https://i.pinimg.com/736x/30/f8/c8/30f8c887e3f2dd31361cd3fc72d72eb8.jpg",
    description: "привет!",
    isLiked: true,
    likesCount: 10,
    commentsCount: 1,
  },
  {
    id: 8,
    title: "пока :)",
    date: new Date().toISOString(),
    author: "nonseww",
    authorPfp:
      "https://i.pinimg.com/736x/6e/ac/5b/6eac5beb19bae979766738edbb229ca7.jpg",
    meme: "https://i.pinimg.com/736x/d7/b1/f6/d7b1f66e59ae551afbe94c61ec3ac6dc.jpg",
    description: "всем пока!",
    isLiked: true,
    likesCount: 10,
    commentsCount: 1,
  },
];
