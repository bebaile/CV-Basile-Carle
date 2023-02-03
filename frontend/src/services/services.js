import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// formate la date hh:mm:ss en hh:mm
export const formatDate = (date) => {
  const tmpDate = date.split("");
  tmpDate.splice(5, 3);
  return tmpDate.join("");
};

export const formatDateDMY = (date) => {
  const tmpDate = new Date(date);
  const formattedDate = `${tmpDate.getDate()}/${
    tmpDate.getMonth() + 1
  }/${tmpDate.getFullYear()}`;
  return formattedDate;
};

export const whichDayString = (date) => {
  const days = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  return days[date];
};

export default api;
