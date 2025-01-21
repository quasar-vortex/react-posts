import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Post } from "../types/Post";
import PostCard from "../components/PostCard";
import SearchBar from "../components/SearchBar";

const PostList = () => {
  const nav = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchText, setSearchText] = useState("");
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
  const onEditPostHandler = ({ id, title, content }: Post) => {
    nav(`/:postId/edit`, { state: { id, title, content } });
  };
  const onSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
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
        <SearchBar onTextChange={onSearchHandler} />

        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {posts
            .filter(
              (p) =>
                p.title
                  .toLocaleLowerCase()
                  .includes(searchText.toLocaleLowerCase()) ||
                p.content
                  .toLocaleLowerCase()
                  .includes(searchText.toLocaleLowerCase())
            )
            .map((p) => {
              return (
                <PostCard
                  onDelete={onDeletePostHandler}
                  onEdit={onEditPostHandler}
                  {...p}
                />
              );
            })}
        </ul>
      </div>
    </section>
  );
};

export default PostList;
