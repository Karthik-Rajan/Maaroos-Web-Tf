import React, { useEffect, useState } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import dayjs from 'dayjs';
import { CalendarInput, Types, TypesName } from '../../constants/types';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_MY_CALENDAR_RESPONSE } from '../../constants/vendor';
import { fetchMySchedule } from '../../actions/api';

const Calendar = (props: any) => {
    const { myCalendar } = useSelector((state: any) => state.vendor)
    const { setShowAddCalendar, setFromDate, setToDate, vId = null, possibleMinDate, possibleMaxDate } = props;
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
        const fullTitle = title === Types.BF ? TypesName.BF : (title === Types.LN ? TypesName.LN : TypesName.DR);
        let className = Types.BF === title ? `icofont-check doneDelivery ` : 'icofont-clock-time ';
        className += title + `-title`
        return (
            <>
                <i className={className}>{' ' + fullTitle}</i>
            </>
        )
    }

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
        validRange={() => {
            return { start: possibleMinDate, end: possibleMaxDate };
        }}
        visibleRange={() => {
            return { start: possibleMinDate, end: possibleMaxDate };
        }}
        initialView="listWeek"
        editable={false}
        lazyFetching={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        views={view}
        // themeSystem={"bootstrap"}
        dayHeaders={true}
        events={myCalendar}
        select={(date) => {
            setShowAddCalendar(true);
            setFromDate(date.startStr);
            setToDate(date.endStr);
        }}
        eventContent={renderEventContent}
        eventClick={() => {
        }}
        eventsSet={() => {

        }}
    />
}


export default Calendar;