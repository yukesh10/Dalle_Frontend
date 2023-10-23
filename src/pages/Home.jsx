import React, {useState, useEffect } from 'react';
import api from '../interceptors/interceptor';

import { Loader, Card, FormField } from '../components';

import { toast } from 'react-toastify';

const RenderCards = ({data, title}) => {
    if (data?.length > 0) 
        return data.map((post) => <Card key={post._id} {...post} />)
    
    return (
        <h2 className='mt-5 font-bold text-[#6449ff] text-xl upper
        '>{title}</h2>
    )
}

const Home = () => {

    const [loading, setLoading] = useState(false);
    const [allPosts, setAllPosts] = useState(null);

    const [searchText, setSearchText] = useState('');
    const [searchedResults, setSearchedResults] = useState(null);
    const [searchTimeout, setSearchTimeout] = useState(null);

    useEffect(() => {

        const fetchPosts = async () => {
            setLoading(true);

            try {
                const response = await api.get('/v1/post');
                if (response?.data?.success){
                    const result = response?.data?.data;
                    setAllPosts(result.reverse());
                }
            } catch(error){
                toast.error(error?.message);
            } finally {
                setLoading(false);
            }

        }

        fetchPosts();

    }, []);

    const handleSearchChange = (e) => {

        setSearchText(e.target.value);

        const searchResults = allPosts.filter((item) => item?.user?.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()))
        setSearchedResults(searchResults);
    }

  return (
    <section className='max-w-7xl mx-auto'>
        <div>
            <h1 className='font-extrabold text-[#222328] text-[32px]'>
                The Community Showcase
            </h1>
            <p className='mt-2 text-[#666e75] text-[14px] max-w-[500px]'>
                Browse through a collection of imaginative and visually stunning images generatred by DALL-E AI
            </p>
        </div>

        <div className='mt-16'>
            <FormField 
                labelName='Search posts'
                type="text"
                name="text"
                placeholder="Search posts"
                value={searchText}
                handleChange={handleSearchChange}
            />
        </div>

        <div className='mt-10'>
            {loading ? (
                <div className='flex justify-center items-center'>
                    <Loader />
                </div>
            ) : (
                <>
                    {searchText && (
                        <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                            Showing results for <span className='text-[#222328]'>{searchText}</span>
                        </h2>
                    )}
                    <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
                        {searchText ? (
                            <RenderCards 
                                data={searchedResults}
                                title="No search results found"
                            />
                        ): (
                            <RenderCards
                                data={allPosts}
                                title="No posts found"
                            />
                        )}
                    </div>
                </>
            )}
        </div>

    </section>
  )
}

export default Home