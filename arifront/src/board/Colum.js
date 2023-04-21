import React from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card';

const Column = ({ title, incidencias, onDrop, handleShowChatModal,handleShowChatMD,userRole,correoTecnico }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'card',
    drop: (item) => {
      onDrop(item.incidencia);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));


  return (
    <div
    ref={drop}
    style={{
      marginTop:'20px',
      minWidth: '300px',
      minHeight: '200px',
      padding: '16px',
      backgroundColor: isOver ? '#fff' : '#fff',
      borderRadius: '4px',
      border: '1px solid #ccc',
      boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
    }}
  >
      <h3>{title}</h3>
      {incidencias.map((incidencia, index) => (
       <Card
       key={index}
       incidencia={incidencia}
       index={index}
       handleShowChatModal={handleShowChatModal}
       handleShowChatMD={handleShowChatMD}
       userRole={userRole}
       correoTecnico={correoTecnico}
     />
   
      ))}
    </div>
  );
};

export default Column;
