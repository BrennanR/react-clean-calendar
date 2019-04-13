// @flow

import React, { useRef } from 'react';
import Slider from 'react-slick';
import type { Node } from 'react';
import { useMeasure } from '@softbind/react-hooks';

import { Calendar } from '../lib/Calendar';
import { localizedWeekdayNames } from '../lib/util/localizeDate';

// import '~slick-carousel/slick/slick.css';
// import '~slick-carousel/slick/slick-theme.css';

export const Example7 = () => {
  const ref = useRef(null);
  const { bounds } = useMeasure(ref, 'bounds');

  const locale = 'en-us';
  const weekdayNames = localizedWeekdayNames(locale, 'long');
  const renderDay = (date: Date): Node => {
    return (
      <div style={{ display: 'flex', flex: 1, justifyContent: `flexStart` }} className="calendar-day">
        <div style={{ display: 'flex', flex: 1, margin: 5 }}>{date.getDate()}</div>
      </div>
    );
  };

  const renderDayHeading = (dayIndex: number): Node => <div>{weekdayNames[dayIndex]}</div>;

  const { width, height } = bounds || {};
  console.log(width, height);

  const settings = {
    adaptiveHeight: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div style={{ height: `100%`, width: `100%` }} ref={ref}>
      <div style={{ width, height }}>
        {bounds && (
          <Slider {...settings}>
            {/* The slider library overwrites the outer-div for each slide, so style the inner one. */}
            <div>
              <div style={{ display: `flex`, flexDirection: `row`, height, width }}>
                <Calendar
                  locale={locale}
                  year={2019}
                  month={5}
                  renderDay={renderDay}
                  renderDayHeading={renderDayHeading}
                />
              </div>
            </div>
            <div>
              <div style={{ display: `flex`, flexDirection: `row`, height, width }}>
                <Calendar
                  locale={locale}
                  year={2019}
                  month={6}
                  renderDay={renderDay}
                  renderDayHeading={renderDayHeading}
                />
              </div>
            </div>
            <div>
              <div style={{ display: `flex`, flexDirection: `row`, height, width }}>
                <Calendar
                  locale={locale}
                  year={2019}
                  month={7}
                  renderDay={renderDay}
                  renderDayHeading={renderDayHeading}
                />
              </div>
            </div>
          </Slider>
        )}
      </div>
    </div>
  );
};
