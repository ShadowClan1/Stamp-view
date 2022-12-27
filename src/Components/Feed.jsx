import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { client } from '../client';
import Context1 from '../Context hook/Context1';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Feed = () => {
  const context = useContext(Context1);
  const {pins, setPins, showLoading} = context
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  const location = useLocation()
// const [pins, setPins] = useState()
  useEffect( () => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      setLoading(true);

      client.fetch(feedQuery).then((data) => {
        setPins(data);
    
        setLoading(false);
      });
    }
  }, [categoryId, location]);

  const ideaName = categoryId || 'new';
  if (loading) {
    return (
      <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />
    );
  }
  return (
    <div>
      {pins && (
        <MasonryLayout pins={pins} />
      )}
    </div>
  );
};

export default Feed;