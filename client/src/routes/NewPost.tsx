import { ChangeEvent, FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NewPost = () => {
  const location = useLocation();
  const nav = useNavigate();
  const [postState, setPostState] = useState({
    isLoading: false,
    isError: false,
    formState: {
      title: location.state?.title || "",
      content: location.state?.content || "",
    },
  });

  const formInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPostState((p) => {
      const newFormState = {
        title: p.formState.title,
        content: p.formState.content,
      };
      newFormState[name as keyof (typeof postState)["formState"]] = value;
      return { ...p, formState: newFormState };
    });
  };

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    setPostState((p) => ({ ...p, isLoading: true }));
    fetch("http://localhost:5000/posts", {
      method: "POST",
      body: JSON.stringify(postState.formState),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((r) => {
        setPostState((p) => ({
          formState: {
            title: "",
            content: "",
          },
          isLoading: false,
          isError: false,
        }));

        nav("/");
      })
      .catch((err) => {
        setPostState((p) => ({ ...p, isLoading: false, isError: true }));
        console.error(err);
        if (err.hasOwnProperty("message")) {
          alert(err.message);
        }
      });
  };

  const formUpdateHandler = (e: FormEvent) => {
    e.preventDefault();
    setPostState((p) => ({ ...p, isLoading: true }));
    fetch("http://localhost:5000/posts/" + location.state?.id, {
      method: "PUT",
      body: JSON.stringify(postState.formState),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((r) => {
        setPostState((p) => ({
          formState: {
            title: "",
            content: "",
          },
          isLoading: false,
          isError: false,
        }));

        nav("/");
      })
      .catch((err) => {
        setPostState((p) => ({ ...p, isLoading: false, isError: true }));
        console.error(err);
        if (err.hasOwnProperty("message")) {
          alert(err.message);
        }
      });
  };

  return (
    <section className="flex-1">
      <div className="p-4 max-w-7xl mx-auto flex flex-col justify-center  h-full">
        <div className="bg-violet-300 rounded-md p-6 w-full max-w-md mx-auto">
          <form
            onSubmit={location.state ? formUpdateHandler : formSubmitHandler}
            className="space-y-4"
          >
            <div>
              <label className="block mb-1" htmlFor="title">
                Title
              </label>
              <input
                value={postState.formState.title}
                onChange={formInputChangeHandler}
                className="bg-violet-100 duration-200 w-full py-1 rounded-sm indent-1 outline-none border-2 border-violet-400 focus:border-violet-500"
                type="text"
                name="title"
                id="title"
              />
            </div>
            <div>
              <label className="block mb-1" htmlFor="content">
                Content
              </label>
              <textarea
                value={postState.formState.content}
                onChange={formInputChangeHandler}
                rows={10}
                className=" bg-violet-100 duration-200 resize-none w-full py-1 rounded-sm indent-1 outline-none border-2 border-violet-400 focus:border-violet-500"
                name="content"
                id="content"
              />
            </div>
            <input
              className="w-min mx-auto cursor-pointer rounded-md border border-violet-300 whitespace-nowrap flex items-center gap-1 bg-violet-500 text-violet-100 hover:bg-violet-600 duration-200 px-4 py-2"
              type="submit"
              value={location.state ? "Update" : "Submit"}
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewPost;
