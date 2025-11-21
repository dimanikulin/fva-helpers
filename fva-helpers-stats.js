// If you just want to save JSON from a web app or website, you can make a POST request to a Google Apps Script web app endpoint that writes to a sheet.
// Step 1: Create a Google Sheet
// Go to Google Sheets
// Create a new sheet, e.g. json_store
// Rename the first sheet tab to Data

// Step 2: Create an Apps Script attached to the sheet
// In the sheet, click Extensions → Apps Script
// Paste this code:

function doPost(e) {
  const sheet = SpreadsheetApp.getActive().getSheetByName('data');

  const json = JSON.parse(e.postData.contents);

  sheet.appendRow([new Date(), JSON.stringify(json)]);

  return ContentService
    .createTextOutput(JSON.stringify({status: "ok"}))
    .setMimeType(ContentService.MimeType.JSON);
}
// Step 3: Deploy it as a Web App
// In the Apps Script editor, click Deploy → New deployment
// 
// Choose Web app
// Set:
// Execute as: Me (your account)
// Who has access: Anyone (or Anyone with the link)
// Copy the Web App URL (e.g. https://script.google.com/macros/s/.../exec)

// Step 4: Send your JSON
// Now you can POST your JSON directly from any client:
// 
// fetch('https://script.google.com/macros/s/YOUR_ID/exec', {
  // method: 'POST',
  // body: JSON.stringify({ name: "Alice", age: 30 }),
  // headers: { 'Content-Type': 'application/json' }
// })
//.then(r => r.text())
//.then(console.log);
// This will append your JSON to the sheet with a timestamp.
