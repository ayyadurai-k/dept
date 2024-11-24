import axios from "axios";
import { saveAs } from "file-saver";

export const postAttendanceData = async (dept, year, absent) => {
  return await axios.post(`/staff/attendance/${dept}/${year}`, absent);
};

export const getAttendanceData = async (dept, year, month) => {
  return await axios.get(`/staff/students/details/${dept}/${year}/${month}`);
};

export const fetchHighAttendance = async (dept, year, month) => {
  return await axios.get(
    `/staff/students/attendance/above/75/${dept}/${year}/${month}`
  );
};
export const fetchFullAttendance = async (dept, year, month) => {
  return await axios.get(
    `/staff/students/attendance/full/${dept}/${year}/${month}`
  );
};

export const downloadAttendanceCertificate = async (regno, month) => {
  if (!regno || !month) {
    throw new Error("Regno and month are required.");
  }

  try {
    const response = await axios.get(
      `/staff/student/download-certificate/${regno}/${month}`, // Replace with your actual API endpoint
      {
        responseType: "blob", // Ensures the response is treated as a file
      }
    );

    // Determine file type (adjust if necessary)
    const contentType = response.headers["content-type"];
    const fileExtension = contentType.includes("pdf") ? "pdf" : "png"; // Default to PDF, fallback to PNG

    // Create a file blob and save it
    const fileBlob = new Blob([response.data], { type: contentType });
    saveAs(
      fileBlob,
      `Attendance_Certificate_${regno}_${month}.${fileExtension}`
    );
  } catch (error) {
    console.error("Failed to download the attendance certificate:", error);
    throw error;
  }
};
