import React from "react";
import "./App.css";

function App() {
  const [data, setData] = React.useState([]);
  const [filterText, setFilterText] = React.useState("");
  let totalCost = 0;
  React.useEffect(() => {
    for (let i = 1; i <= 3; i++)
      fetch(`/branch${i}.json`)
        .then((res) => res.json())
        .then((data) => {
          const storedata = data.products;
          setData((prev) => [...storedata, ...prev]);
        });
  }, []);
  //sort alphabetically
  data.sort((a, b) => {
    let na = a.name.toLowerCase(),
      nb = b.name.toLowerCase();
    if (na < nb) return -1;
    if (na > nb) return 1;
    return 0;
  });

  let sumUpdata = [];
  data.forEach((item) => {
    let ind = sumUpdata.findIndex((e) => e.name === item.name);
    if (ind > -1) {
      sumUpdata[ind].total += item.sold * item.unitPrice;
    } else {
      sumUpdata.push({ ...item, total: item.sold * item.unitPrice });
    }
  });
  function filterData(text) {
    setFilterText(text);
  }
  const store = (
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Total Revenue</th>
        </tr>
      </thead>
      <tbody>
        {sumUpdata.map(({ id, name, total }) => {
          if (filterText.length > 0 && name.toLowerCase().indexOf(filterText))
            return;
          totalCost += total;
          return (
            <tr key={id + name}>
              <td>{name}</td>
              <td>{new Intl.NumberFormat("en-IN").format(total)}</td>
            </tr>
          );
        })}
        <tr>
          <th>Total</th>
          <th>{new Intl.NumberFormat("en-IN").format(totalCost)}</th>
        </tr>
      </tbody>
    </table>
  );
  return (
    <div id="container">
      <div className="search">
        <label>Search Item :</label>
        <input
          value={filterText}
          onChange={(e) => filterData(e.target.value)}
        />
      </div>
      {store}
    </div>
  );
}

export default App;
