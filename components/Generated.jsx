'use client'
import React, { useState } from 'react';
import HeatMap from '@uiw/react-heat-map';

const generateDays = (year, contributions) => {
  const daysInMonth = [
    31,
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const days = months.flatMap((month, monthIndex) =>
    Array.from({ length: daysInMonth[monthIndex] }, (_, dayIndex) => {
      const date = `${year}/${String(month).padStart(2, '0')}/${String(dayIndex + 1).padStart(2, '0')}`;
      return {
        date,
        count: contributions[date] || 0, 
      };
    })
  );

  return days;
};

const currentYear = new Date().getFullYear();

const Generated = ({contributions}) => {
  const value = generateDays(currentYear, contributions);

  const [selected, setSelected] = useState('');

  return (
    <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }} className='bg-neutral-50 rounded-lg'>
      <div className='' style={{ display: 'inline-block' }}>
        <HeatMap
          width={720}
          value={value}
          panelColors={{
            0: '#EDF1FE',
            1: '#DFE6FF',
            2: '#C7D2FE',
            3: '#A5B4FC',
            4: '#818CF8',
            5: '#6366F1',
            6: '#4F46E5',
            7: '#4338CA',
            9: '#3730A3',
            10: '#312E81',
            15: '#1E1B4B',
          }}
          style={{ '--rhm-rect-active': '#4F46E5' }}
          startDate={new Date(`${currentYear}/01/01`)}
          endDate={new Date(`${currentYear}/12/31`)}
          rectRender={(props, data) => {
            if (selected !== '') {
              props.opacity = data.date === selected ? 1 : 0.2;
            }
            return (
              <rect
                {...props}
                key={data.date} 
                onClick={() => {
                  setSelected(data.date === selected ? '' : data.date);
                }}
              />
            );
          }}
        />
      </div>
    </div>
  );
};

export default Generated;
