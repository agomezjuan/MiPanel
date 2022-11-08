//import _ from "lodash";

export default function formatDates(data) {
  return data.map(item => ({
    ...item,
    createdAt: new Date(item.createdAt).toLocaleString(),
    updatedAt: new Date(item.updatedAt).toLocaleString()
  }));
}
