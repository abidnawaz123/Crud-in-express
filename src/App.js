import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([])
  const [value, setValue] = useState("")
  const [updateLabel, setUpdateLabel] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const res = await fetch("http://localhost:8000/todos/")
      .then(response => response && response.json())
      .then(res => res && setData(res))
  }

  const sendDataToBE = async () => {
    const text = value.trim()
    if (updateLabel) {
      updateText()
    }
    else {
      value.trim().length &&
        text && await fetch("http://localhost:8000/todos/", {
          method: "POST",
          body: JSON.stringify({ text }),
          headers: {
            "Content-type": "application/json"
          }
        })
    }
    fetchData()
    setValue("")

  }

  const delteAnItem = async (id) => {
    console.log('the id ->', id)
    await fetch(`http://localhost:8000/todos/${id}`, { method: "DELETE" })
    fetchData()
  }

  const updateText = (id) => {
    setUpdateLabel(true)
    const currentItem = data.find(item => item.id === id)
    console.log('currentItem',currentItem)
    setValue(currentItem.text)

    // setUpdateLabel(false)
  }

  return (
    <div className="App">
      <input type="text" placeholder='send some text' value={value} onChange={(e) => { setValue(e.target.value) }} />
      <button onClick={sendDataToBE}>{updateLabel ? "update" : "add"}</button>
      <ul className='unorderedList'>
        {data ? data?.map(text =>
          <li key={text.id}>{text.id} {text.text}
            <button onClick={() => { delteAnItem(text.id) }}>delete</button>
            <button onClick={() => { updateText(text.id) }}>update</button>
          </li>
        ) : <div>no data </div>
        }
      </ul>
    </div>
  );
}

export default App;
