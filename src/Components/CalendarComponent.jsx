import React, { useEffect, useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

export default function Calendar() {
    const [events, setEvents] = useState([
      // { // this object will be "parsed" into an Event Object
      //   title: 'The Title', // a property!
      //   start: '2023-11-22', // a property!
      //   end: '2023-11-23', // a property! ** see important note below about 'end' **
      //   allDay: false
      // }
    ]);

    const [modalHidden, setModalHidden] = useState("hidden");
    const [modalTitle, setModalTitle] = useState("");
    const [modalStartDate, setModalStartDate] = useState(new Date().toISOString());
    const [modalEndDate, setModalEndDate] = useState(new Date().toISOString());
    const [allDay, setAllDay] = useState(false);
    const [calendarApi, setCalendarApi] = useState(null);
    useEffect(() => {
    }, [events])
    

    const HandleEvents = (events) => {
      setEvents(events);
    }

    const handleSubmitAddEvent = (e) => {
      e.preventDefault();
      let calendar = calendarApi;

      calendar.addEvent({
        title: modalTitle,
        end: modalEndDate,
        start: modalStartDate,
        allDay: allDay
      })
      resetModal();
    }

    const handleAllDayCheck = () => {
      setAllDay(!allDay);
    }

    const toggleModal = (selectInfo) => {
      if(modalHidden) {
        setCalendarApi(selectInfo.view.calendar);
        setModalHidden("");

        // Start modal with clicked date 
        let startString = new Date(selectInfo.startStr).toISOString();
        startString = startString.substring(0, startString.length - 1);
        setModalStartDate(startString);
        setModalEndDate(startString);

      } else {
        setModalHidden("hidden");
      }
    }

    const resetModal = () => {
      setModalTitle("");
      setModalStartDate();
      setModalEndDate();
      toggleModal();
    }

    const AddEventModal = () => {
        return (
          <div className={` shadow-lg shadow-black max-w-lg border border-black rounded-lg bg-white px-10 py-4 absolute top-[40%] left-[50%] translate-x-[-50%] transalte-y-[-50%] z-10 ${modalHidden}`}>
            <form onSubmit={handleSubmitAddEvent}>
              <div>
                Add Event
              </div>
              <div>
                <label>Title</label>
                <input type="text" name="title" className="border border-black rounded-lg m-2" value={modalTitle} onChange={(e) => {setModalTitle(e.target.value)}} required/>
              </div>

              <div>
                <label>Start Date</label>
                <input type="datetime-local" name="title" className="border border-black rounded-lg m-2" value={modalStartDate} onChange={(e) =>setModalStartDate(e.target.value)}/>
              </div>

              <div>
                <label>End Date</label>
                <input type="datetime-local" name="title" className="border border-black rounded-lg m-2" value={modalEndDate} onChange={(e) =>setModalEndDate(e.target.value)}/>
              </div>
              <div>
                <label>All Day</label>
                <input type="checkbox" checked={allDay} onChange={handleAllDayCheck}/>
              </div>
              <div>
                <button type="submit" className="border border-black rounded-md px-2">Add</button>
                <button type="button" onClick={resetModal} className="border border-black rounded-md px-2">Cancel</button>
              </div>
            </form>
          </div>
        )
    }

    const renderEventContent = (eventInfo)  => {
      console.log(eventInfo);
      const startHour = (eventInfo.event.start.getHours() % 12 || 12).toString();
      const startPrefix = eventInfo.event.start.getHours() < 12 ? "am" : "pm";
      const startMinute = eventInfo.event.start.getMinutes() > 0 ? `:${(eventInfo.event.start.getMinutes()).toString().padStart(2, 0) + startPrefix}`  : startPrefix;
      return (
        <div>
          <b>{startHour + startMinute}</b>
          <i> - {eventInfo.event.title}</i>
        </div>
      )
    }

    const handleDeleteEvent = (eventInfo) => {
      console.log(eventInfo);
      const deleteConfirm = confirm("Are you sure you want to delete this event?");
      if(deleteConfirm) {
        eventInfo.event.remove();
      }
    }


    return(
      <>
        <div className={`fixed w-full h-full${modalHidden}`} onClick={toggleModal}></div>
        <Fullcalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          height={'90vh'}
          initialView={"dayGridMonth"} // [dayGridXXX, timeGridXXX, listXXX]
          headerToolbar={{
              start:"today prev,next",
              center: "title",
              end: "dayGridMonth,timeGridWeek,timeGridDay,listDay",
          }}
          editable={true}
          selectable={true}
          select={toggleModal}
          eventClick={handleDeleteEvent}
          dayMaxEvents={true}
          viewClassNames={""}
          dayCellClassNames={date => ("")}
          nowIndicatorClassNames={"bg-red-600"}
          eventDrop={event => (console.log(event.event))}
          initialEvents={events}
          eventsSet={HandleEvents}
          eventContent={renderEventContent}
          displayEventEnd={true}
          forceEventDuration={true}
        />
        <AddEventModal/>

      </>
    )

}