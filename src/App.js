import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";


function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('/repositories').then(response =>{
      setRepositories(response.data);
      //console.log(response);
    });
  }, []);



   async function handleAddRepository() {
    // TODO

     const response = await api.post('/repositories',{

      title:"Novo projeto2", 
      url:"https://github.com/CesarWebTrin/conceitos-nodejs.git", 
      techs: "Node js"
    });

    const repository = response.data;

    setRepositories([...repositories, repository]); 

    /* api.post('repositories', {
      title:"Novo projeto", 
      url:"https://github.com/CesarWebTrin/conceitos-nodejs.git", 
      techs: "Node js"
    }); */

  }

  async function handleRemoveRepository(id) {
    
    api.delete(`/repositories/${id}`).then(reponse =>{
      
        const newRepositories = repositories.filter(repository => repository.id !== id);

        setRepositories(newRepositories);
      
    })

  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repository => <li key={repository.id}> 
            <li>{repository.title}</li>)
          <button onClick={() => handleRemoveRepository(repository.id)}>            
            Remover
          </button>
        </li>
        )}            
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
