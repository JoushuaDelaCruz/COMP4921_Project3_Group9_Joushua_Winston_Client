import React from 'react';
import { Calendar, Whisper, Popover, Badge } from 'rsuite';

// * Testing Purposes --> Dates show on the 10th and 15th
function getDayList(date) {
  const day = date.getDate();
  switch (day) {
    case 10:
      return [
        { time: '10:30 am', title: 'Meeting' },
        { time: '12:00 pm', title: 'Lunch' }
      ];
    case 15:
      return [
        { time: '09:30 pm', title: 'Products Introduction Meeting' },
        { time: '12:30 pm', title: 'Client entertaining' },
        { time: '02:00 pm', title: 'Product design discussion' },
        { time: '05:00 pm', title: 'Product test and acceptance' },
        { time: '06:30 pm', title: 'Reporting' },
        { time: '10:00 pm', title: 'Going home to walk the dog' }
      ];
    default:
      return [];
  }
}

export default function CalendarComponent() {
  const currentDate = new Date();
  function renderCell(date) {
    const list = getDayList(date);
    const displayList = list.filter((item, index) => index < 2);

    // * If list of 
    if (list.length) {
      const moreCount = list.length - displayList.length;
      const moreItem = (
        <li>
          <Whisper
            placement="top"
            trigger=""
            speaker={
              <Popover>
                {list.map((item, index) => (
                  <p key={index}>
                    <b>{item.time}</b> - {item.title}
                  </p>
                ))}
              </Popover>
            }
          >
            <a>{moreCount} more</a>
          </Whisper>
        </li>
      );

      return (
        <ul className="p-0 text-left list-none">
          {displayList.map((item, index) => (
            <li key={index} className=" overflow-hidden text-ellipsis whitespace-nowrap">
              <Badge className=" align-top mt-8 w-6 h-6"/> <b>{item.time}</b> - {item.title}
            </li>
          ))}
          {moreCount ? moreItem : null}
        </ul>
      );
    }

    return null;
  }

  return <Calendar
          bordered 
          renderCell={renderCell} 
          onSelect={(date) => {console.log(date)}} // * Add function to add event --> Maybe have a selected variable, and if its equal to the next click (double click) then add event
          onMonthChange={(date) => {console.log(date.getMonth())}} // * Could use this for styling individual cells
          // onChange={(date) => {console.log(date)}}
          // cellClassName={date => (date.getMonth() === currentDate.getMonth() ? 'bg-gray-700 text-white hover:bg-gray-800' : 'bg-gray-500 hover:bg-gray-800')}
          // className="bg-gray-800 text-white"
          />;
};
