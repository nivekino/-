import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import UpdateForm from './UpdateForm';

const UpdateScreen = (props) => {
  const { match } = props;
  const { user } = useContext(AuthContext);
  const [descripcionBd, setDescripcionBd] = useState('');
  const [titleBd, setTitleBd] = useState('');
  const [imageBd, setImageBd] = useState('');

  useEffect(() => {
    fetch(`https://posts-pw2021.herokuapp.com/api/v1/post/one/${match.params.idpost}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDescripcionBd(data.description);
        setTitleBd(data.title);
        setImageBd(data.image);
      });
  }, [match.params.idpost]);

  return (
    <UpdateForm
      titulo={titleBd}
      descripcion={descripcionBd}
      imagen={imageBd}
      postId={match.params.idpost}
    />
  );
};

export default UpdateScreen;
