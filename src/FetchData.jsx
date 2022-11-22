import React, { useEffect, useState } from 'react'
import useStore from './store';
import styled from 'styled-components'
import Loading from './Loading/Loading';
import DataTable from 'react-data-table-component'
import ModalComponent from './Modal/ModalComponent';

const FetchData = () => {
    const data = useStore((state) => state.data);
    const loading = useStore((state) => state.loading);
    const hasErrors = useStore((state) => state.hasErrors);
    const fetchData = useStore((state) => state.fetch);
    const [modal, setModal] = useState(false)
    const removeStudent = useStore(state => state.removeStudent);
    
    const deleteHandler = (id)=>{
      removeStudent(id)
    }

    useEffect(()=>{
        fetchData()
    },[])

   const Columns = [
        {
           name:'Id',
            selector:(row)=>row.id
          },
        {
          name:'Name',
          selector:(row)=>row.name
        },
        {
          name:'Email',
          selector:(row)=>row.email
        },
        {
            name:'Gender',
          selector:(row)=>row.gender
        },
        {
            name:'Address street',
            selector:(row)=>row.address.street
          },
          {
            name:'Address city',
            selector:(row)=>row.address.city
          },
        {
            name:'Phone',
            selector:(row)=>row.phone
        },
        {
            name:'Delete',
            selector:(row)=><ButtonElement onClick={()=>deleteHandler(row.id)}>Delete</ButtonElement>
        },
      ]

   if (loading) {
      return <Loading/>
    }
   if (hasErrors) {
      return <h3>cannot read data</h3>;
    }

  return (
    <div>
    <ModalComponent modal={modal} setModal={setModal}/>
      { 
        <DataTable
          columns={Columns} 
          data={data}
          />
      }
    </div>
  )
}

export default FetchData


const ButtonElement = styled.button`
  background: transparent;
  border-radius: 3px;
  color: black;
  margin: 0 1em;
  outline:none;
  border:1px solid black;
  padding: 0.25em 1em;
  cursor:pointer;
  &:hover{
    opacity:0.5;
    transition:0.5s;
  }
`