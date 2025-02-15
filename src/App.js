import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`http://ec2-18-190-160-141.us-east-2.compute.amazonaws.com:5001/api/data?limit=${limit}&offset=${offset}&search=${search}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));

    let previousButton = document.getElementById("previousButtonId");
    let nextButton = document.getElementById("nextButtonId");

    if (offset == 0) {
      previousButton.disabled = true;
      nextButton.disabled = false;
    } else {
      previousButton.disabled = false;
    };
    if (((data.length < limit && offset > 100) || offset >= 110) && !nextButton.disabled) {
      nextButton.disabled = true;
      previousButton.disabled = false;
    } else {
      nextButton.disabled = false;
    };
  }, [limit, offset, search]);

  function handleSearchChange(e) {
    setSearch(e.target.value);
  };

  return (
    <div>
      <table id="periodicTableId">
        <tbody>
          <tr id="buttonTrId">
            <th id="prevBtnThId" colSpan={2}>
              <button id="previousButtonId" onClick={() => setOffset(offset - limit)}>
                Previous
              </button>
            </th>
            <th id="nextBtnThId" colSpan={2}>
              <button id="nextButtonId" onClick={() => setOffset(offset + limit)}>
                Next
              </button>
            </th>
          </tr>
          <tr id="searchTextTrId">
            <th id="searchTextThId" colSpan={4}>
              <label>Search Element: </label><input type="text" size="30" onChange={handleSearchChange}></input>
            </th>
          </tr>
          <tr id="tableHeaderTrId"><th id="col1Id">Atomic Number</th><th id="col2Id">Symbol</th><th id="col3Id">Element</th><th id="col4Id">Atomic Mass</th></tr>
          {data.map(e => (
            <tr id={e.atomic_number}><td id={e.atomic_number} class="col1-td">{e.atomic_number}</td><td id={e.element} class='col2-td'>{e.symbol}</td><td id={e.symbol} class='col3-td'>{e.element}</td><td id={e.atomic_mass} class='col4-td'>{e.atomic_mass}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
