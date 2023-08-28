export const getDaysInMonth = monthMoment => {
    // moramo klonirati zbog mutiranja, kasnije uporijebiti za
    // todays day
    const monthCopy = monthMoment.clone()
    monthCopy.startOf('month')

    let days = []
    while (monthCopy.month() === monthMoment.month()) {
        days.push(monthCopy.clone())
        monthCopy.add(1, 'days')
    }

    return days
}

/* Za dane iz proslog/sljedeceg mjeseca */
export const getDaysForWeeksInMonth = monthMoment => {
    const firstDayInMonth = monthMoment.clone().startOf('month')
    const mondayBeforeMonth = firstDayInMonth.clone().startOf('isoWeek')

    const lastDayInMonth = monthMoment.clone().endOf('month')
    const mondayAfterMonth = lastDayInMonth.clone()
        .endOf('isoWeek')
        .add(1, 'days')
        .startOf('day')

    const currentDay = mondayBeforeMonth.clone()
    let days = []

    while (!currentDay.isSame(mondayAfterMonth, 'date')) {
        days.push(currentDay.clone())
        currentDay.add(1, 'days')
    }

    return days;
}

export const segmentIntoWeeks = dayMoments => {
    let weeks = []
    let currentWeek = []

    for (let day of dayMoments) {
        currentWeek.push(day.clone())

        if (day.format('dddd') === 'Sunday') {
            weeks.push(currentWeek)
            currentWeek = []
        }
    }

    if (currentWeek.length > 0) {
        weeks.push(currentWeek)
    }

    return weeks
}

//fcje koje pomicu dane na kraj/pocetak u tablici
export const padWeekFront = (week, padWith = null) => {
    return [...Array(7 - week.length).fill(padWith), ...week]
}

export const padWeekBack = (week, padWith = null) => {
    return [...week, ...Array(7 - week.length).fill(padWith)]
}

const isMobile = window.matchMedia('(max-width: 767px)').matches;

export const daysOfTheWeek = [
    isMobile ? 'Mon' : 'Monday',
    isMobile ? 'Tue' : 'Tuesday',
    isMobile ? 'Wed' : 'Wednesday',
    isMobile ? 'Thu' : 'Thursday',
    isMobile ? 'Fri' : 'Friday',
    isMobile ? 'Sat' : 'Saturday',
    isMobile ? 'Sun' : 'Sunday'
]

export const shortDaysOfTheWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export const croatianPublicHolidays = [
    '2023-01-01', // Nova godina
    '2023-01-06', // Tri kralja
    '2023-04-16', // Uskrs
    '2023-04-17', // Uskršnji ponedjeljak
    '2023-08-05', // Dan domovinske zahvalnosti
    '2023-08-15', // Velika Gospa
];

// Days with fetched Croatian public holiday dates

export const getDaysInMonthWithHolidays = (monthMoment, holidays) => {
    const monthCopy = monthMoment.clone();
    monthCopy.startOf('month');

    let days = [];
    while (monthCopy.month() === monthMoment.month()) {
        const day = monthCopy.clone();
        const isHoliday = holidays.some(holidayDate => day.isSame(holidayDate, 'day'));

        days.push({ date: day, isHoliday });

        monthCopy.add(1, 'days');
    }

    return days;
}

export const getDaysForWeeksInMonthWithHolidays = (monthMoment, holidays) => {
    const firstDayInMonth = monthMoment.clone().startOf('month');
    const mondayBeforeMonth = firstDayInMonth.clone().startOf('isoWeek');

    const lastDayInMonth = monthMoment.clone().endOf('month');
    const mondayAfterMonth = lastDayInMonth.clone()
        .endOf('isoWeek')
        .add(1, 'days')
        .startOf('day');

    const currentDay = mondayBeforeMonth.clone();
    let days = [];

    while (!currentDay.isSame(mondayAfterMonth, 'date')) {
        const day = currentDay.clone();
        const isHoliday = holidays.some(holiday => day.isSame(holiday, 'day'));
        days.push({ date: day, isHoliday });
        currentDay.add(1, 'days');
    }

    return days;
};
