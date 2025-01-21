import React from "react";

type Props = {
  onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const SearchBar = ({ onTextChange }: Props) => {
  return (
    <div className="mb-4">
      <input
        className="rounded-sm duration-200 indent-2 focus:border-violet-600 outline-none w-full bg-violet-200 border-2 border-violet-300"
        onChange={onTextChange}
        type="text"
      />
    </div>
  );
};

export default SearchBar;
