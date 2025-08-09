export default {
    name: "Classic Template",
    fields: [
      {
        name: "location",
        label: "Location",
        type: "text",
        is_static: true,
        is_array: false,
      },
      {
        name: "name",
        label: "Guest Name",
        type: "text",
        is_static: false,
        is_array: false,
      },
      {
        name: "images",
        label: "Images",
        type: "images",
        is_static: false,
        is_array: true,
      },
    ],
  };
  