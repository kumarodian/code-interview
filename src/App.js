import React from "react";
import "./App.css";

function App() {
  const [data, setData] = React.useState([]);
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

  let sumUpdata = data.reduce((b, a) => {
    let ind = b.findIndex((e) => e.name === a.name);
    let c = a.name.toLowerCase().split(" ").join("");
    if (ind > -1) {
      if (!b[ind].total) b[ind].total = 0;
      b[ind].total += a.unitPrice * a.sold;
    } else {
      a[c] = +a[c] || 0;
      if (!a.total) a.total = 0;
      a.total += a.unitPrice * a.sold;
      b.push(a);
    }
    return b;
  }, []);
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
  return <div>{store}</div>;
}

export default App;
