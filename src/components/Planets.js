import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Planet from './Planet';

const Planets = () => {
  const [page, setPage] = useState(1);

  const fetchPlanets = async ({ queryKey }) => {
    const res = await fetch(
      `https://swapi.dev/api/planets/?page=${queryKey[1]}`
    );
    return res.json();
  };

  const { data, status } = useQuery(['planets', page], fetchPlanets);
  console.log(data);
  return (
    <div>
      <h2>Planets</h2>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <>
          <div>
            <button
              className="btn"
              disabled={page === 1}
              onClick={() => {
                setPage((old) => old - 1);
              }}
            >
              Previous
            </button>
            {page}
            <button
              className="btn"
              disabled={!data.next}
              onClick={() => {
                setPage((current) => current + 1);
              }}
            >
              Next
            </button>
          </div>
          <div>
            {data.results.map((planet) => (
              <Planet key={planet.name} planet={planet} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Planets;
