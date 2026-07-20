import { useState } from 'react';

const CURRENT_USER = 'вы';

export function LikeButton() {
  const [likedBy, setLikedBy] = useState<string[]>([]);
  const hasLiked = likedBy.includes(CURRENT_USER);

  const toggleLike = () => {
    if (hasLiked) {
      setLikedBy(likedBy.filter((user) => user !== CURRENT_USER));
    } else {
      setLikedBy([...likedBy, CURRENT_USER]);
    }
  };

  return (
    <button onClick={toggleLike}>
      {hasLiked ? '💔 Убрать лайк' : '❤️ Нравится'} ({likedBy.length})
    </button>
  );
}
