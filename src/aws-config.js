const awsconfig = {
    Auth: {
      region: 'us-east-1',
      userPoolId: 'us-east-1_PtiIH83de',
      userPoolWebClientId: '1gf4c9f8injfb8a30umvlq1asl',
      mandatorySignIn: true,
    },
    Storage: {
      bucket: 'mydocumentspit',
      region: 'us-east-1',
    },
    API: {
      endpoints: [
        {
          name: 'DocumentsApi',
          endpoint: 'https://revwcdu39i.execute-api.us-east-1.amazonaws.com/dev',
          region: 'us-east-1',
        },
      ],
    },
  };
  
  export default awsconfig;
  