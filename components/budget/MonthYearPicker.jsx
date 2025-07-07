"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

const months = [
  { label: "January", value: "January" },
  { label: "February", value: "February" },
  { label: "March", value: "March" },
  { label: "April", value: "April" },
  { label: "May", value: "May" },
  { label: "June", value: "June" },
  { label: "July", value: "July" },
  { label: "August", value: "August" },
  { label: "September", value: "September" },
  { label: "October", value: "October" },
  { label: "November", value: "November" },
  { label: "December", value: "December" },
];

export default function MonthYearPicker({
  years = [],
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
}) {
  return (
    <div className="flex gap-2">
      <Select
        value={selectedMonth}
        onValueChange={(val) => setSelectedMonth(val)}
        required
      >
        <SelectTrigger className="hover:ring-2 hover:ring-gray-200 w-full md:w-32">
          <SelectValue placeholder="Select month" />
        </SelectTrigger>
        <SelectContent>
          {months.map((month) => (
            <SelectItem key={month.value} value={month.value}>
              {month.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={selectedYear}
        onValueChange={(val) => setSelectedYear(val)}
        required
      >
        <SelectTrigger className="hover:ring-2 hover:ring-gray-200 w-full md:w-32">
          <SelectValue placeholder="Select year" />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
