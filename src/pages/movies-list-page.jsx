import { Card, Col, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { TableItemMovies } from '../components/TableItemMovies';
import { useEffect, useState } from 'react';
import { Loading } from '../components/Loading';
import { Paginator } from '../components/Paginator';
import { FormSearchMovies } from '../components/FormSearchMovies';
import { FormMovie } from '../components/FormMovie';

export const MoviesListPage = () => {

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({})

  const apiCall = async (endpoint = '/api/v1/movies') => {
  const response = await fetch(`${import.meta.env.VITE_APP_API_HOST}${endpoint}`)
  const result = await response.json();
    setLoading(false)
    setMovies(result.data)
    setPagination(result.meta)
    }

  useEffect(() => {
    apiCall()
  }, []);

  const handleAddMovie = async (formData) => {
    try {
      
      let response = await fetch(`${import.meta.env.VITE_APP_API_URL_BASE}/movies`,{
        method: 'POST',
        body: formData,
        headers: {
          "Content-Type": "application/json"
        }
      })

      let result = await response.json();
      console.log(result);

    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <>
    <div className="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 className="h3 mb-0 text-gray-800">Lista de Peliculas</h1>
    </div>
    <Row>
      <Col sm= {12} md={4}>
        <FormMovie handleAddMovie={handleAddMovie}/>
      </Col>
      <Col sm= {12} md={8}>
      {loading ? ( 
    <Loading/> 
    ) : ( 
      <Card>
      <Card.Body>
        <div className="d-flex justify-content-between">
          <FormSearchMovies apiCall={apiCall}/>
        </div>
      <Paginator pagination={pagination} apiCall={apiCall}/>
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Título</th>
        <th>Duración</th>
        <th>Rating</th>
        <th>Géneros</th>
        <th>Premios</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
  {movies.map(
    ({title,length,rating,genre,awards}, index) => ( 
    <TableItemMovies 
      key={index + title} 
      title={title} 
      length={length} 
      rating={rating} 
      genre={genre} 
      awards={awards}
      />
    )
  )}
    </tbody>
    </Table>
    <Paginator pagination={pagination} apiCall={apiCall}/>
    </Card.Body>
  </Card>
    )}
      </Col>
    </Row>

    </>
  )
}
