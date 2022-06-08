import React from 'react';
import cn from 'classnames';

import style from './index.module.css';

type Props = {
  onSearch?;
};

export default function Search({ onSearch }: Props) {
  const [inputState, setInputState] = React.useState(false);
  const [text, setText] = React.useState('');

  const changeInput = React.useCallback(() => {
    setInputState(true);
    document.getElementById('input').focus();
  }, []);

  const changeText = React.useCallback((e) => {
    setText(e.target.value);
  }, []);


  React.useEffect(() => {
    document.getElementById("search_form").onsubmit = function (e) {
      onSearch(text);
    }
  }, [text])
  return (
    <div className={cn(style.container, inputState ? style.guodu : null)}>
      <div className={style.buttom} onClick={changeInput}>
        <img src="/images/search.png" />
        {inputState ? null : <div>Search</div>}
        <form target="frameFile" id="search_form">
          <input
            type="search"
            id="input"
            value={text}
            onInput={changeText}
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                onSearch(text);
              }
            }}
            className={inputState ? style.w2 : style.w1}
          />
          <iframe name='frameFile' className={style.dn}></iframe>
        </form>
        {text ? (
          <img
            src="/images/close.png"
            className={style.close}
            onClick={() => {
              setText('');
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
