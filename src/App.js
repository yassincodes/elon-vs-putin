// collect all the music you listened to while building your portfolio
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
      <header className="header">
        <h1>elon vs putin</h1>
      </header>
      <div className="total-clicks"> 
         <p>Total clicks: {elon.length + putin.length} </p>
      </div>
      <div className="container">
        <div className="box">
          <div className="statics-container">
            <p>elon: {elon.length} clicks</p>
            <p>{((elon.length / (putin.length + elon.length)) * 100).toFixed(2)} % chance of winning</p>
          </div>
            <div className="img-container">
            <img className="elon-img" src="https://i.suar.me/ZpMNw/l" />
          </div>
          <div className="add-container">
            <button>elon's profile</button>
            <button onClick={() => vote("elon")}>vote for elon</button>
          </div>
        </div>
        <div className="box">
          <div className="statics-container">
            <p>putin: {putin.length} clicks</p>
            <p>{((putin.length / (putin.length + elon.length)) * 100).toFixed(2)} % chance of winning</p>
          </div>
            <div className="img-container">
            <img className="putin-img" src="https://i.suar.me/yXVoq/l" />
          </div>
          <div className="add-container">
            <button>putin's profile</button>
            <button onClick={() => vote("putin")}>vote for putin</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
