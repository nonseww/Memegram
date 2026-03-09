import type { Post } from "../types/post";

export const MOCK_POSTS: Post[] = [
  {
    id: 1,
    title: "Мем с сумкой и сосисками",
    date: new Date().toISOString(),
    author: "Эщкере постер",
    author_pfp:
      "https://preview.redd.it/ryan-beckford-hackerman-computer-hack-meme-in-hd-using-the-v0-rprze5xd9fk31.png?width=640&crop=smart&auto=webp&s=a07f0ce91d312f4424ef432865458cff8f9ff85e",
    meme: "https://i.pinimg.com/736x/4a/91/20/4a9120f9e9072cfeeb8163776bf2452b.jpg",
    description:
      "Бла бла бла этот мем очень веселый смешной у меня сдохла мать...",
    is_liked: false,
  },
  {
    id: 2,
    title: "Смешно!!!!",
    date: new Date().toISOString(),
    author: "долбоеб",
    author_pfp:
      "https://i.pinimg.com/736x/e0/37/43/e03743b1a49e18d04883ecbdf3ec0b35.jpg",
    meme: "https://i.pinimg.com/736x/f4/21/6d/f4216d475eb1c8e97cbf67da212b7c30.jpg",
    description: "Какая-то хуйня из пинтереста",
    is_liked: true,
  },
];
