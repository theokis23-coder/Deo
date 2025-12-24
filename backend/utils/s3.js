  status VARCHAR(20) DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT now()
);
```


```javascript
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

async function uploadToS3(fileBuffer, fileName, mimetype) {
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: `deo/${Date.now()}-${fileName}`,
    Body: fileBuffer,
    ContentType: mimetype,
    ACL: 'public-read'
  };

  try {
    const result = await s3.upload(params).promise();
    return result.Location;
  } catch (error) {
    throw new Error(`S3 upload failed: ${error.message}`);
  }
}

async function deleteFromS3(fileUrl) {
  const key = fileUrl.split('/').pop();
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: `deo/${key}`
  };

  try {
    await s3.deleteObject(params).promise();
