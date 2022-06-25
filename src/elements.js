const statsNav = document.getElementById("statsNav");
const main = document.getElementById("main");
const sidebarMenu = document.getElementById("sidebarMenu");
const navElements = sidebarMenu.querySelectorAll("a");
const milestonesNav = sidebarMenu.querySelector(".milestones");
const gallaryNav = document.querySelector(".gallaryNav");
const healthNav = document.querySelector(".health");
const sendMessageBtn = document.querySelector(".SendBtn");
const carousel = document.querySelector(".carousel");
const statsUrl = "https://fastapionly.herokuapp.com/stats";
const loader = document.getElementById("loader");
const span = document.getElementById("close");

// let sendStats;