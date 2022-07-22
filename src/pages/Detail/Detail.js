import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { fetchCharacterDetail } from "../../redux/charactersSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Detail() {
  const { char_id } = useParams();
  const dispatch = useDispatch();

  const { charDetail, isLoading, error } = useSelector(
    (state) => state.charactersSlice
  );

  useEffect(() => {
    dispatch(fetchCharacterDetail(char_id));
    console.log(charDetail);
  }, [dispatch]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error {error}</h2>;
  }

  return (
    <div>
      <div>
        {charDetail.map((i) => (
          <div key={i.char_id}>
            <div>{i.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
