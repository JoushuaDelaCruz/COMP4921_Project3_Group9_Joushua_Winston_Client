import React, { useRef, useState, useEffect } from "react";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Agenda,
  Month,
  Inject,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";
import {
  registerLicense,
  createElement,
  enableRipple,
  classList
} from "@syncfusion/ej2-base";
import useRequest from "../customs/useRequest";
import { MultiSelect, DropDownList } from "@syncfusion/ej2-dropdowns";
import { v4 as uuidv4 } from "uuid";

export default function Calendar() {
  enableRipple(true);
  registerLicense(import.meta.env.VITE_EJ2_SYNCFUSION_LICENSE_KEY);
  const [friends, setFriends] = useState([]);
  const [groups, setGroups] = useState([]);
  const { getRequest, postRequest } = useRequest();

  const [events, setEvents] = useState([]);
  let openedEvent = null;
  const scheduleObj = useRef(null);

  useEffect(() => {
    const getEvents = async () => {
      const resEvents = await getRequest("calendar/userEvents");
      const eventsLength = resEvents.events.length;
      const responseFormatted = [];
      for (let i = 0; i < eventsLength; i++) {
        let friendsArr;
        if (resEvents.events[i].friends) {
          const friends = resEvents.events[i].friends;
          friendsArr = friends.split(",");
        }
        const eventObj = {
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
          Uuid: resEvents.events[i].uuid,
          AddedFriends: friendsArr,
          AddedGroups: resEvents.events[i].group_id,
          Username: resEvents.events[i].username,
          IsOriginal: resEvents.events[i].is_original,
          OriginalStartTime: new Date(resEvents.events[i].start_datetime)
        }
        responseFormatted.push(eventObj);
      }
      setEvents(responseFormatted);
    };

    const getFriends = async () => {
      const response = await getRequest(`profile/friends`);
      setFriends(response);
    };

    const getGroups = async () => {
      const response = await getRequest(`calendar/getGroups`);
      setGroups(response);
    };

    getEvents();
    getFriends();
    getGroups();
  }, []);

  const actionHandler = (args) => {
    if (args.requestType == "eventCreated") {
      addEvent(args.data[0]);
    } else if (args.requestType == "eventChanged") {
      if(openedEvent.IsOriginal) {
        updateEvent(args.data[0]);
      } else {
        alert(`This event was created by user ${openedEvent.Username}, please ask them to update this event`);
      }
    } else if (args.requestType == "eventRemoved") {
      deleteEvent(openedEvent);
    }
  };

  const addEvent = async (data) => {
    data.Uuid = uuidv4();
    const body = {
      title: data.Subject,
      description: data.Description,
      location: data.Location,
      start_datetime: data.StartTime,
      end_datetime: data.EndTime,
      is_all_day: data.IsAllDay,
      start_timezone: data.StartTimezone,
      end_timezone: data.EndTimezone,
      recurrence_rule: data.RecurrenceRule,
      uuid: data.Uuid,
      added_friends: data.AddedFriends,
      added_groups: data.AddedGroups
    };

    const response = await postRequest("calendar/createEvent", body);
    if (!response) {
      alert("ERROR ADDING EVENT");
    }

    scheduleObj.current.addEvent([body]);
    buttonObj.current.element.setAttribute('disabled', 'true');
  };

  const updateEvent = async (data) => {
    let startTime = structuredClone(data.StartTime);
    startTime.setMinutes(
      startTime.getMinutes() - startTime.getTimezoneOffset()
    );

    let endTime = structuredClone(data.EndTime);
    endTime.setMinutes(endTime.getMinutes() - endTime.getTimezoneOffset());
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
      uuid: openedEvent.Uuid,
      original_friends: openedEvent.AddedFriends || [],
      new_friends: data.AddedFriends || [],
    };
    const response = await postRequest("calendar/updateEvent", body);
    if (!response) {
      alert("ERROR UPDATING EVENT");
    }
  };

  const deleteEvent = async (data) => {
    const body = {
      uuid: data.Uuid,
    };
    const response = await postRequest("calendar/deleteEvent", body);
    if (!response) {
      alert("ERROR DELETING EVENT");
    }
  };

  const onPopupOpen = (args) => {
    openedEvent = args.data;
    if (args.type === "Editor") {
      if (!args.element.querySelector(".custom-field-row")) {
        let row = createElement("div", { className: "custom-field-row" });
        let formElement = args.element.querySelector(".e-schedule-form");
        formElement.firstChild.insertBefore(
          row,
          formElement.firstChild.lastChild
        );
        let container = createElement("div", {
          className: "custom-field-container",
        });

        // Add Friends Row
        let inputEle = createElement("input", {
          className: "e-field",
          attrs: { name: "AddedFriends" },
        });
        container.appendChild(inputEle);
        row.appendChild(container);
        let friendDropDown = new MultiSelect({
          dataSource: DropDownFriends(),
          fields: { text: "text", value: "value" },
          value: args.data.AddedFriends,
          floatLabelType: "Always",
          placeholder: "Add Friends",
        });
        friendDropDown.appendTo(inputEle);
        inputEle.setAttribute("name", "AddedFriends");
        row.append(container);

        let inputGroupEle = createElement("input", {
          className: "e-field",
          attrs: { name: "AddedGroups" },
        });

        // Group Row
        let groupContainer = createElement("div", {
          className: "custom-field-container",
        });

        groupContainer.appendChild(inputGroupEle);
        row.appendChild(groupContainer);

        let groupDropDown = new DropDownList({
          dataSource: groups,
          fields: { text: "group_name", value: "group_id" },
          value: args.data.AddedGroups,
          floatLabelType: "Always",
          placeholder: "Group",
        });
        groupDropDown.appendTo(inputGroupEle);
        inputGroupEle.setAttribute("name", "AddedGroups");
        row.append(groupContainer);
      }

      if (!args.element.querySelector(".create-row") && openedEvent.Uuid) {
        let formElement = args.element.querySelector(".e-schedule-form");
        let createRow = createElement("div", { className: "py-2 create-row" });
        formElement.firstChild.insertBefore(
          createRow,
          formElement.firstChild.lastChild
        );
        createRow.appendChild(
          document.createTextNode(`Event created by: ${openedEvent.Username}`)
        );
      }
    } else if (args.type === "RecurrenceAlert") {
      if(args.element.querySelector(".e-dlg-content") && args.element.querySelector(".e-quick-dialog-occurrence-event")) {
        const messageDiv = args.element.querySelector(".e-dlg-content");
        messageDiv.innerHTML = "Would you like to edit the entire series?";
        const eventButton = args.element.querySelector(".e-quick-dialog-occurrence-event");
        classList(eventButton, ["hidden"], []);
        
        const editButton = args.element.querySelector(".e-quick-dialog-series-event");
        editButton.innerHTML = "Confirm";
      }
    } else if (args.type === "DeleteAlert") {
      const eventButton = args.element.querySelector(".e-quick-dialog-delete");
      classList(eventButton, [], ["hidden"]);
    }
  };

  const onPopupClose = (args) => {
    if (args.type === "Editor") {
      if (openedEvent && openedEvent.Uuid){
        let createRow = args.element.querySelector(".create-row");
        createRow.remove();
      }
    }
  }

  const DropDownFriends = () => {
    const friendList = [];
    friends.forEach((friend) => {
      friendList.push(friend.username);
    });
    return friendList;
  };

  const DropDownGroups = () => {
    const groupList = [];
    groups.forEach((group) => {
      groupList.push(group.group_name);
    });
    return groupList;
  };

  const eventSettings = { dataSource: events };
  return (
    <ScheduleComponent
      ref={scheduleObj}
      width="100%"
      height="100%"
      currentView="Month"
      selectedDate={new Date()}
      eventSettings={eventSettings}
      actionComplete={actionHandler}
      popupOpen={onPopupOpen}
      popupClose={onPopupClose}
      className="bg-mint-cream"
    >
      <ViewsDirective>
        <ViewDirective option="Day" />
        <ViewDirective option="Week" />
        <ViewDirective option="WorkWeek" />
        <ViewDirective option="Month" />
        <ViewDirective option="Agenda" />
      </ViewsDirective>
      <Inject services={[Day, Week, WorkWeek, Agenda, Month]} />
    </ScheduleComponent>
  );
}
