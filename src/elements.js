/* eslint-disable no-unused-vars */
const statsNav = document.getElementById("statsNav");
const main = document.getElementById("main");
const sidebarMenu = document.getElementById("navbarMenu");
const navElements = sidebarMenu.querySelectorAll("a");
const milestonesNav = sidebarMenu.querySelector(".milestones");
const galleryNav = document.querySelector(".galleryNav");
const healthNav = document.querySelector(".health");
const sendMessageBtn = document.querySelector(".SendBtn");
const carousel = document.querySelector(".carousel");
// Live
// const BASE_URL = "https://fastapionly.herokuapp.com"; // Live url

// Staging
// const BASE_URL = "https://fastapi-docker-mathias.herokuapp.com"; // Local url

// Local
const BASE_URL = "http://127.0.0.1:3000"; // Local serve

// const BASE_URL = "http://127.0.0.1:8000"; // Local url
const statsUrl = `${BASE_URL}/stats`; // Local url

const loader = document.getElementById("loader");
const span = document.getElementById("close");
const news = document.querySelector(".news");
const healthPage = `<div class="container-fluid w-50" ><h1>Health</h1></div>`;
const date = document.querySelector(".date");
const time = document.querySelector(".time");

// let sendStats;
