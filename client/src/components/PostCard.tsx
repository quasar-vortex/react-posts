import { Post } from "../types/Post";

type PostCardProps = {
  onDelete: (id: number) => void;
  onEdit: (p: Post) => void;
} & Post;
const PostCard = (p: PostCardProps) => {
  const { onDelete, onEdit, ...post } = p;

  return (
    <li className="p-6 bg-violet-300 rounded-md">
      <div className="flex gap-4 items-center">
        <button
          onClick={() => onEdit(post)}
          className="bg-violet-600 px-4 py-2 rounded-md text-gray-200"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(post.id)}
          className="bg-red-600 px-4 py-2 rounded-md text-gray-200"
        >
          Delete
        </button>
      </div>

      <h2 className="text-lg text-violet-900 font-bold uppercase">{p.title}</h2>
      <p className="text-violet-800">{p.content}</p>
    </li>
  );
};
export default PostCard;
