import newRelic from "newrelic-react-native-agent";

const useViewModel = () => {

    const onRecordBreadCrumbsClick = () => {
        newRelic.recordBreadcrumb("shoe", {"shoeColor": "blue","shoesize": 9,"shoeLaces": true});
        newRelic.recordBreadcrumb("UserLogin", {"userId": 12345, "username": "john_doe", "loginMethod": "email"});
    }

    const startInteraction = async () => {
        //In this example We are trying to show the badApiLoad
        console.log("Inside start Interactions")
        const interactionId = await newRelic.startInteraction('StartLoadBadApiCall');
        console.log(interactionId);
        const url = 'https://facebook.github.io/react-native/moviessssssssss.json';
        fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            newRelic.endInteraction(interactionId);
          })
          .catch((error) => {
            newRelic.endInteraction(interactionId);
            console.error(error);
          });;
      };

      const stopInteraction = async () => {
        console.log("inside stopInteraction method")
        const interactionId = await newRelic.startInteraction('StartLoadBadApiCall');
        console.log(interactionId);
        const url = 'https://facebook.github.io/react-native/moviessssssssss.json';
        fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            newRelic.endInteraction(interactionId);
          })
          .catch((error) => {
            newRelic.endInteraction(interactionId);
            console.error(error);
          });;
      };

      const recordCustomMetrics =async() =>{
        console.log("Inside record Custom Metrics ")
        newRelic.recordMetric('RNCustomMetricName', 'RNCustomMetricCategory');
        newRelic.recordMetric('RNCustomMetricName', 'RNCustomMetricCategory', 12);
        newRelic.recordMetric('RNCustomMetricName', 'RNCustomMetricCategory', 13, 
        newRelic.MetricUnit.PERCENT, newRelic.MetricUnit.SECONDS);
      }

      const recordCustomErrors = async() =>{
        console.log("inside recordCustom Errors")
        try {
            var foo = {};
            foo.bar();
          } catch(error) {
            newRelic.recordError(error);
          }
      }

      const tractHTTPRequest =()=>{
        console.log("inside Track Http Request")
        newRelic.noticeHttpTransaction('https://github.com', 'GET', 200, Date.now(), Date.now()+1000, 100, 101, "response body");
      }

      const trackFailingHTTPTransactions = async() =>{
        console.log("Track Failing Request")
        newRelic.noticeNetworkFailure('https://github.com', 'GET', Date.now(), Date.now(),
         newRelic.NetworkFailure.BadURL);
      }

      const shutDownAgent = () => {
        console.log("inside shutDownAgent")
        newRelic.shutdown();
      }

      const testCrash =() =>{
        console.log("inside test Crash Method")
        newRelic.crashNow();
        newRelic.crashNow("New Relic example crash message");
      }

      const recordCustomAttribute =() =>{
        console.log("inside recoprdCustomAttribute")
        newRelic.setAttribute('RNCustomAttrNumber', 37);
      }

const recordIncrementSessionAttribute =() =>{
    newRelic.incrementAttribute('RNCustomAttrNumber');
    newRelic.incrementAttribute('RNCustomAttrNumber', 5);
}

const recordCustomEvents = () =>{
    newRelic.recordCustomEvent("mobileClothes", "pants", {"pantsColor": "blue","pantssize": 32,"belt": true});
}

const getSessionId =async()=>{
    let sessionId = await newRelic.currentSessionId();
    console.log("sessionId------>", sessionId)
}

    return {onRecordBreadCrumbsClick, startInteraction, stopInteraction, recordCustomMetrics, recordCustomErrors, tractHTTPRequest, trackFailingHTTPTransactions, shutDownAgent, testCrash, recordCustomAttribute,recordIncrementSessionAttribute, recordCustomEvents, getSessionId};
};

export default useViewModel;
