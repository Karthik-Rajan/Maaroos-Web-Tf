import React from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import { Types, TypesName } from '../../constants/types';
import { useSelector } from 'react-redux';
import { setColor, stringToColor } from '../../helpers/utils';

const Calendar = (props: any) => {
    const { myCalendar } = useSelector((state: any) => state.vendor)
    const { setShowAddCalendar, setFromDate, setToDate, vId = null, possibleMinDate, possibleMaxDate } = props;
    const view = {
        month: {
            type: 'listMonth',
            buttonText: 'List'
        },
        // week: {
        //     type: 'listList',
        //     buttonText: 'Week List'
        // },
        monthGrid: {
            type: 'dayGridMonth',
            buttonText: 'Grid'
        }
    }

    const getCalendarEvents = async () => {
        let calEvents: any = [];
        let inc = 0;
        if (myCalendar) {
            await Object.entries(myCalendar)
                .map(([key, value]: any) => {
                    const subColor = stringToColor(key);
                    inc++
                    const [textColor, backColor] = setColor(subColor);
                    value.forEach((event: any, index: string) => {
                        calEvents.push({
                            ...event,
                            groupId: inc,
                            color: backColor, //subscription based
                            textColor, //Type based getColor(event.title)
                        });
                    });
                });
        }
        return await calEvents;
    }

    const renderEventContent = (eventContent: any) => {
        // console.log('eventContent', eventContent);
        let { title, groupId } = eventContent.event;
        const { timeText } = eventContent
        const fullTitle = title === Types.BF ? TypesName.BF : (title === Types.LN ? TypesName.LN : TypesName.DR);
        let className = Types.BF === title ? `icofont-check ` : 'icofont-clock-time ';
        return (
            <>
                <i className={className + ` foodType`}>{' ' + fullTitle}</i>
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
        aspectRatio={1.2}
        eventBackgroundColor={'white'}
        showNonCurrentDates={true}
        expandRows={true}
        headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "month,monthGrid", //week,month,monthGrid
        }}
        validRange={() => {
            return { start: possibleMinDate, end: possibleMaxDate };
        }}
        visibleRange={() => {
            return { start: possibleMinDate, end: possibleMaxDate };
        }}
        initialView="listMonth"
        editable={false}
        lazyFetching={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={5}
        weekends={true}
        views={view}
        // themeSystem={"bootstrap"}
        loading={() => { return true }}
        dayHeaders={true}
        events={getCalendarEvents}
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
    // eventSources={getCalendarEvents()}
    />
}


export default Calendar;