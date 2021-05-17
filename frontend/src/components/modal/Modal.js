import React from 'react';
import "./modal.css";

const Modal = (props) => {

  const { open, close } = props;
  
  return (
    <div className={ open ? 'openModal modal' : 'modal' } onClick={close}>
      { open ? ( 
        <section>
          <header>
            
            <button className="close" onClick={close}> &times; </button>
          </header>
          <main>
            jflkdsjflkdsjfdslkafjsldakfjsalkfjasklfjsdaklfjlkdsjfslka
          </main>
          <footer>
            <button className="close" onClick={close}> jdskfljdsalfk </button>
          </footer>
        </section>
      ) : null }
    </div>
  );
};

export default Modal;