var config_deploy = {

    // obligatory fields

    // the experimentID is needed to recover data from the _babe server app
    // you receive the experimentID when you create the experiment using the _babe server app

    "experimentID": "",

    // set deployment method; use one of:
    //'debug', 'localServer', 'MTurk', 
    // 'MTurkSandbox', 'Prolific', 'directLink'
    "deployMethod" : "debug", 

    // optional fields
    // set the prolific code if the deploy method is "Prolific"
    "prolificCode": "ABCDE1234",

    // who to contact in case of trouble
    "contact_email": "exprag@gmail.com", 
};