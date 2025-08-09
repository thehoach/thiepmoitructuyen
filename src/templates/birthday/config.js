export default {
  name: "Birthday Invitation",
  staticData: [
    {
      name: "event_title",
      label: "Event Title",
      type: "text",
      size: 1,
    },
    {
      name: "location",
      label: "Location",
      type: "text",
      size: 1,
    },
    {
      name: "date",
      label: "Date",
      type: "text",
      size: 1,
    },
    {
      name: "banner",
      label: "Banner Image URL",
      type: "images",
      size: 1,
    },
  ],
  dynamicData: [
    {
      name: "name",
      label: "Guest Name",
      type: "text",
      size: 1,
    },
    {
      name: "guest_image",
      label: "Guest Image",
      type: "images",
      size: 1,
    },
  ],
};
