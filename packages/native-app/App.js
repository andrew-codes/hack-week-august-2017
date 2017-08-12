import PushNotification from 'react-native-push-notification';
import React, {Component} from 'react';
import {AppRegistry, AlertIOS} from 'react-native';
import {connect, Provider} from 'react-redux';
import {builds} from 'v1-status-state-modules';
import AppContainer from './appContainer'
import createStore from './createStore';

import {NavigatorIOS} from 'react-native';

const store = createStore({
    builds: {
        entities: {},
    },
});

PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
        console.log('TOKEN:', token);
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);
        AlertIOS.alert('Notification Received',
            'Build Failed',
            [{
                text: 'Dismiss',
                onPress: null,
            }],
        );
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     */
    requestPermissions: true,
});

class App extends Component {
    render() {

        return (
            <NavigatorIOS
                initialRoute={{
                    component: AppContainer,
                    title: 'Something Awesome',
                    barTintColor: this.props.hasUnacknowledgedFailures ? '#d52101' : '#edeeef',
                }}
                style={{flex: 1}}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        hasUnacknowledgedFailures: builds.selectors.hasUnacknowledgedFailures(state),
    };
}

const ConnectedApp = connect(mapStateToProps)(App);

const Application = () => (
    <Provider store={store}>
        <ConnectedApp />
    </Provider>
);

AppRegistry.registerComponent('ContinuumStatusMobile', () => Application);
