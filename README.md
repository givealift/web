# GiveALift Web application

This is a web client for GiveALift platform.

## How notifications work?
When user subscribes for a notifcation in web application, this subscription is saved in Givealift database. When somethings happens (e.g. someone add a new route which matches user subscription), Givealift API sends request to Firebase Cloud Messaging, which broadcasts this notification to all devices. User can receive notifications even if app is closed! 


![givealift architecture](https://i.imgur.com/72Sdo3t.png)

## Running the app

It couldn't be easier than that! Just navigate to [https://givealift.herokuapp.com](https://givealift.herokuapp.com).

To run locally, you'll have to:
1. Ensure you have latest LTS Node.js installed
2. Clone the repository
3. `npm install` to install everything that's needed
4. `ng serve` to run dev server
5. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

Or, to speed up things a little bit:
1. `npm i -g protractor` to install protractor globally 
2. `webdriver-manager update` to download and/or update browser drivers
3. Run tests with `protractor ./protractor.conf.js`
