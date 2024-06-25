## RCS Photography

https://www.rcsphotography.art/

A website for showcasing my photography.

Written in React with TypeScript

Features:
- responsive layout for mobile compatibility
- lazy-loading thumbnails for mindful use of resources
- off-screen loading of images for a seamless browsing experience
- loading placeholders for projects indication

Uses the following cloud services:
- IBM Cloudant database for album metadata (because it has an excellent web UI)
- AWS S3 to store the images
- AWS CloudFront to efficiently serve the images in S3
- AWS API Gateway to expose a serverless REST API for interactions with Cloudant
- AWS Secrets Manager to store Cloudant credentials
- AWS Lambda to:
  - generate thumbnails for images added to S3
  - clean up thumbnails when an image is deleted from the master folder
  - implement the REST API exposed by API Gateway
- AWS Amplify for continuous deployment and hosting