import React, { useEffect, useState } from "react";
import "./admin.css";
import { v4 as uuidv4 } from "uuid";
function Admin() {
  const [myinp1, setmyinp1] = useState("");
  const [myinp2, setmyinp2] = useState("");
  const [mydata, setmydata] = useState([]);
  // update usestate
  const [updateinp1, setupdateinp1] = useState("");
  const [updateinp2, setupdateinp2] = useState("");
  const [updateid, setupdateid] = useState("");

  useEffect(() => {
    datas();
  }, []);
  //   datalari cekmek
  async function getDetails() {
    const response = await fetch("http://localhost:3000/Match");
    const data = await response.json();
    return data;
  }
  // data elave etmek
  async function addDetails(obj) {
    const response = await fetch("http://localhost:3000/Match", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    const data = await response.json();
    return data;
  }
  //   datalari silmek
  async function Deletebyid(id) {
    const response = await fetch("http://localhost:3000/Match/" + id, {
      method: "delete", // or 'PUT'
    });
    const data = await response.json();
    return data;
  }
  datas();
  async function datas() {
    let datalar = await getDetails();
    setmydata(datalar);
  }
  async function deleteId(id) {
    await Deletebyid(id);
  }

  function handlesubmit(e) {
    e.preventDefault();
    let newobj = {
      id: uuidv4(),
      club: myinp1,
      score: myinp2,
    };
    addDetails(newobj);
    setmyinp1("");
    setmyinp2("");
  }
  //   datalari guncellemek
  async function UpdateDetail(id) {
    const response = await fetch("http://localhost:3000/Match/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ club: updateinp1, score: updateinp2 }),
    });
    const data = await response.json();
    return data;
  }
  function updatebyid(id){
    UpdateDetail(id)
  }
  // updateDetail(id)
  return (
    <>
      <form className="form" onSubmit={handlesubmit}>
        <h1>AdminCrudFakeApi</h1>
        <input
          type="text"
          className="inp1"
          placeholder="clubName..."
          value={myinp1}
          onChange={(e) => setmyinp1(e.target.value)}
          required
        />
        <input
          type="text"
          className="inp2"
          placeholder="score..."
          value={myinp2}
          onChange={(e) => setmyinp2(e.target.value)}
          required
        />
        <button>Add</button>
      </form>
      <div>
        {mydata.map((x) => (
          <>
            <ol>
              <li key={x.id}>
                <h3>Club Name:{x.club}</h3>
                <h3>Score:{x.score}</h3>
              </li>
              <button onClick={() => deleteId(x.id)}>delete</button>
              <br />
              <br />
              <button onClick={()=>{
                setupdateinp1(x.club)
                setupdateinp2(x.score)
                setupdateid(x.id)
              }}>Update</button>
            </ol>
          </>
        ))}
        {/* guncelleme */}
        <div className="form">
          <h1>Update</h1>
          <input
            type="text"
            placeholder="clubname..."
            value={updateinp1}
            onChange={(e) => setupdateinp1(e.target.value)} required
          />
          <input
            type="text"
            placeholder="score..."
            value={updateinp2}
            onChange={(e) => setupdateinp2(e.target.value)} required
          />
          <button onClick={updatebyid(updateid)}>Update</button>
        </div>
      </div>
    </>
  );
}

export default Admin;
