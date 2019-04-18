// @flow

import React, { useRef, type Element } from 'react';
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

type Props = {
  currentPageKey: string,
  pages: Array<Page>,
  numOffscreenPagesToAnimate?: number,
};

export const Pager = ({ currentPageKey, pages, numOffscreenPagesToAnimate = 2 }: Props) => {
  const ref = useRef(null);
  const { bounds: { width = null } = {} } = useMeasure(ref, 'bounds');
  const xCoordsForPages = width
    ? pages.map((page, index) => xOffsetForPage(index, pageIndex(pages, currentPageKey), width))
    : null;

  // By not animating off screen pages we run the risk of the user quickly scrolling through pages and seeing an
  // animation that is ahead or behind where it should be, because it was immediately moved previously, whereas it
  // would otherwise still be mid-animation and its new animation interpolated from there. However, by animating less
  // off-screen pages, we get faster performance, so its a trade-off.
  const requiresAnimation = xCoord => {
    if (width == null) {
      return false;
    }
    const minX = numOffscreenPagesToAnimate * -width;
    const maxX = numOffscreenPagesToAnimate * width;
    const shouldAnimate = width && (xCoord >= minX && xCoord <= maxX);
    return shouldAnimate;
  };

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
          <Spring key={pages[i].key} to={{ transform: `translate3d(${x}px,0,0)` }} immediate={!requiresAnimation(x)}>
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
