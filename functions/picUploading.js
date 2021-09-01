const dotEnv = require("dotenv");
require("../parsers/busboyParser");
// Configuring DotEnv
dotEnv.config();

// S3 Bucket Credentials
const bucketName = process.env.S3_BUCKET_NAME;
const s3UserKey = process.env.S3_USER_KEY;
const s3UserSecret = process.env.S3_USER_SECRET;

exports.handler = async (event, context) => {
  console.log(event.body);
  const fields = await parseMultipartForm(event);
  console.log(fields);

  const S3 = new AWS.S3({
    bucketName: bucketName,
    accessKeyId: s3UserKey,
    secretAccessKey: s3UserSecret,
  });

  const params = {
    Bucket: bucketName,
    Key: fields.image.filename,
    Body: fields.image.content,
  };

  const result = await S3.upload(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(result),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
};
