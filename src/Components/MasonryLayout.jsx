import React from 'react';
import { useContext } from 'react';
import Masonry from 'react-masonry-css';
import Context1 from '../Context hook/Context1';
import Pin from './Pin';
import Spinner from './Spinner';

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ pins }) => {
  const context = useContext(Context1)
  const {showLoading} = context;

  

  
  return(
  <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointColumnsObj}>
    
    {showLoading && <div className='mt-4  h-28 animate-pulse'> <Spinner  message={`We are adding your idea to our feed!`} /></div>}
    {pins?.map((pin) => <Pin key={pin._id} pin={pin} className="w-max" />)}
  </Masonry>
)};

export default MasonryLayout;