import React, { useEffect, useState } from "react";
import { SparklesText } from "./magicui/sparkles-text";
import { motion } from "framer-motion";
const startDate = new Date("2025-04-12T00:00:00");

const Countdown = () => {
  const [timeDiff, setTimeDiff] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const timeUnits = [
    { label: "năm", value: timeDiff.years },
    { label: "tháng", value: timeDiff.months },
    { label: "ngày", value: timeDiff.days },
    { label: "giờ", value: timeDiff.hours },
    { label: "phút", value: timeDiff.minutes },
    { label: "giây", value: timeDiff.seconds },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let days = now.getDate() - startDate.getDate();
      let hours = now.getHours() - startDate.getHours();
      let minutes = now.getMinutes() - startDate.getMinutes();
      let seconds = now.getSeconds() - startDate.getSeconds();

      if (seconds < 0) {
        seconds += 60;
        minutes--;
      }
      if (minutes < 0) {
        minutes += 60;
        hours--;
      }
      if (hours < 0) {
        hours += 24;
        days--;
      }
      if (days < 0) {
        const prevMonth = new Date(
          now.getFullYear(),
          now.getMonth(),
          0
        ).getDate();
        days += prevMonth;
        months--;
      }
      if (months < 0) {
        months += 12;
        years--;
      }

      setTimeDiff({ years, months, days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return timeUnits.map(
    (unit, index) =>
      (unit.value > 0 || unit.label === "giây") && (
        <motion.span
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="inline-block text-5xl font-extrabold"
        >
          <SparklesText sparklesCount={2}>
            {unit.value} {unit.label}
          </SparklesText>
        </motion.span>
      )
  );
};

export default Countdown;
