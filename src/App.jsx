
import './App.css';
import {BsCashCoin} from 'react-icons/bs';
import Select from 'react-select';
import React, { useState, useEffect  } from 'react';
import {FcInfo} from 'react-icons/fc'
import {IoMdClose} from 'react-icons/io'

import currencyChange from './currencyChanges.json'

import ch from './images/ch.png'
import czk from './images/czk.png'
import dk from './images/dk.png'
import eu from './images/eu.png'
import gb from './images/gb.png'
import hu from './images/hu.png'
import no from './images/no.png'
import pl from './images/pl.png'
import se from './images/se.png'
import us from './images/us.png'

function App() {

  const data = [
    {
      id: 1,
      value: "EUR",
      label: <div className='currency-item'><img src={eu}/><span className='currency-text'>EUR</span></div>
    },
    {
      id: 2,
      value: "PLN",
      label: <div className='currency-item'><img src={pl}/><span className='currency-text'>PLN</span></div>
    },
    {
      id: 3,
      value: "USD",
      label: <div className='currency-item'><img src={us}/><span className='currency-text'>USD</span></div>
    },
    {
      id: 4,
      value: "CHF",
      label: <div className='currency-item'><img src={ch}/><span className='currency-text'>CHF</span></div>
    },
    {
      id: 5,
      value: "GBP",
      label: <div className='currency-item'><img src={gb}/><span className='currency-text'>GBP</span></div>
    },
    {
      id: 6,
      value: "CZK",
      label: <div className='currency-item'><img src={czk}/><span className='currency-text'>CZK</span></div>
    },
    {
      id: 7,
      value: "NOK",
      label: <div className='currency-item'><img src={no}/><span className='currency-text'>NOK</span></div>
    },
    {
      id: 8,
      value: "SEK",
      label: <div className='currency-item'><img src={se}/><span className='currency-text'>SEK</span></div>
    },
    {
      id: 9,
      value: "DKK",
      label: <div className='currency-item'><img src={dk}/><span className='currency-text'>DKK</span></div>
    },
    {
      id: 10,
      value: "HUF",
      label: <div className='currency-item'><img src={hu}/><span className='currency-text'>HUF</span></div>
    }
  ];

  const languages = [
    {
      id: 1,
      value: "PL",
      label: <div className='currency-item'><img src={pl}/><span className='currency-text'>PL</span></div>

    },
    {
      id: 2,
      value: "ENG",
      label: <div className='currency-item'><img src={us}/><span className='currency-text'>ENG</span></div>
    }
  ];
  
  const [language, setLangugage] = useState(languages[0]);
  const [selectedOptionFrom, setSelectedOptionFrom] = useState(data[0]);
  const [selectedOptionTo, setSelectedOptionTo] = useState(data[1]);
  const [firstInputValue,setFirstInputValue] = useState('');
  const [secondInputValue,setSecondInputValue] = useState('');
  const [openPopup,setOpenPopup] = useState(false)


  const handlePopup = e =>{
    setOpenPopup(true)
  }

  const handleLanguage = e => {
    setLangugage(e);
  }

  const handleClose = e => {
    setOpenPopup(false)
  }

  const handleChangeFrom = e => {
    setSelectedOptionFrom(e);
  }


  const handleChangeTo= e => {
    setSelectedOptionTo(e);
}



  useEffect(() => {
      let rate = 0;
      currencyChange.map(element => {
          let selectedValue = element[selectedOptionFrom.value]
          for(let i=0;i<selectedValue.length;i++){
            if(selectedValue[i].currency===selectedOptionTo.value){
                rate = selectedValue[i].value
            }
          }
      });
      setSecondInputValue((firstInputValue*rate).toFixed(2));
  }, [selectedOptionTo, selectedOptionFrom, firstInputValue]);

  useEffect(() => {
    setLangugage(language)
}, [language]);


  const onChangeFirstInput = e =>{
    let rate = 0;
    currencyChange.map(element => {
        let selectedValue = element[selectedOptionFrom.value]
        for(let i=0;i<selectedValue.length;i++){
          if(selectedValue[i].currency===selectedOptionTo.value){
              rate = selectedValue[i].value
          }
        }
    });
    setFirstInputValue(e.target.value)
    setSecondInputValue((e.target.value*rate).toFixed(2));
  }

  return (
    <div className='app-container'>
      <div className='navbar'>
        <div className='logo-box'>
          <span className='logo-text'><BsCashCoin className='logo'/>currency exchanger</span>
          <Select
                  className='languageBox'
                  value={language}
                  options={languages}
                  onChange={handleLanguage}  
            />
        </div>  
      </div>
      <div className='content-box'>
        <div className='box'>
          <FcInfo className='info' onClick={handlePopup}></FcInfo>
          <div>
            {openPopup && language.value==='ENG'&& (
              <div className="popup">
                <h3>Instruction</h3>
                <p>1. First, select the currency from which you want to convert (The default value for this field is EUR)</p>
                <p>2. Enter the value you want to convert in the first field (box next to EUR)</p>
                <p>3. After entering a value in the first field, the entered value will be converted to the currency next to the second field(default value PLN) and will be displayed in the second field</p>
                <p>4. It is possible to change the currency</p>
                <IoMdClose className='close' onClick={handleClose}></IoMdClose>
              </div>
            )}
            {openPopup && language.value==='PL'&& (
              <div className="popup">
                <h3>Instrukcja</h3>
                <p>1. Najpierw wybierz walutę, z której chcesz dokonać przeliczenia (domyślną wartością dla tego pola jest EUR)</p>
                <p>2. Wpisz wartość, którą chcesz przeliczyć w pierwszym polu (pole obok EUR)</p>
                <p>3. Po wpisaniu wartości w pierwszym polu, wpisana wartość zostanie przeliczona na walutę znajdującą się obok drugiego pola (domyślnie PLN) i zostanie wyświetlona w drugim polu</p>
                <p>4. Jest możliwość zmiany waluty</p>
                <IoMdClose className='close' onClick={handleClose}></IoMdClose>
              </div>
            )}
            {openPopup && <div className="overlay" onClick={() => setOpenPopup(false)} />}
          </div>
          <div className='from-box'>
            <Select
                  className='selectBox'
                  value={selectedOptionFrom}
                  options={data} 
                  onChange={handleChangeFrom} 
            />
            <label htmlFor="inputFrom"></label>
            <input type="number" id="inputFrom" className='firstInput' onChange={onChangeFirstInput} />
          </div>

          <div className='to-box'>
            <label htmlFor="inputFrom"></label>
            <input type="number" id="inputFrom" className='secondInput'defaultValue={secondInputValue} readOnly />
            <Select
                  className='selectBox'
                  value={selectedOptionTo} 
                  options={data}
                  onChange={handleChangeTo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
