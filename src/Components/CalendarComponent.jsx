import React, { useRef, useState, useEffect } from 'react';
import {
  ScheduleComponent, Day, Week, WorkWeek, Agenda, Month, Inject,
  ViewsDirective, ViewDirective
} from '@syncfusion/ej2-react-schedule';
import { registerLicense } from '@syncfusion/ej2-base';
import useRequest from "../pages/customs/useRequest";
import { createElement } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { v4 as uuidv4 } from 'uuid';

export default function Calendar() {
  registerLicense('Ngo9BigBOggjHTQxAR8/V1NHaF1cWWhIfEx0Q3xbf1xzZFRHallSTnJfUiweQnxTdEZiWH1YcXVQRWRdVEB0XA==')
  const { getRequest, postRequest } = useRequest();

  const [events, setEvents] = useState([]);
  let openedEvent = null;
  const scheduleObj = useRef(null);
  
  useEffect(() => {
    const getEvents = async () => {
      const resEvents = await getRequest("calendar/userEvents");
      const eventsLength = resEvents.events.length;
      const responseFormatted = []
      for (let i = 0; i < eventsLength; i++) {
        responseFormatted.push(
          {
            Id: i,
            Subject: resEvents.events[i].title,
            StartTime: new Date(resEvents.events[i].start_datetime),
            EndTime: new Date(resEvents.events[i].end_datetime),
            IsAllDay: resEvents.events[i].is_all_day,
            Location: resEvents.events[i].location,
            Description: resEvents.events[i].description,
            StartTimezone: resEvents.events[i].start_timezone,
            EndTimezone: resEvents.events[i].end_timezone,
            RecurrenceRule: resEvents.events[i].recurrence_rule,
            Uuid: resEvents.events[i].uuid
          }
        )
      }
      setEvents(responseFormatted);
    }

    getEvents();

  }, [])

  const actionHandler = (args) => {
    if(args.requestType == "eventCreated") {
      addEvent(args.data[0]);
    } else if(args.requestType == "eventChanged") {
      updateEvent(args.data[0]);
    } else if(args.requestType == "eventRemoved") {
      deleteEvent(args.data[0]);
    }
  } 

  const addEvent = async (data) => {
    data.Uuid = uuidv4();

    let startTime = structuredClone(data.StartTime);
    startTime.setMinutes(startTime.getMinutes() - startTime.getTimezoneOffset())

    let endTime = structuredClone(data.EndTime);
    endTime.setMinutes(endTime.getMinutes() - endTime.getTimezoneOffset())
    const body = {
      title: data.Subject,
      description: data.Description,
      location: data.Location,
      start_datetime: startTime,
      end_datetime: endTime,
      is_all_day: data.IsAllDay,
      start_timezone: data.StartTimezone,
      end_timezone: data.EndTimezone,
      recurrence_rule: data.RecurrenceRule,
      uuid: data.Uuid
    }
    
    const response = await postRequest("calendar/createEvent", body);
    if (!response) {
      alert("ERROR ADDING EVENT");
    }

    
  }

  const updateEvent = async (data) => {
    let startTime = structuredClone(data.StartTime);
    startTime.setMinutes(startTime.getMinutes() - startTime.getTimezoneOffset())

    let endTime = structuredClone(data.EndTime);
    endTime.setMinutes(endTime.getMinutes() - endTime.getTimezoneOffset())
    
    const body = {
      title: data.Subject,
      description: data.Description,
      location: data.Location,
      start_datetime: startTime,
      end_datetime: endTime,
      is_all_day: data.IsAllDay,
      start_timezone: data.StartTimezone,
      end_timezone: data.EndTimezone,
      recurrence_rule: data.RecurrenceRule,
      uuid: openedEvent.Uuid
    }
    const response = await postRequest("calendar/updateEvent", body);
    if (!response) {
      alert("ERROR UPDATING EVENT");
    }
  }

  const deleteEvent = async (data) => {
    const body = {
      uuid: data.Uuid
    }
    const response = await postRequest("calendar/deleteEvent", body);
    if (!response) {
      alert("ERROR DELETING EVENT");
    }
  }

  const onPopupOpen = (args) => {
    if (args.type === 'Editor') {
        if (!args.element.querySelector('.custom-field-row')) {
          // Add Friends Row
            let row = createElement('div', { className: 'custom-field-row' });
            let formElement = args.element.querySelector('.e-schedule-form');
            formElement.firstChild.insertBefore(row, formElement.firstChild.lastChild);
            let container = createElement('div', { className: 'custom-field-container' });
            let inputEle = createElement('input', {
                className: 'e-field', attrs: { name: 'AddFriend' }
            });
            container.appendChild(inputEle);
            row.appendChild(container);
            let drowDownList = new DropDownList({
                dataSource: [
                    { text: 'Public Event', value: 'public-event' },
                    { text: 'Maintenance', value: 'maintenance' },
                    { text: 'Commercial Event', value: 'commercial-event' },
                    { text: 'Family Event', value: 'family-event' }
                ],
                fields: { text: 'text', value: 'value' },
                value: args.data.AddFriend,
                floatLabelType: 'Always', placeholder: 'Add Friends'
            });
            drowDownList.appendTo(inputEle);
            inputEle.setAttribute('name', 'AddFriend');
        }
        openedEvent = args.data;
    }
}

  const eventSettings = {dataSource: events};
  return (
    <ScheduleComponent ref={scheduleObj} width='100%' height='100%' currentView='Month'
    selectedDate={new Date()}
    eventSettings={eventSettings}
    actionComplete={actionHandler}
    popupOpen={onPopupOpen}
    >
        <ViewsDirective>
          <ViewDirective option='Day' />
          <ViewDirective option='Week' />
          <ViewDirective option='WorkWeek' />
          <ViewDirective option='Month' />
          <ViewDirective option='Agenda' />
        </ViewsDirective>
      <Inject services={[Day, Week, WorkWeek, Agenda, Month]} />
    </ScheduleComponent>
  )
}