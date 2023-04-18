import {useState} from 'react'
import axios from "axios";
import './App.scss'

function App() {
    const [data, setData] = useState([])
    const [axiosTimer, setAxiosTimer] = useState('')
    const handleChange = (event) => {
        let startTime = Date.now();
        const query = event.target.value.trim()
        if (query != ""){
            axios.get(`http://localhost:4001?q=${query}`)
                .then((response) => {
                    axiosTimerFunc(startTime);
                    setData(response.data);
                })
        }
    }
    const axiosTimerFunc = (startTime) => {
        let now = Date.now();
        let ms = now - startTime;
        setAxiosTimer(`${ms}`);
    }
    return (
        <div className="App">
            <div className="searchContainer">
                <div className="resultTime mb-1">
                    {data.length > 0 ?
                        <small>Results generated in {axiosTimer} ms</small>
                        :
                        <small>Search in 140889 City Name</small>
                    }
                </div>
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
