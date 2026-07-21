import { Link } from 'react-router-dom';
import { posts } from '@/data/posts';

export function HomePage() {
  return (
    <div>
      <h1>Блог станции</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={`/posts/${post.slug}`}>{post.title}</Link>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
