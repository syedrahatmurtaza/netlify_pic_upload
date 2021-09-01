const multipart = require("parse-multipart");

function parseUsingMultipart(event) {
  const bodyBuffer = Buffer.from(event.body);
  var boundary = multipart.getBoundary(event.headers["content-type"]);
  var parts = multipart.Parse(bodyBuffer, boundary);
  return parts;
}
