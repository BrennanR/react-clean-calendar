// @flow

import React, { useEffect, useRef, useState } from 'react';
import { animated, useSprings } from 'react-spring';
import { useMeasure } from '@softbind/react-hooks';

const Pager = ({ currentPageIndex, pages }: { currentPageIndex: number, pages: Array<any> }) => {
  const ref = useRef(null);
  const { bounds: { width = -1 } = {} } = useMeasure(ref, 'bounds');
  const [internalPageIndex, setInternalPageIndex] = useState(currentPageIndex);

  const xOffset = pageIndex => {
    const pageOffset = (pageIndex - currentPageIndex) * width;
    return pageOffset;
  };

  // Initialize the springSet x-positions to 0. Since we need to wait for a measurement, we don't know the correct
  // values at initialization time.
  const [springs, springsSet] = useSprings(pages.length, () => ({ x: 0 }));

  // This effect handles animating the page x positions when the currentPageIndex changes.
  useEffect(() => {
    console.log({ currentPageIndex, internalPageIndex });
    if (currentPageIndex !== internalPageIndex) {
      const diff = currentPageIndex === 0 ? 0 : internalPageIndex - currentPageIndex + 1;

      springsSet(index => {
        const newXOffset = xOffset(index + diff);
        // console.log({ index, newXOffset });
        return { x: newXOffset, immediate: false };
      });
      setInternalPageIndex(currentPageIndex);
    }
  }, [currentPageIndex, internalPageIndex]);

  // This effect handles initially placing the pages. If the width changes, that placement changs.
  useEffect(() => {
    springsSet(index => {
      const initialXOffset = xOffset(index);
      // console.log({ index, initialXOffset });
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
          key={i}
          style={{ position: `absolute`, transform: x.interpolate(x => `translate3d(${x}px,0,0)`) }}
        >
          {pages[i]}
        </animated.div>
      ))}
    </div>
  );
};

export const Example8 = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  console.log({ currentPageIndex });

  const pages = [
    <div key="pg1" style={{ height: 100, width: 100, backgroundColor: `red` }} />,
    <div key="pg2" style={{ height: 100, width: 100, backgroundColor: `green` }} />,
    <div key="pg3" style={{ height: 100, width: 100, backgroundColor: `blue` }} />,
  ];

  return (
    <div style={{ flex: 1, width: `100%`, alignItems: `center`, justifyContent: `center` }}>
      <button onClick={() => setCurrentPageIndex(prevIndex => (prevIndex === 0 ? pages.length - 1 : prevIndex - 1))}>
        Left
      </button>
      <button onClick={() => setCurrentPageIndex(prevIndex => (prevIndex === pages.length - 1 ? 0 : prevIndex + 1))}>
        Right
      </button>
      <Pager currentPageIndex={currentPageIndex} pages={pages} />
    </div>
  );
};
