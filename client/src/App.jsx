import {useState} from 'react'
import axios from "axios";
import './App.scss'

function App() {
    const [data, setData] = useState([])
    const [axiosTimer, setAxiosTimer] = useState('')
    const handleChange = (event) => {
        let startTime = Date.now();
        const query = event.target.value
        axios.get(`http://localhost:4001?q=${query}`)
            .then((response) => {
                axiosTimerFunc(startTime);
                setData(response.data);
            })
    }
    const axiosTimerFunc = (startTime) => {
        let now = Date.now();
        let ms = now - startTime;
        setAxiosTimer(`${ms}`);
    }
    return (
        <div className="App">
            <div className="searchContainer">
                {data.length > 0 &&
                    <small className="pb-1">Results generated in {axiosTimer} ms</small>
                }
                <input type="text" onChange={handleChange}/>
                {data.length > 0 &&
                    <div className="results">
                        <ul>
                            {data.map(item => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                }
            </div>
        </div>
    );
}

export default App;
