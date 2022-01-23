import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Person from './Person';

const People = () => {
  const [page, setPage] = useState(1);

  const fetchPeople = async ({ queryKey }) => {
    const res = await fetch(
      `https://swapi.dev/api/people/?page=${queryKey[1]}`
    );
    return res.json();
  };

  const { data, status } = useQuery(['people', page], fetchPeople);
  console.log(data);
  return (
    <div>
      <h2>People</h2>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <>
          <div>
            <button
              className="btn"
              disabled={page === 1}
              onClick={() => {
                setPage((current) => current - 1);
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
            {data.results.map((person) => (
              <Person key={person.name} person={person} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default People;
