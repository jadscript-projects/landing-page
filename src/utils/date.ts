/**
 * Get the number of years of experience
 * @returns The number of years of experience
 */
export const getWorkingYears = () => {
  const startDate = new Date("2018-11-01");
  const currentDate = new Date();
  return currentDate.getFullYear() - startDate.getFullYear();
};
