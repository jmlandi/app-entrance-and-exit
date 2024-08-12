# 🪪 In And Out Service for [Carmen Steffens Group](https://www.linkedin.com/company/grupo-carmen-steffens/?originalSubdomain=br)
This project is a website built using HTML, CSS, and Vanilla JS. It's designed to scan QR Codes and transmit the captured data directly to Google Sheets. The primary purpose of this tool is to manage entry and exit movements for a specific event, ensuring the process is both straightforward and tailored to the occasion's needs.

## 📲 Use Case

1. At the event entrance, an attendant will use the website's QR code scanner.

2. Upon scanning, if the QR code is valid, the website will display a feedback message to confirm the scan (to exit the feedback screen, just touch or click anywhere on the screen).

3. After successfully reading the QR code, the website will connect to a Google Sheets endpoint to transmit the scanned information.

4. This information will be logged in the appropriate sheet within the spreadsheet and monitored by the event's organizing team.

Below is a video demonstration detailing the process for those responsible for scanning the QR codes:
##
![WhatsApp Video 2024-02-12 at 12](https://github.com/jmlandi/in-and-out-CS/assets/98327875/01b14069-00b5-4aa1-ad29-3d9a6dd98721)

## ⚙️ Google Sheet Endpoint

Using `Apps Script` extension, this is the code that I used to receive the data from my web app:

```
const DATA_ENTRY_SHEET_NAME = "Entrada e Saída";

let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DATA_ENTRY_SHEET_NAME);

const doPost = (request = {}) => {
  const { postData: { contents, type } = {} } = request;
  let data = parseFormData(contents);
  appendToGoogleSheet(data);
 return ContentService.createTextOutput(contents).setMimeType(ContentService.MimeType.JSON);
};

const parseFormData = (postData) => {
  let data = [];
  let parameters = postData.split('&');
  for (var i = 0; i < parameters.length; i++) {
    let keyValue = parameters[i].split('=');
    data[keyValue[0]] = decodeURIComponent(keyValue[1]);
  }
  return data;
}

const appendToGoogleSheet = (data) => {
  let headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  let rowData = headers.map(headerFld => data[headerFld]);
  sheet.appendRow(rowData);
}```
