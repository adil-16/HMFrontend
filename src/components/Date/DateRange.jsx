import { useEffect, useRef, useState } from "react";
import { FaRegCalendar as CalendarIcon } from "react-icons/fa6";
import { Calendar, DateObject } from "react-multi-date-picker";
import moment from "moment";

const DateRange = ({ rows, setRows }) => {
  const now = moment();
  const firstOfMonth = moment().startOf("month");

  const [value, setValue] = useState([firstOfMonth, now]);

  const [date, setDate] = useState([firstOfMonth, now]);

  const [open, setOpen] = useState(false);
  const calendarRef = useRef(null);

  const handleClose = (e) => {
    if (calendarRef.current && !calendarRef.current.contains(e.target)) {
      setOpen(false);
      setDate(value);
    }
  };

  const filterData = () => {
    const fromDate = moment(date[0].toDate()).startOf("day").toDate();
    const toDate = moment(date[1].toDate()).endOf("day").toDate();
    console.log("Filtering from", fromDate, "to", toDate);
    console.log("Rows:", rows);

    const filteredRows = rows?.filter((row) => {
      const rowDate = new Date(row.date);
      return rowDate >= fromDate && rowDate <= toDate;
    });

    setRows(filteredRows);
    console.log("Filtered rows:", filteredRows);
  };

  //   useEffect(() => {
  //     filterData();
  //   }, [rows]);

  return (
    <>
      <div className="font-Nunito mt-5">
        <p className="font-bold text-darkGray text-16 sm:text-19">
          Date Range:{" "}
        </p>
        <div className="mt-2 flex flex-row items-center gap-2">
          <div className="relative border w-24 font-League_Spartan border-[#8B8B8B] rounded-sm">
            <input
              type="text"
              id="from_date"
              className="block px-2 pb-1 pt-2.5 text-center w-full text-xs text-white bg-transparent rounded-lg border-1 border-primary appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={date[0]?.format("DD/MM/YYYY")}
              readOnly
              autoFocus
            />
            <label
              htmlFor="from_date"
              className="absolute text-sm text-[#fff] bg-secondary duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-[#fff] peer-focus:bg-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-read-only:bg-secondary peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4  start-2"
            >
              From
            </label>
          </div>

          <div className="relative border w-24 font-League_Spartan border-[#8B8B8B] rounded-sm">
            <input
              type="text"
              id="to_date"
              className="block px-2 pb-1 pt-2.5 text-center w-full text-xs text-white bg-transparent rounded-lg border-1 border-primary appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={date[1]?.format("DD/MM/YYYY")}
              readOnly
              autoFocus
            />
            <label
              htmlFor="to_date"
              className="absolute text-sm text-[#fff] bg-secondary duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-[#fff] peer-focus:bg-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-read-only:bg-secondary peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4  start-2"
            >
              To
            </label>
          </div>
          <span
            onClick={() => setOpen(true)}
            className="text-primary text-xl cursor-pointer"
          >
            <CalendarIcon />
          </span>
          <button
            onClick={filterData}
            className="px-2 py-1 bg-orange rounded-md text-white"
          >
            Set Date
          </button>
        </div>

        {open && (
          <div
            onClick={handleClose}
            className="fixed top-0 left-0 z-50 w-full h-full"
          >
            <div className="w-full h-full bg-black bg-opacity-80 flex flex-row items-center justify-center">
              <Calendar
                style={{
                  backgroundColor: "white",
                  color: "#fff",
                  border: "none",
                  boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
                  fontFamily: "League Spartan",
                }}
                showOtherDays
                // maxDate={new Date()}
                range
                value={value}
                onChange={setValue}
                rangeHover
                format="DD/MM/YYYY"
                highlightToday={false}
                className="custom-calendar"
                ref={calendarRef}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DateRange;
