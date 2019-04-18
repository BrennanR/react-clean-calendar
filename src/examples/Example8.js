// @flow

import React, { useState } from 'react';

import { Pager } from './Pager';
import { randomColor, invertColor, rgbToHex } from './colorUtils';

const pageForKey = (key: number | string) => {
  const bgColor = randomColor();
  const fgColor = invertColor(rgbToHex(bgColor), true);
  return {
    key: `pg${key}`,
    element: (
      <div
        style={{
          display: `flex`,
          height: `100%`,
          width: `100%`,
          alignItems: `center`,
          justifyContent: `center`,
        }}
      >
        <div
          style={{
            display: `flex`,
            backgroundColor: bgColor,
            height: 100,
            width: 100,
            alignItems: `center`,
            justifyContent: `center`,
          }}
        >
          <div style={{ fontSize: `1.3em`, fontWeight: `bold`, color: fgColor }}>{key}</div>
        </div>
      </div>
    ),
  };
};

export const Example8 = () => {
  const [currentPage, setCurrentPage] = useState(101);
  const [pages, setPages] = useState([pageForKey(100), pageForKey(101), pageForKey(102)]);
  const [minKey, setMinKey] = useState(100);
  const [maxKey, setMaxKey] = useState(102);

  const appendPages = () => {
    setPages(prevPages => [
      ...prevPages,
      pageForKey((maxKey + 1).toString()),
      pageForKey((maxKey + 2).toString()),
      pageForKey((maxKey + 3).toString()),
    ]);
    setMaxKey(prevMaxPage => prevMaxPage + 3);
  };

  const prependPages = () => {
    setPages(prevPages => [
      pageForKey((minKey - 3).toString()),
      pageForKey((minKey - 2).toString()),
      pageForKey((minKey - 1).toString()),
      ...prevPages,
    ]);
    setMinKey(prevMinPage => prevMinPage - 3);
  };

  return (
    <div
      style={{
        display: `flex`,
        height: `100%`,
        width: `100%`,
        alignItems: `center`,
        justifyContent: `center`,
        flexDirection: `column`,
      }}
    >
      <div>
        <button onClick={prependPages}>Prepend Pages</button>
        <button onClick={() => setCurrentPage(prevKey => (prevKey === minKey ? maxKey : prevKey - 1))}>Left</button>
        <button onClick={() => setCurrentPage(prevKey => (prevKey === maxKey ? minKey : prevKey + 1))}>Right</button>
        <button onClick={appendPages}>Append Pages</button>
      </div>
      <Pager currentPageKey={`pg${currentPage}`} pages={pages} />
    </div>
  );
};
