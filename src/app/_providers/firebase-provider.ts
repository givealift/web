import * as firebase from 'firebase';
import { environment } from '../../environments/environment';
const config = environment.firebase;
export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
export import Messaging =  firebase.messaging.Messaging;
