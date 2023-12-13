import React, { useState, useEffect, useContext } from "react";
import api from "../interceptors/interceptor";

import { Loader, Card, FormField } from "../components";
import { getRandomPrompt } from "../utils";
import { AuthContext } from '../context/AuthContext';

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { getAllPosts, generateImage } from "../store/actions/postActions";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0)
    return data.map((post) => <Card key={post._id} {...post} />);

  return (
    <h2
      className="mt-5 font-bold text-[#6449ff] text-xl upper
        "
    >
      {title}
    </h2>
  );
};

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);

  const user = useSelector(state => state.login.user);
  const isLoading = useSelector(state => state.post.isLoading);
  const allPosts = useSelector(state => state.post.posts);

  const isGenerating = useSelector(state => state.generateImage.isLoading);
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);
  const lastImageData = useSelector(state => state.generateImage.data);

  const dispatch = useDispatch();

  const [form, setForm] = useState({
    prompt: "",
    photo: "",
  });

  useEffect(() => {
    dispatch(getAllPosts());
  }, [lastImageData]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);

    const searchResults = allPosts.filter(
      (item) =>
        item?.user?.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.prompt.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchedResults(searchResults);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const handleGenerate = async () => {
    if (form.prompt) {
      dispatch(generateImage(form.prompt));
    } else {
      toast.error("Please enter a prompt");
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div className="min-h-screen mt-40 text-center">
        <div className="min-w-full">
          <FormField
            labelName="Start with a detailed description"
            type="text"
            name="prompt"
            placeholder="An Imperssionist oil painting of sunflowers in a purple vase..."
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
            isGenerate={isLoggedIn}
            handleGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
        </div>
        {/* <p className="mt-10 flex justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="#FFFF67" d="M9.333 14.667h5.333V20H9.333z"></path>
            <path fill="#A665F5" d="M4 4h5.333v5.333H4z"></path>
            <path fill="#000" d="M14.667 9.333H20v5.333h-5.333z"></path>
            <path fill="#42FEFF" d="M4 9.333h5.333v5.333H4z"></path>
            <path fill="#51DA4C" d="M9.334 9.333h5.333v5.333H9.334z"></path>
            <path fill="#AC7558" d="M4 14.667h5.333V20H4z"></path>
            <path fill="#FF6E3D" d="M14.667 4H20v5.333h-5.333z"></path>
            <path fill="#EB55F7" d="M14.667 14.667H20V20h-5.333z"></path>
            <path fill="#3C46FF" d="M9.334 4h5.333v5.333H9.334z"></path>
          </svg>
          Available Credit: {user?.maxPost - user?.currentPost}
        </p> */}
      </div>

      <div className="-mt-40">
        <FormField
          type="text"
          name="text"
          placeholder="Search posts"
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing results for{" "}
                <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-2">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No search results found"
                />
              ) : (
                <RenderCards data={allPosts} title="No posts found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
