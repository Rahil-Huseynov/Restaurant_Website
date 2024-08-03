import { useEffect, useState } from 'react';
import './App.css';
import { useAppSelector } from './redux/hook';
import { useGetMealQuery } from './Services/Api/MealApi';
import logo from './assets/logo.png'
import { Link } from 'react-router-dom';

function App() {
  useGetMealQuery();
  const data = useAppSelector((state) => state.meal.meals);
  const [filteredData, setFilteredData] = useState<any[]>(() => {
    const savedFilteredData = localStorage.getItem('filteredData');
    return savedFilteredData ? JSON.parse(savedFilteredData) : [];
  });

  useEffect(() => {
    if (data && data.length > 0) {
      const savedFilteredData = localStorage.getItem('filteredData');

      if (!savedFilteredData) {
        setFilteredData(data);
        localStorage.setItem('filteredData', JSON.stringify(data));
      } else {
        setFilteredData(JSON.parse(savedFilteredData));
      }
    }
  }, [data]);

  useEffect(() => {
    if (filteredData.length > 0) {
      localStorage.setItem('filteredData', JSON.stringify(filteredData));
    }
  }, [filteredData]);

  return (
    <>
      <div className='container_app'>
        <div className='container_1'>
          <div className='logo_container-1'>
            <img className='logo_1' src={logo} />
          </div>
          <div className='mealorder'>Meal Order</div>
          <div className='container-2'>
            <Link className='get_started' to='home'>GET STARTED</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
