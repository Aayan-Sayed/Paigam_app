import AWS from "aws-sdk";

const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: "",
  secretAccessKey: "",
  region: "ap-south-1",
});
const UploadAudio = async (audio: Buffer, userId: string): Promise<string> => {
  const fileName = `profile_${userId}_${Date.now()}.jpg`;

  // Upload to S3
  const params = {
    Bucket: "audio-paighaam",
    Key: fileName,
    Body: audio,
    ContentType: "audio/wav",
    ACL: "public-read",
  };
  const uploadResult = await s3.upload(params).promise();

  return uploadResult.Location;
};

export default UploadAudio;
