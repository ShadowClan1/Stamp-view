import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';

import { client, urlFor } from '../client';
import { FcComments, FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { IoIosOptions} from 'react-icons/io';
import { useEffect } from 'react';
import Context1 from '../Context hook/Context1';

const Pin = ({ pin }) => {
  
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const [save, setSave] = useState([])
const context = useContext(Context1);
const {pins, setPins} = context
  const navigate = useNavigate();

  const { postedBy, image, _id, destination } = pin;
const [liked, setLiked] = useState(false)
  const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  const deletePin = (id) => {
    client
      .delete(id)
      .then(() => {
        setPins(pins.filter((element)=>{
          return id !== element?._id
        }))
       
      });
  };
const [like, setLike] = useState(0)
  // let alreadySaved = pin?.save?.filter((item) => item?.postedBy?._id === user?.googleId);

  // alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];
  const unLikePin = (id)=>{
    setLiked(false)
    setLike(like-1)
    if (pin?.save?.filter((item)=>{
      return item?.userId === user?.googleId 
    }).length > 0){const value = pin?.save?.indexOf(id)
    client
        .patch(id)
        .unset([`save${value}`])
        .commit()
        .then((data)=>{
        
        }
        ) }
  }

  const savePin =  (id) => {
   
  
    if (!pin?.save?.filter((item)=>{
      return item?.userId === user?.googleId 
    }).length > 0) {

     
      setSavingPost(true);

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [{
          _key: uuidv4(),
          userId: user?.googleId,
          postedBy: {
            _type: 'postedBy',
            _ref: user?.googleId,
          },
        }])
        .commit()
        .then(() => {
setLiked(true)


          setLike(like + 1)
         
          setSavingPost(false);

        });
    }
    else{
      console.log('trying to hack')
    }
  };
//   const unLike = (id)=>{
// client.patch(id).set({comments: []}).

//   }
useEffect(()=>{ 
{pin?.save?.length &&  setLike(pin?.save?.length)}

  if(pin?.save?.filter((item)=>{ 
  return item?.userId === user?.googleId 
}).length >0){setLiked(true); console.log(true)};

setSave(save.concat())


},[])

  return (
    <div className="m-2">
      <Link to={`/user-profile/${postedBy?._id}`} className="flex gap-2 mb-2  items-center">
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={postedBy?.image}
          alt="user-profile"
        />
        <p className="font-semibold capitalize">{postedBy?.userName}</p>
      </Link>
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className=" relative  w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
          {image && (
        <img className="rounded-lg w-full " src={(urlFor(image).width(250).url())} alt="user-post" /> )}
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50 "
            style={{ height: '100%' }}
          >
            <div className="flex items-center justify-between">
              {/* <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                ><MdDownloadForOffline />
                </a>
              </div> */}
              {liked ? (
                <button type="button" className="bg-gray-700 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">
                    Liked
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {pin?.save?.length}   {savingPost ? 'Liking' : 'Like'}
                </button>
              )}
            </div>
            <div className=" flex justify-between items-center gap-2 w-full">
              {destination?.slice(8).length > 0 ? (
                
           <div></div>   ) : undefined}
              
            </div>
          </div>
        )}
      <div
                 
                 target="_blank"
                 className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4  opacity-100  rounded-b-2xl cursor-pointer hover:opacity-100 hover:shadow-md"
                 rel="noreferrer"
               >
                 {' '}
                    {liked ? (
                <button type="button" style={{zIndex:1000}} className= {`opacity-100 ${!liked && 'hidden'} text-white font-bold cursor-pointer py-1 text-base rounded-3xl hover:shadow-md outline-none`}  onClick={(e) => {
                  e.stopPropagation();
                  unLikePin(_id);
                }}>
                    <FcLike  /> 
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLike(like+1)
                    setLiked(true)
                    savePin(_id);
                  }}
                  type="button" style={{zIndex:100}}
                  className= {`opacity-100 $liked && 'hidden'} text-white font-bold cursor-pointer py-1 text-base  rounded-3xl hover:shadow-md outline-none`}
                ><FcLikePlaceholder/>
                 
                </button>
              )}
                 {like}
                 <div className='flex z-10 items-center cursor-pointer  ' style={{zIndex:100}} > <FcComments className='inline mr-2'/>  {pin?.comments?.length} </div> 
                <div>  {pin?.title.length > 7?(<marquee> {pin?.title}</marquee> ):pin?.title} </div>
              <div onClick={(e)=>e.stopPropagation()} className='nav-item dropdown absolute pt-1 right-2 dropdown-toogle bg-white p-2'  type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{zIndex:100}}  ><IoIosOptions className='dropdown-toggle '/> </div>
       
              
      <ul
        className="
          dropdown-menu
          min-w-max
          absolute
          hidden
          bg-white
          text-base
          z-50
          float-left
          py-2
          list-none
          text-left
          rounded-lg
          shadow-lg
          mt-1
          hidden
          m-0
          bg-clip-padding
          border-none
        "
        aria-labelledby="dropdownMenuButton1"
      >{
           postedBy?._id === user?.googleId && (
        <li className='flex items-center' 
        type='button'
        onClick={(e) => {
               e.stopPropagation();
               deletePin(_id);
             }}>
        
           <div
             type="button"
             
             className="bg-white p-2 rounded-full w-8 h-8  items-center  justify-center text-dark opacity-75 hover:opacity-100 outline-none  dropdown-item
              
             py-2
             px-
             
             block
             
             whitespace-nowrap
             bg-transparent
             text-gray-700
             hover:bg-gray-100"
           >
             <AiTwotoneDelete /> 
           </div><p className='text-sm font-normal pr-2'> Delete Pin </p>
          </li>  )
        }
         <li className='flex items-center'>
        
        
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                  }} className='flex justify-center items-center pr-11 '>
                  <div 
                  className="bg-white w-9 h-9 p-2 rounded-full flex  justify-center text-dark text-xl  "
                ><MdDownloadForOffline /> </div>
                
                <p className='text-sm font-normal'>  Pin </p></a>
              
        
       </li> 
       
        
      </ul>
               </div>
               
      </div>
    </div>
  );
};

export default Pin;