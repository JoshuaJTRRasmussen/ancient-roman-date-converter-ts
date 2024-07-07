import { useState } from "react";
import Header from "./Header";
import FunFacts from "./FunFacts";

//Don't believe in Modern Months

const modernMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;
type ModernMonths = (typeof modernMonths)[number];

//Get the current date

const today = new Date();
const currentMonth = modernMonths[today.getMonth()];
const currentDate = today.getDate();
const currentYear = today.getFullYear();

//Roman Months and Numerals

type RomanConversionData = {
  monthStem: string;
  monthLength: 28 | 29 | 30 | 31;
  nones: 5 | 7;
  ides: 13 | 15;
  caseEndings: {
    ablative: "is" | "ibus";
    accusative: "as" | "es";
  };
  nextMonth: ModernMonths;
};

const romanCalendarMonths: { [M in ModernMonths]: RomanConversionData } = {
  January: {
    monthStem: "Ianuari",
    monthLength: 31,
    nones: 5,
    ides: 13,
    caseEndings: {
      ablative: "is",
      accusative: "as",
    },
    nextMonth: "February",
  },
  February: {
    monthStem: "Februari",
    monthLength: 28,
    nones: 5,
    ides: 13,
    caseEndings: {
      ablative: "is",
      accusative: "as",
    },
    nextMonth: "March",
  },
  March: {
    monthStem: "Mart",
    monthLength: 31,
    nones: 7,
    ides: 15,
    caseEndings: {
      ablative: "ibus",
      accusative: "es",
    },
    nextMonth: "April",
  },
  April: {
    monthStem: "April",
    monthLength: 30,
    nones: 5,
    ides: 13,
    caseEndings: {
      ablative: "ibus",
      accusative: "es",
    },
    nextMonth: "May",
  },
  May: {
    monthStem: "Mai",
    monthLength: 31,
    nones: 7,
    ides: 15,
    caseEndings: {
      ablative: "is",
      accusative: "as",
    },
    nextMonth: "June",
  },
  June: {
    monthStem: "Iuni",
    monthLength: 30,
    nones: 5,
    ides: 13,
    caseEndings: {
      ablative: "is",
      accusative: "as",
    },
    nextMonth: "July",
  },
  July: {
    monthStem: "Iuli",
    monthLength: 31,
    nones: 7,
    ides: 15,
    caseEndings: {
      ablative: "is",
      accusative: "as",
    },
    nextMonth: "August",
  },
  August: {
    monthStem: "August",
    monthLength: 31,
    nones: 5,
    ides: 13,
    caseEndings: {
      ablative: "is",
      accusative: "as",
    },
    nextMonth: "September",
  },
  September: {
    monthStem: "Septembr",
    monthLength: 30,
    nones: 5,
    ides: 13,
    caseEndings: {
      ablative: "is",
      accusative: "as",
    },
    nextMonth: "October",
  },
  October: {
    monthStem: "Octobr",
    monthLength: 31,
    nones: 7,
    ides: 15,
    caseEndings: {
      ablative: "ibus",
      accusative: "es",
    },
    nextMonth: "November",
  },
  November: {
    monthStem: "Novembr",
    monthLength: 30,
    nones: 5,
    ides: 13,
    caseEndings: {
      ablative: "ibus",
      accusative: "es",
    },
    nextMonth: "December",
  },
  December: {
    monthStem: "Decembr",
    monthLength: 31,
    nones: 5,
    ides: 13,
    caseEndings: {
      ablative: "is",
      accusative: "es",
    },
    nextMonth: "January",
  },
};

const daysOfTheWeek: {
  [key: number]: {
    modernDayName: string;
    romanDayName: string;
  };
} = {
  0: {
    modernDayName: "Sunday",
    romanDayName: "Dies Solis",
  },
  1: {
    modernDayName: "Monday",
    romanDayName: "Dies Lunae",
  },
  2: {
    modernDayName: "Tuesday",
    romanDayName: "Dies Martis",
  },
  3: { modernDayName: "Wednesday", romanDayName: "Dies Mercurii" },
  4: {
    modernDayName: "Thursday",
    romanDayName: "Dies Iovis",
  },
  5: { modernDayName: "Friday", romanDayName: "Dies Veneris" },
  6: { modernDayName: "Saturday", romanDayName: "Dies Saturni" },
};

const romanMatrix = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
] as const;

//Conversion functions

function convertToRoman(num: number): string {
  if (num === 0) {
    return "";
  }
  for (let i = 0; i < romanMatrix.length; i++) {
    if (num >= romanMatrix[i][0]) {
      return romanMatrix[i][1] + convertToRoman(num - romanMatrix[i][0]);
    }
  }
  return "";
}

function convertedMonth(month: ModernMonths, day: number) {
  const currentMonth = romanCalendarMonths[month];
  const postIdes = day > currentMonth.ides;
  const latinDisplayMonth = postIdes
    ? romanCalendarMonths[currentMonth.nextMonth]
    : currentMonth;
  const {
    monthStem,
    nones,
    ides,
    caseEndings: { ablative, accusative },
  } = latinDisplayMonth;
  const ending =
    day == 1 || day == nones || day == ides ? ablative : accusative;
  return {
    latinMonthResult: monthStem + ending,
    postIdes,
  };
}

function convertedDate(month: ModernMonths, day: number) {
  const { nones, ides, monthLength } = romanCalendarMonths[month];

  if (day == 1)
    return {
      latin: "Kalendis",
      english: "the Kalends",
    };
  if (day == nones - 1)
    return {
      latin: "pridie Nonas",
      english: "the day before the Nones",
    };
  if (day == nones)
    return {
      latin: "Nonis",
      english: "the Nones",
    };
  if (day == ides - 1)
    return {
      latin: "pridie Idus",
      english: "the day before the Ides",
    };
  if (day == ides)
    return {
      latin: "Idibus",
      english: "the Ides",
    };
  if (day < nones)
    return {
      latin: `a.d. ${convertToRoman(nones - day + 1)} Nonas`,
      english: `${nones - day + 1} days before the Nones`,
    };
  if (day < ides)
    return {
      latin: `a.d. ${convertToRoman(ides - day + 1)} Idus`,
      english: `${ides - day + 1} days before the Ides`,
    };
  if (day < monthLength)
    return {
      latin: `a.d. ${convertToRoman(monthLength - day + 2)} Kalendas`,
      english: `${monthLength - day + 2} days before the Kalends`,
    };
  return {
    latin: "pridie Kalendas",
    english: "the day before the Kalends",
  };
}

type Era = "C.E." | "B.C.E.";

function convertedYear(year: number, era: Era) {
  let calculatedYear;
  let preRome = false;
  const error = year === 0;

  if (era === "C.E.") {
    calculatedYear = Number(year + 753);
  } else if (era === "B.C.E." && year >= 754) {
    calculatedYear = year - 753;
    preRome = true;
  } else {
    calculatedYear = Math.abs(Number(year) - 754);
  }

  return { calculatedYear, preRome, error };
}

//Fixing February
function checkLeapYear(year: number) {
  // Check if the year is divisible by 4
  if (year % 4 === 0) {
    // If it's divisible by 100, it should also be divisible by 400 to be a leap year
    if (year % 100 === 0) {
      return year % 400 === 0;
    }
    return true;
  }
  return false;
}

//Got the time (message)?

function getTimeMessage(selectedDateString: Date) {
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();
  const todayYear = today.getFullYear();
  const selectedDateStringMonth = selectedDateString.getMonth();
  const selectedDateStringDate = selectedDateString.getDate();
  const selectedDateStringYear = selectedDateString.getFullYear();

  if (
    selectedDateStringYear === todayYear &&
    selectedDateStringMonth === todayMonth &&
    selectedDateStringDate - todayDate === 1
  )
    return {
      latin: "cras erit",
      english: "Tomorrow will be",
    };
  if (
    selectedDateStringYear === todayYear &&
    selectedDateStringMonth === todayMonth &&
    selectedDateStringDate + 1 === todayDate
  )
    return {
      latin: "heri erat",
      english: "Yesterday was",
    };
  if (
    selectedDateStringYear > todayYear ||
    (selectedDateStringYear === todayYear &&
      selectedDateStringMonth > todayMonth) ||
    (selectedDateStringYear === todayYear &&
      selectedDateStringMonth === todayMonth &&
      selectedDateStringDate > todayDate)
  )
    return {
      latin: "ille dies erit",
      english: "That day will be",
    };
  if (
    selectedDateStringYear < todayYear ||
    (selectedDateStringYear === todayYear &&
      selectedDateStringMonth < todayMonth) ||
    (selectedDateStringYear === todayYear &&
      selectedDateStringMonth === todayMonth &&
      selectedDateStringDate < todayDate)
  )
    return {
      latin: "ille dies erat",
      english: "That day was",
    };
  return {
    latin: "hodie est",
    english: "Today is",
  };
}

export default function App() {
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedDate, setselectedDate] = useState(currentDate);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [era, setEra] = useState("C.E." as Era);

  if (checkLeapYear(selectedYear)) {
    romanCalendarMonths["February"].monthLength = 29;
  } else {
    romanCalendarMonths["February"].monthLength = 28;
  }

  const selectedDateString = new Date(
    `${selectedMonth} ${selectedDate}, ${selectedYear}`
  );

  const selectedDateStringDay = selectedDateString.getDay();

  const timeMessage = getTimeMessage(selectedDateString);
  const convertedDateResult = convertedDate(selectedMonth, selectedDate);
  const { calculatedYear, preRome } = convertedYear(selectedYear, era);
  const { latinMonthResult, postIdes } = convertedMonth(
    selectedMonth,
    selectedDate
  );
  const englishDisplayMonth = postIdes
    ? romanCalendarMonths[selectedMonth].nextMonth
    : selectedMonth;

  return (
    <>
      <Header />
      <div>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value as ModernMonths)}
        >
          {modernMonths.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <select
          value={selectedDate}
          onChange={(e) => setselectedDate(Number(e.target.value))}
        >
          {Array.from(
            {
              length: romanCalendarMonths[selectedMonth].monthLength,
            },
            (_, i) => i + 1
          ).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="number"
          min={1}
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        />

        <select value={era} onChange={(e) => setEra(e.target.value as Era)}>
          <option>C.E.</option>
          <option>B.C.E.</option>
        </select>

        <h3>
          {`
        ${timeMessage.latin} ${
            daysOfTheWeek[selectedDateStringDay].romanDayName
          },
        ${convertedDateResult.latin}
        ${latinMonthResult},
        ${preRome ? "anno" : ""} ${convertToRoman(calculatedYear)} ${
            preRome ? "ante Urbem condendam." : "A.U.C."
          }`}
        </h3>
        <p>
          {`
        ${timeMessage.english}
        ${daysOfTheWeek[selectedDateStringDay].modernDayName},
        ${
          convertedDateResult.english
        } of ${englishDisplayMonth}, ${calculatedYear.toLocaleString()} ${
            calculatedYear === 1 ? "year" : "years"
          } ${preRome ? "before" : "since"} the founding of Rome.`}
        </p>
        {selectedMonth === "March" && Number(selectedDate) === 15 && (
          <h1>&quot;Beware the Ides of March!&quot;</h1>
        )}
      </div>
      <FunFacts />
    </>
  );
}
