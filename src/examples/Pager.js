// @flow

import React, { useRef, useState, type Element } from 'react';
import { animated } from 'react-spring';
import { Spring } from 'react-spring/renderprops';
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
  const [isSetup, setIsSetup] = useState(false);
  const ref = useRef(null);
  const { bounds: { width = null } = {} } = useMeasure(ref, 'bounds');
  const xCoordsForPages = width
    ? pages.map((page, index) => xOffsetForPage(index, pageIndex(pages, currentPageKey), width))
    : null;

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
      {xCoordsForPages &&
        xCoordsForPages.map((x, i) => (
          <Spring
            key={pages[i].key}
            to={{ transform: `translate3d(${x}px,0,0)` }}
            immediate={!isSetup}
            onStart={() => setIsSetup(true)}
          >
            {props => (
              <animated.div
                style={{
                  position: `absolute`,
                  height: `100%`,
                  width: `100%`,
                  ...props,
                }}
              >
                {pages[i].element}
              </animated.div>
            )}
          </Spring>
        ))}
    </div>
  );
};
