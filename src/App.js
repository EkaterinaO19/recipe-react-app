import React, {useState, useEffect} from 'react';
import './App.css';
import Recipe from './Recipe';


const App = ()  => {
const APP_ID = 'e2a86728';
const APP_KEY = '174aba31dde5a2a7c7fcae7b44549016';

const [recipes, setRecepes] = useState([]);
const [search, setSearch] = useState('');
const [query, setQuery] = useState('chicken');

useEffect(() => {
  getRecepes()
}, [query]);

const getRecepes = async () => {
  const response = await fetch(
    `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
  );
  const data = await response.json();
  setRecepes(data.hits);
  console.log(data.hits)
}

const updateSearch = e => {
  setSearch(e.target.value);
  console.log(search);
};

const getSearch = e => {
  e.preventDefault();
  setQuery(search)
}


  return (
    <div className="App">
        <nav style={{
        backgroundColor: "pink",
        height: "4rem",
        width: "100%",
        fontSize: "30px",
        fontWeight: "bold",
        color: "white"
      }}>
        Recepie
        <img src={'1f967.png'} style={{
          width: "40px",
          height: "40px",
          paddingLeft: "1rem",
          paddingTop: "5px"
        }}/>
      </nav>
      <form onSubmit={getSearch} className='search-form' style={{marginTop: "2rem"}}>
        <input 
          className='search-input' 
          type={'text'} 
          value={search} 
          onChange={updateSearch}
          style={{borderRadius: "5px", width: "20rem", height: "23px", fontSize: "20px"}}
        >
        </input>
        <button 
          className='search-button' 
          type='submit'
          style={{
            backgroundColor:"pink",
            borderRadius: "10px",
            fontSize: "20px",
            marginLeft: "1rem",
            cursor: "pointer"
        }}>
            Search
          </button>
      </form>
      <div style={{display:"grid", gridTemplateColumns: "1fr 1fr"}}>
          {recipes.map(r => (
              <Recipe
                  key={r.recipe.label}
                  title={r.recipe.label}
                  calories={r.recipe.calories}
                  image={r.recipe.image}
                  ingredients ={r.recipe.ingredients}
              />
          ))}
      </div>
    <footer style={{
        backgroundColor: "pink",
        height:"3rem",
        color:"white",
        fontWeight: "bold",
        fontSize: "25px",
        paddingTop: "1rem"
    }}>Made with love
   </footer>
    </div>
  );
}

export default App;
