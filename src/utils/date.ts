export const getWorkingYears = () => {
    const startDate = new Date("2018-11-01");
    const currentDate = new Date();
    const years = currentDate.getFullYear() - startDate.getFullYear();
    return years;
  };