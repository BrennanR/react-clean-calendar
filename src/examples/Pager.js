// @flow

import React, { useEffect, useLayoutEffect, useRef, type Element } from 'react';
import { animated, useSprings } from 'react-spring';
import { useMeasure } from '@softbind/react-hooks';

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

export const Pager = ({ currentPageKey, pages }: { currentPageKey: string, pages: Array<Page> }) => {
  const ref = useRef(null);
  const { bounds: { width = -1 } = {} } = useMeasure(ref, 'bounds');
  // Set the spring x-positions to 0. We need to wait for useMeasure, we don't know the correct values initially.
  const [springs, springsSet] = useSprings(pages.length, () => ({ x: 0 }));

  useLayoutEffect(() => {
    springsSet(index => ({ x: xOffsetForPage(index, pageIndex(pages, currentPageKey), width), immediate: true }));
  }, [pages]);

  // This effect handles animating the page x-positions when the currentPageIndex changes.
  useEffect(() => {
    springsSet(index => ({ x: xOffsetForPage(index, pageIndex(pages, currentPageKey), width), immediate: false }));
  }, [currentPageKey]);

  // This effect handles initially placing the pages. If the width changes, that placement changes.
  useEffect(() => {
    // As the window resizes immediately update the x-coord, don't animate it.
    springsSet(index => ({ x: xOffsetForPage(index, pageIndex(pages, currentPageKey), width), immediate: true }));
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
