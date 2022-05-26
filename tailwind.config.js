module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./containers/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    backgroundImage: {
      logo: "url('../public/asset/image/logo.png')",
      upComReady: "url('../public/asset/image/upper_commu_icon_READY.png')",
      upComError: "url('../public/asset/image/upper_commu_icon_ERROR.png')",
      upComNormal: "url('../public/asset/image/upper_commu_icon_NORMAL.png')",
      upComStop: "url('../public/asset/image/upper_commu_icon_STOP.png')",
      upComNone: "url('../public/asset/image/upper_commu_icon_NONE.png')",
      lowComReady: "url('../public/asset/image/lower_commu_icon_READY.png')",
      lowComError: "url('../public/asset/image/lower_commu_icon_ERROR.png')",
      lowComNormal: "url('../public/asset/image/lower_commu_icon_NORMAL.png')",
      lowComStop: "url('../public/asset/image/lower_commu_icon_STOP.png')",
      lowComNone: "url('../public/asset/image/lower_commu_icon_NONE.png')",
      lanIco: "url('../public/asset/image/LAN_default.png')",
      lanConnected: "url('../public/asset/image/LAN_connected.png')",
      lanDisconnected: "url('../public/asset/image/LAN_disconnected.png')",
      lanInactive: "url('../public/asset/image/LAN_inactive.png')",
    },
  },
  plugins: [],
};
