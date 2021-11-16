module.exports = {
    name : 'Watson Assistant',
    desc : 'Send message to Watson Assistant and wait for response!',
    execute(msg, args)
    {
      const AssistantV2 = require('ibm-watson/assistant/v2'); //watson assistant
      const { IamAuthenticator } = require('ibm-watson/auth'); //watson Oauth
      
      //autenticacion
      const assistant = new AssistantV2({
        version: '2021-06-14',
        authenticator: new IamAuthenticator({
          apikey: process.env.APIKEY_ASSISTANT,
        }),
        serviceUrl: process.env.SERVICE_URL_ASSISTANT,
      });
      
      //función asincrona para llamar a Watson Assistant

        assistant.messageStateless(
          {
            assistantId: process.env.ID_ASSISTANT,
            input: { 
              message_type: 'text',
              text: msg.content.substring(3)},
          })
          .then(response => {
            console.log("successful call");
            console.log("text0: " + JSON.stringify(response.result.output, null, 2)); //an entire response from the service
            const text = JSON.stringify(response.result.output.generic[0].text, null, 2); //pass the value to the global variable
            return msg.reply(text);
          })
          .catch(err => {
            console.log("unsuccessful call");
            console.log(err);
            return error.stringify;
          });
    
    }
}