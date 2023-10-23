import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../interceptors/interceptor';
import { toast } from "react-toastify";

import { preview } from '../assets';
import { getRandomPrompt} from '../utils';
import { FormField, Loader } from '../components';

import { AuthContext } from '../context/AuthContext';
import {useUser} from '../hooks/useUser'; 

const CreatePost = () => {

    const {user} = useContext(AuthContext);

    const navigate = useNavigate();
    const [form, setForm] = useState({
        prompt: '',
        photo: ''
    });
    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false);
    const {addUser} = useUser();

    const generateImage = async () => {
        if (form.prompt){
            try {
                setGeneratingImg(true);
                const response = await api.post('/v1/dalle', {prompt: form.prompt})

                const data = response.data;
                setForm({...form, photo: `data:image/jpeg;base64,${data.photo}`})
            } catch(error){
                toast.error(error?.message);
            } finally {
                setGeneratingImg(false);
            }
        } else {
            toast.error('Please enter a prompt');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.prompt && form.photo){
            setLoading(true);
            try {
                const response = await api.post('/v1/post', form)

                const result = response.data;
                if (result.success){
                    addUser({currentPost: result?.data?.currentPost, user});
                    toast.success(result.message, {autoClose: 1000});
                    navigate('/');
                } else {
                    toast.error(result.message);
                }
            } catch(error){
                toast.error(error?.message);
            } finally {
                setLoading(false);
            }
        } else {
            toast.error('Please enter a prompt and generate the image')
        }
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt);
        setForm({...form, prompt: randomPrompt})
    }

  return (
    <section className="max-w-7xl mx-auto">
        <div>
            <h1 className='font-extrabold text-[#222328] text-[32px]'>
                Create
            </h1>
            <p className='mt-2 text-[#666e75] text-[14px] max-w-[500px]'>
                Create imaginative and visually stunning images through DALL-E AI and share them with the community
            </p>
            <p className='mt-2 text-green-500 text-[14px] max-w-[500px] font-bold'>
                You have used {user?.currentPost || 0} of {user?.maxPost || 0} posts.
            </p>
        </div>
        <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-5'>
                <FormField
                    labelName="Prompt"
                    type="text"
                    name="prompt"
                    placeholder="an oil pastel drawing of an annoyed cat in a spaceship"
                    value={form.prompt}
                    handleChange={handleChange}
                    isSurpriseMe
                    handleSurpriseMe={handleSurpriseMe}
                />
                <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
                    {form.photo ? (
                        <img
                            src={form.photo}
                            alt={form.prompt}
                            className='w-full h-full object-contain'
                        />
                    ): (
                        <img
                            src={preview}
                            alt="preview"
                            className='w-9/12 h-9/12 object-contain opacity-40'
                        />
                    )}

                    {
                        generatingImg && (
                            <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                                <Loader />
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="mt-5 flex gap-5">
                <button
                    type='button'
                    onClick={generateImage}
                    className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                    disabled={user?.currentPost >= user?.maxPost || form?.prompt?.length === 0}
                >
                    {generatingImg ? 'Generating...' : 'Generate'}
                </button>
            </div>

            <div className="mt-10">
                <p className='mt-2 text-[#666e75] text-[14px]'>Once you have created the image you want, you can share it with others in the community</p>
                <button 
                    type="submit"
                    className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                >
                    {loading ? 'Sharing...' : 'Share with the community'}
                </button>
            </div>
        </form>
    </section>
  )
}

export default CreatePost