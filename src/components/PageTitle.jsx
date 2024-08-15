import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function PageTitle(props) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigate back
  };

  const backButtonStyle = {
    border: "none",
    background: "none",
    color: "white",
    fontSize: "calc(1.375rem + 1.5vw)"
  };

  const h1Style = { color: "var(--light-text-color)" }

  return (
    <div className='page-title d-flex align-items-center justify-content-center my-4'>
      <button style={backButtonStyle} className='back-button me-2' onClick={handleBackClick}><i className="fa-solid fa-arrow-left"></i></button>
      <h1 className='m-0' style={h1Style}>{props.title}</h1>
    </div>
  );
}