import { Link, useParams } from 'react-router-dom';
import { posts } from '@/data/posts';

export function PostPage() {
  const { slug } = useParams();
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return <p>Такой записи нет.</p>;
  }

  return (
    <div>
      <p>
        <Link to="/">← Ко всем записям</Link>
      </p>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}
