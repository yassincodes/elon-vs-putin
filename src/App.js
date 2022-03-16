// collect all the music you listened to while building your portfolio
import {useState, useEffect} from "react"
import firebase from "./firebase"
import Modal from "react-awesome-modal"
import axios from "axios"
function App() {
  const [country, setCountry] = useState('')
  const getData = async () => {
  const res = await axios.get('https://geolocation-db.com/json/')
  setCountry(res.data.country_name)
  }

  useEffect( () => {
    getData()
  }, [])

  function vote(forWho) {
    firebase.database().ref(forWho).push({
      number:"+1",
      country:country
    })
  }
  const [visible1, setVisible1] = useState(false)
  const [visible2, setVisible2] = useState(false)
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
            <button onClick={() => setVisible1(true)}>elon's profile</button>
            <button onClick={() => vote("elon")}>vote for elon</button>
          </div>
          <Modal visible={visible1} width="400" height="300" effect="fadeInDown" onClickAway={() => setVisible1(false)}>
              <div className="modal">
                  figher name: elon
                  <br />
                  Age: 50
                  <br/>
                  Weight: 180lbs
                  <br/>
                  Height: 6'2''
                  <br />
                  Notable Traits: 
                  <br />
                  Fought a 350lb Sumo wrestler
                  <br />
                  weapons experience: 
                  <br />
                  sword / flamethrower
              </div>
          </Modal>
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
            <button onClick={() => setVisible2(true)}>putin's profile</button>
            <button onClick={() => vote("putin")}>vote for putin</button>
          </div>
          <Modal visible={visible2} width="400" height="300" effect="fadeInDown" onClickAway={() => setVisible2(false)}>
              <div className="modal">
                  figher name: putin
                  <br />
                  Age: 69
                  <br/>
                  Weight: 159lbs
                  <br/>
                  Height: 5'6''
                  <br />
                  Notable Traits: 
                  <br />
                  KGB Agent / takewondo black belt
                  <br />
                  weapons experience: 
                  <br />
                  Firearms
                  <br />
                  + he can bring his bear
              </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default App;
