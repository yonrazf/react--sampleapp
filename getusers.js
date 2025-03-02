import axios from "axios";
import { writeFileSync } from "fs";
import { Parser } from "@json2csv/plainjs";

const API_URL = "https://api.frontegg.com/identity/resources/users/v3";
const BEARER_TOKEN = "[YOUR_VENDOR_TOKEN]";
const TENANT_ID = "[YOUR_TENANT_ID]"; // Optional tenant ID - set as null for no specific tenant

async function getUsers() {
  let users = [];
  let offset = 0;
  const limit = 200;
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
          "frontegg-tenant-id": TENANT_ID,
        },
        params: {
          _limit: limit,
          _offset: offset,
          _sortBy: "createdAt",
          _order: "ASC",
        },
      });

      users = users.concat(response.data.items);

      if (response.data.items.length < limit) {
        hasMore = false;
      } else {
        offset += limit;
      }
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.response?.data || error.message
      );
      break;
    }
  }

  console.log(`Total users fetched: ${users.length}`);
  return users;
}

function exportToCSV(users) {
  if (users.length === 0) {
    console.log("No users to export.");
    return;
  }
  try {
    const parser = new Parser();
    const csv = parser.parse(users);
    writeFileSync("users.csv", csv);
    console.log("Users exported to users.csv");
  } catch (error) {
    console.error("Error exporting users to CSV:", error);
  }
}

getUsers()
  .then((users) => {
    exportToCSV(users);
  })
  .catch((error) => {
    console.error("Failed to fetch users:", error);
  });
