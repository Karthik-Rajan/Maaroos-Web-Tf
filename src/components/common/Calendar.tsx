import React, { useEffect, useState } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import dayjs from 'dayjs';
import { CalendarInput, Types } from "../../constants/types";
import { connect } from 'react-redux';

let reload = 0;

const Calendar = (props: any) => {

    const { vendorDetail, setSection, setFromDate, setToDate, dispatch, vId = null } = props;

    const todayFrom = dayjs().startOf('month').format('YYYY-MM-DD 00:00:00');
    const todayTo = dayjs().add(1, 'month').format('YYYY-MM-DD 23:59:59');
    const minDate = dayjs().add(1, 'week').format('YYYY-MM-DD');
    const maxDate = dayjs(minDate).add(2, 'weeks').format('YYYY-MM-DD');

    const [calendarInput, setCalendarInput] = useState<CalendarInput>({ from: todayFrom, to: todayTo, types: [Types.BF, Types.DR, Types.LN] });

    const view = {
        week: {
            type: 'listWeek',
            buttonText: 'WL'
        },
        month: {
            type: 'listMonth',
            buttonText: 'ML'
        },
        monthGrid: {
            type: 'dayGridMonth',
            buttonText: 'MG'
        }
    }

    const renderEventContent = (eventContent: any) => {
        let { title } = eventContent.event;
        const { timeText } = eventContent
        const fullTitle = title === Types.BF ? 'Breakfast' : (title === Types.LN ? 'Lunch' : 'Dinner');
        let className = Types.BF === title ? `icofont-check doneDelivery ` : 'icofont-clock-time ';
        className += title + `-title`
        return (
            <>
                <i className={className}>{' ' + fullTitle}</i>
            </>
        )
    }

    useEffect(() => {
        dispatch({ type: "MY_CALENDAR", payload: { ...calendarInput, vId } });
    }, []);

    return <FullCalendar
        plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin
        ]}
        eventBackgroundColor={'white'}
        headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "week,month,monthGrid",
        }}
        validRange={(nowDate) => {
            let startDate = new Date(nowDate.valueOf());
            startDate.setDate(startDate.getDate() + 3);
            let endDate = new Date(nowDate.valueOf());
            endDate.setDate(endDate.getDate() + 30);
            return { start: startDate, end: endDate };
        }}
        visibleRange={(currentDate) => {
            let startDate = new Date(currentDate.valueOf());
            let endDate = new Date(currentDate.valueOf());
            startDate.setDate(endDate.getDate() - 15);
            endDate.setDate(endDate.getDate() + 30);
            return { start: startDate, end: endDate };
        }}
        initialView="listWeek"
        editable={true}
        lazyFetching={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        views={view}
        // themeSystem={"bootstrap"}
        dayHeaders={true}
        events={() => {
            return vendorDetail.then((data: any) => {
                if (data.type === 'MY_CALENDAR') {
                    return data.detail;
                }
                return [];
            })
        }}
        select={() => {
            console.log('working');
            setSection('addEvent');
            setFromDate(minDate);
            setToDate(minDate);
        }}
        eventContent={renderEventContent}
        eventClick={() => {
            console.log("eventClick");
        }}
        eventsSet={() => {

        }}
    />
}


export default Calendar;