export const dictionaries = {
  en: {
    dashboard: "Dashboard",
    workshops: "Workshops",
    attendance: "Attendance",
    certificates: "Certificates",
    announcements: "Announcements",
    communities: "Communities",
    profile: "Profile",
    settings: "Settings",
  },
  ta: {
    dashboard: "முகப்பு",
    workshops: "பயிலரங்குகள்",
    attendance: "வருகைப்பதிவு",
    certificates: "சான்றிதழ்கள்",
    announcements: "அறிவிப்புகள்",
    communities: "சமூகங்கள்",
    profile: "சுயவிவரம்",
    settings: "அமைப்புகள்",
  },
} as const;
export type Locale = keyof typeof dictionaries;
