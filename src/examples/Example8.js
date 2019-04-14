// @flow

import React, { useEffect, useLayoutEffect, useRef, useState, type Element } from 'react';
import { animated, useSprings } from 'react-spring';
import { useMeasure } from '@softbind/react-hooks';

import { randomColor, invertColor, rgbToHex } from './colorUtils';

type Page = {
  key: string,
  element: Element<*>,
};

const xOffsetForPage = (pageIndex, currentPageIndex, width) => {
  const offsetDelta = pageIndex - currentPageIndex;
  const pageOffset = offsetDelta * width;
  return pageOffset;
};

const pageIndex = (pages, currentPageKey) => pages.findIndex(page => page.key === currentPageKey);

const Pager = ({ currentPageKey, pages }: { currentPageKey: string, pages: Array<Page> }) => {
  const ref = useRef(null);
  const { bounds: { width = -1 } = {} } = useMeasure(ref, 'bounds');
  // Set the spring x-positions to 0. We need to wait for useMeasure, we don't know the correct values initially.
  const [springs, springsSet] = useSprings(pages.length, () => ({ x: 0 }));

  useLayoutEffect(() => {
    springsSet(index => {
      return { x: xOffsetForPage(index, pageIndex(pages, currentPageKey), width), immediate: true };
    });
  }, [pages]);

  // This effect handles animating the page x-positions when the currentPageIndex changes.
  useEffect(() => {
    springsSet(index => {
      return { x: xOffsetForPage(index, pageIndex(pages, currentPageKey), width), immediate: false };
    });
  }, [currentPageKey]);

  // This effect handles initially placing the pages. If the width changes, that placement changes.
  useEffect(() => {
    springsSet(index => {
      const initialXOffset = xOffsetForPage(index, pageIndex(pages, currentPageKey), width);
      // console.log({ index, initialXOffset, pageIndex: pageIndex() });
      // As the window resizes immediately update the x-coord, don't animate it.
      return { x: initialXOffset, immediate: true };
    });
  }, [width]);

  return (
    <div
      ref={ref}
      style={{
        position: `relative`,
        overflow: `hidden`,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
        height: `100%`,
        width: `100%`,
      }}
    >
      {springs.map(({ x }, i) => (
        <animated.div
          key={pages[i].key}
          style={{ position: `absolute`, transform: x.interpolate(x => `translate3d(${x}px,0,0)`) }}
        >
          {pages[i].element}
        </animated.div>
      ))}
    </div>
  );
};

const pageForKey = (key: string) => {
  const bgColor = randomColor();
  const fgColor = invertColor(rgbToHex(bgColor), true);
  return {
    key: `pg${key}`,
    element: (
      <div
        style={{
          display: `flex`,
          height: 100,
          width: 100,
          backgroundColor: bgColor,
          alignItems: `center`,
          justifyContent: `center`,
        }}
      >
        <p style={{ fontSize: `1.3em`, fontWeight: `bold`, color: fgColor }}>{key}</p>
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
    <div style={{ flex: 1, width: `100%`, alignItems: `center`, justifyContent: `center` }}>
      <button onClick={prependPages}>Prepend Pages</button>
      <button onClick={() => setCurrentPage(prevKey => (prevKey === minKey ? maxKey : prevKey - 1))}>Left</button>
      <button onClick={() => setCurrentPage(prevKey => (prevKey === maxKey ? minKey : prevKey + 1))}>Right</button>
      <button onClick={appendPages}>Append Pages</button>
      <Pager currentPageKey={`pg${currentPage}`} pages={pages} />
    </div>
  );
};
