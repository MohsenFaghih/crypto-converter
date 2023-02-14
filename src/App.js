import './App.css';
import Converter from './components/converter/Converter';
import { useEffect, useState } from 'react';
import { getDcp, getCurrencies } from './api/fetchCurrencies';
import Loading from './components/loading/Loading';

function App() {

  const [data, setData] = useState(null);
  const [dcp, setDcp] = useState(null);
  const [refresh, setRefresh] = useState(null)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    setLoading(true)
    const getData = async () => {
      await getDcp().then(res => setDcp(res.data)).catch(error => setError(error))
      await getCurrencies().then(res => setData(res.data)).catch(error => setError(error))
      setLoading(false)
    };
    getData()
  }, [refresh])

  return (
    <div className="App">
      <header><h1>DCP Converter Calculator</h1></header>
      {loading ? <Loading /> : 
        error ? <div>ERROR</div> :
        (typeof dcp === 'object' && typeof data === 'object' ) ? <Converter currencies={data} dcp={dcp} refresh={setRefresh} /> : null
      }
    </div>
  );
}

export default App;
