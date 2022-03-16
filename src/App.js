import {useState, useEffect} from "react"
import firebase from "./firebase"

function App() {
  function vote(forWho) {
    firebase.database().ref(forWho).push({
      number:"+1"
    })
  }

  const [elon, setElon] = useState("")
  const [putin, setPutin] = useState("")
  useEffect(() => {
    // getting putin data
    firebase.database().ref("elon").on('value', (snapshot) => {
    const snapshotVal = snapshot.val()
    const elon = []
    for (let id in snapshotVal) {
      elon.push({id, ...snapshotVal[id]})
    }
    setElon(elon)
    });

    firebase.database().ref("putin").on('value', (snapshot) => {
      const snapshotVal = snapshot.val()
      const putin = []
      for (let id in snapshotVal) {
        putin.push({id, ...snapshotVal[id]})
      }
      setPutin(putin)
      });
  }, [])
  
  return (
    <div className="App">
      <h1>elon vs putin</h1>
      <p>Total click: ...</p>
      <div className="container">
        <div className="box">
          <p>elon {elon.length} clicks</p>
          <p>percent %</p>
          <img src="" />
          <p>total clicks: </p>
          <button>see more about elon</button>
          <button onClick={() => vote("elon")}>vote for elon</button>
        </div>
        <div className="box">
          <p>putin {putin.length} clicks</p>
          <p>percent %</p>
          <img src="" />
          <p>total clicks: </p>
          <button>see more about putin</button>
          <button onClick={() => vote("putin")}>vote for putin</button>
        </div>
      </div>
    </div>
  );
}

export default App;
