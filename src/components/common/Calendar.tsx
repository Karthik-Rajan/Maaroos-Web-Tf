import React, { useEffect, useState } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import dayjs from 'dayjs';
import { CalendarInput, Types, TypesName } from '../../constants/types';
import { connect } from 'react-redux';

let reload = 0;

const Calendar = (props: any) => {

    const { vendorDetail, setShowAddCalendar, setFromDate, setToDate, dispatch, vId = null,possibleMinDate, possibleMaxDate } = props;

    const todayFrom = dayjs().startOf('month').format('YYYY-MM-DD 00:00:00');
    const todayTo = dayjs().add(1, 'month').format('YYYY-MM-DD 23:59:59');

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
        const fullTitle = title === Types.BF ? TypesName.BF : (title === Types.LN ? TypesName.LN : TypesName.DR);
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
        events={() => {
            return vendorDetail.then((data: any) => {
                if (data.type === 'MY_CALENDAR') {
                    return data.detail;
                }
                return [];
            })
        }}
        select={(date) => {
            setShowAddCalendar(true);            
            setFromDate(date.startStr);
            setToDate(date.endStr);
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