import React, { KeyboardEvent, useState } from 'react';
import ButtonsNumbers from '../components/buttonsNumbers/ButtonsNumbers';
import Input from '../components/input/Input';

import './Home.scss';

export interface IButtonsNumber {
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setHistory: React.Dispatch<React.SetStateAction<string>>;
  setKeyPad: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
  keyPad: string;
}

export interface ISetInput {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const Home: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [history, setHistory] = useState<string>('');
  const [keyPad, setKeyPad] = useState<string>('');

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Enter') {
      setKeyPad(e.code);
    } else if (e.code === 'Escape') {
      setKeyPad(e.code);
    }if (e.key === '*') {
      setKeyPad(e.key);
    }if (e.key === '%') {
      setKeyPad(e.key);
    }

  };

  return (
    <main className="wrapper-container">
      <div className="container">
        <div className="header">
          <p className="value">{history}</p>
          <Input setInputValue={setInputValue} inputValue={inputValue} onKeyDown={onKeyDown} />
        </div>
        <div className="body">
          <div className="container-buttons">
              <ButtonsNumbers
                setInputValue={setInputValue}
                inputValue={inputValue}
                setHistory={setHistory}
                setKeyPad={setKeyPad}
                keyPad={keyPad}
              />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
