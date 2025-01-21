import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Post = {
  id: number;
  title: string;
  content: string;
};
const PostList = () => {
  const nav = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetch("http://localhost:5000/posts", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((r) => {
        setPosts(r.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  const onDeletePostHandler = (postId: number) => {
    fetch("http://localhost:5000/posts/" + postId, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((r) => {
        setPosts((p) => {
          const oldPosts = [...p];
          return oldPosts.filter((p) => p.id !== postId);
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        setIsLoading(false);
        setIsError(true);
      });
  };
  const editPostHandler = ({ id, title, content }: Post) => {
    nav(`/:postId/edit`, { state: { id, title, content } });
  };
  if (isLoading)
    return (
      <section>
        <div>
          <h2>Loading Posts.</h2>
        </div>
      </section>
    );
  if (isError)
    return (
      <div>
        <h2>Something Went Wrong.</h2>
      </div>
    );
  if (!posts.length)
    return (
      <section className="flex-1">
        <div className="p-4 max-w-7xl mx-auto">
          <h2>No posts to show.</h2>
        </div>
      </section>
    );
  return (
    <section className="flex-1">
      <div className="p-4 max-w-7xl mx-auto">
        {/*  <div className="mb-4">
          <input
            type="text"
            name="search"
            className="w-full p-1 bg-violet-200 rounded-md outline-none"
          />
        </div>*/}
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {posts.map((p) => {
            return (
              <li className="p-6 bg-violet-300 rounded-md" key={p.id}>
                <div className="flex gap-4 items-center">
                  <button
                    onClick={() => editPostHandler(p)}
                    className="bg-violet-600 px-4 py-2 rounded-md text-gray-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeletePostHandler(p.id)}
                    className="bg-red-600 px-4 py-2 rounded-md text-gray-200"
                  >
                    Delete
                  </button>
                </div>

                <h2 className="text-lg text-violet-900 font-bold uppercase">
                  {p.title}
                </h2>
                <p className="text-violet-800">{p.content}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default PostList;
