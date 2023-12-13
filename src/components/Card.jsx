import React, {useState} from 'react'
import Modal from './Modal'

const Card = ({ _id, user, prompt, photo}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showCard = () => {
    setIsModalOpen(true);
    console.log("showing");
  }

  const closeModal = () => {
    setIsModalOpen(false);
    console.log("showing");
  }

  return (
    <>
    <div className='rounded-xl group relative shadow-card hover:shadow-cardhover card hover:cursor-pointer' onClick={showCard}>
      <img
        className='w-full h-auto object-cover rounded-xl'
        src={photo}
        alt={prompt}
      />
      <div className='group-hover:flex flex-col min-h-full absolute bottom-0 left-0 right-0 bg-slate-100 object-cover opacity-0 group-hover:opacity-95 p-8 transition-opacity duration-200 ease-in-out'>
        <div className="mt-5 flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className='w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold'>
              {user?.name[0]}
            </div>
            <p className='text-white text-sm'>{name}</p>
          </div>
          <p className='text-black text-md overflow-y-auto prompt'>{prompt}</p>
        </div>
        <div className='absolute bottom-0 left-0 px-8 py-3 text-[#777]'>
          Click to try
        </div>
      </div>
    </div>
    <Modal isOpen={isModalOpen} onClose={closeModal} _id={_id} photo={photo} prompt={prompt}/>
    </>
  )
}

export default Card