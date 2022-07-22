import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCharacters } from "../../redux/charactersSlice";
import { Link } from "react-router-dom";

export default function Home() {
  const { allCharacters, isLoading, error } = useSelector(
    (state) => state.charactersSlice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCharacters());
    console.log(allCharacters);
  }, [dispatch]);

  if (error) {
    return (
      <div>
        <h1>Error {error}</h1>
      </div>
    );
  }

  return (
    <div style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}>
      <h1>characters</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: " repeat(4, auto)",
          gap: 50,
        }}
      >
        {allCharacters.map((character) => (
          <div
            className="character-list"
            key={character.char_id}
            style={{ border: "2px solid #eee", borderRadius: 10 }}
          >
            <Link to={`char/${character.char_id}`}>
              <div>
                <img
                  src={character.img}
                  style={{
                    width: "200px",
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                />
              </div>
              <h3>{character.name}</h3>
            </Link>
          </div>
        ))}
      </div>
      {isLoading && <h2>Loading...</h2>}
      <button style={{ margin: "50px", padding: "20px 30px" }}>
        Load more
      </button>
    </div>
  );
}
