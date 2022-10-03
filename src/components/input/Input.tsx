import React, { ChangeEvent, KeyboardEvent } from 'react';

import { ISetInput } from '../../page/home/Home';

const Input: React.FC<ISetInput> = ({ inputValue, setInputValue, onKeyDown }) => {
  const getChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <>
      <input
        type="text"
        onChange={(event: ChangeEvent<HTMLInputElement>) => getChangeValue(event)}
        value={inputValue}
        onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => onKeyDown(event)}
        placeholder="0"
      />
    </>
  );
};

export default Input;
