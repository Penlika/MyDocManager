import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({ region: 'your-region' });

export const handler = async (event) => {
    const fileName = event.pathParameters.fileName;
    const params = {
        Bucket: process.env.mydocumentspit,
        Key: fileName,
    };

    try {
        const response = await s3Client.send(new GetObjectCommand(params));
        const fileContent = await streamToString(response.Body);
        return {
            statusCode: 200,
            body: JSON.stringify({ file: fileContent }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to fetch document', error }),
        };
    }
};

const streamToString = (stream) => {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', chunk => chunks.push(Buffer.from(chunk)));
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('base64')));
        stream.on('error', reject);
    });
};
