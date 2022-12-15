const util = require('util');
const AWS = require('aws-sdk');
const cloudWatchLogs = new AWS.CloudWatchLogs();

let DESTINATION_ARN = process.env.DESTINATION_ARN;

async function registerLogGroupToLogz(logGroupName) {

    let filterName = 'sample-filterName-1';
    let filterPattern = ''; //everything

	const req = {
		destinationArn: DESTINATION_ARN,
		logGroupName: logGroupName,
		filterName: filterName,
		filterPattern: filterPattern
	};

	console.debug("adding subscription filter...", {
		logGroupName,
		arn: DESTINATION_ARN,
		filterName,
		filterPattern
	});

	await cloudWatchLogs
			.putSubscriptionFilter(req)
			.promise();

	console.info(`subscribed log group to [${DESTINATION_ARN}]`, {
		logGroupName,
		arn: DESTINATION_ARN
	});

}

exports.handler = async (event) => {
    console.log(`New LogGroup identifies, registering: ${util.inspect(event, {depth: 20})}`);
    await registerLogGroupToLogz(event.detail.requestParameters.logGroupName);
    console.log(`${event.detail.requestParameters.logGroupName} registered`);
};
