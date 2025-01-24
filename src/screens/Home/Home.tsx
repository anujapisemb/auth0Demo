import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import useViewModel from './Home.viewmodel';
import ReusableButton from 'components/ReusableButton';

const Home = () => {
  const {onRecordBreadCrumbsClick, startInteraction, stopInteraction, recordCustomMetrics, recordCustomErrors, tractHTTPRequest,trackFailingHTTPTransactions, shutDownAgent, testCrash, recordCustomAttribute, recordIncrementSessionAttribute, recordCustomEvents, getSessionId} =  useViewModel();
    return (
        <ScrollView>
            <Text style={{color: 'black', fontWeight: "500", marginHorizontal: 30,fontSize: 16,marginTop: 20,}}>Record BreadCrumbs</Text>
            <ReusableButton
                title="Record Breadcrumbs"
                style={{                    
                backgroundColor: '#58c6fd',
                marginTop: 10,
                marginHorizontal: 30,
                borderRadius: 25,
                
                }}
                textStyle={{ fontSize: 20, fontWeight: '600' }}
                onPress={() => onRecordBreadCrumbsClick()}
            />

            <Text style={{color: 'black', fontWeight: "500", marginHorizontal: 30,fontSize: 16,marginTop: 20,}}>Track a method as an interaction</Text>
            <ReusableButton
                title="Start Interactions"
                style={{                    
                backgroundColor: '#58c6fd',
                marginTop: 10,
                marginHorizontal: 30,
                borderRadius: 25,
                
                }}
                textStyle={{ fontSize: 20, fontWeight: '600' }}
                onPress={() => startInteraction()}
            />
            <ReusableButton
                title="Stop Interactions"
                style={{                    
                backgroundColor: '#58c6fd',
                marginTop: 10,
                marginHorizontal: 30,
                borderRadius: 25,
                
                }}
                textStyle={{ fontSize: 20, fontWeight: '600' }}
                onPress={() => stopInteraction()}
            />

            <Text style={{color: 'black', fontWeight: "500", marginHorizontal: 30,fontSize: 16,marginTop: 20,}}>Record custom metrics</Text>
            <ReusableButton
                title="Record custom Metrics"
                style={{                    
                backgroundColor: '#58c6fd',
                marginTop: 10,
                marginHorizontal: 30,
                borderRadius: 25,
                
                }}
                textStyle={{ fontSize: 20, fontWeight: '600' }}
                onPress={() => recordCustomMetrics()}
            />

            <Text style={{color: 'black', fontWeight: "500", marginHorizontal: 30,fontSize: 16,marginTop: 20,}}>Record custom Errors</Text>
            <ReusableButton
                title="Record custom Errors"
                style={{                    
                backgroundColor: '#58c6fd',
                marginTop: 10,
                marginHorizontal: 30,
                borderRadius: 25,
                
                }}
                textStyle={{ fontSize: 20, fontWeight: '600' }}
                onPress={() => recordCustomErrors()}
            />

            <Text style={{color: 'black', fontWeight: "500", marginHorizontal: 30,fontSize: 16,marginTop: 20,}}>Track custom network requests and failures.</Text>
            <ReusableButton
                title="Track Http Request"
                style={{                    
                backgroundColor: '#58c6fd',
                marginTop: 10,
                marginHorizontal: 30,
                borderRadius: 25,
                
                }}
                textStyle={{ fontSize: 20, fontWeight: '600' }}
                onPress={() => tractHTTPRequest()}
            />
            <ReusableButton
                title="Track Failing Http Transactions"
                style={{                    
                backgroundColor: '#58c6fd',
                marginTop: 10,
                marginHorizontal: 30,
                borderRadius: 25,
                
                }}
                textStyle={{ fontSize: 20, fontWeight: '600' }}
                onPress={() => trackFailingHTTPTransactions()}
            />

            <Text style={{color: 'black', fontWeight: "500", marginHorizontal: 30,fontSize: 16,marginTop: 20,}}>Shutdown The Agent</Text>
            <ReusableButton
                title="Shutdown the Agent"
                style={{                    
                backgroundColor: '#58c6fd',
                marginTop: 10,
                marginHorizontal: 30,
                borderRadius: 25,
                
                }}
                textStyle={{ fontSize: 20, fontWeight: '600' }}
                onPress={() => shutDownAgent()}
            />  
            <Text style={{color: 'black', fontWeight: "500", marginHorizontal: 30,fontSize: 16,marginTop: 20,}}>Test Crash Reporting</Text>
            <ReusableButton
                title="Test Crash Reporting "
                style={{                    
                backgroundColor: '#58c6fd',
                marginTop: 10,
                marginHorizontal: 30,
                borderRadius: 25,
                
                }}
                textStyle={{ fontSize: 20, fontWeight: '600' }}
                onPress={() => testCrash()}
            />  

            <Text style={{color: 'black', fontWeight: "500", marginHorizontal: 30,fontSize: 16,marginTop: 20,}}>Record custom attributes and events.</Text>
            <ReusableButton
                title="Record Custom Attributes"
                style={{                    
                backgroundColor: '#58c6fd',
                marginTop: 10,
                marginHorizontal: 30,
                borderRadius: 25,
                
                }}
                textStyle={{ fontSize: 20, fontWeight: '600' }}
                onPress={() => recordCustomAttribute()}
            />  
            <ReusableButton
                title="Increment Session Count Attribute"
                style={{                    
                backgroundColor: '#58c6fd',
                marginTop: 10,
                marginHorizontal: 30,
                borderRadius: 25,
                
                }}
                textStyle={{ fontSize: 20, fontWeight: '600' }}
                onPress={() => recordIncrementSessionAttribute()}
            />  
            <ReusableButton
                title="Record Custom Event"
                style={{                    
                backgroundColor: '#58c6fd',
                marginTop: 10,
                marginHorizontal: 30,
                borderRadius: 25,
                
                }}
                textStyle={{ fontSize: 20, fontWeight: '600' }}
                onPress={() => recordCustomEvents()}
            /> 
            <ReusableButton
                title="Get Current Session Id"
                style={{                    
                backgroundColor: '#58c6fd',
                marginTop: 10,
                marginHorizontal: 30,
                borderRadius: 25,
                
                }}
                textStyle={{ fontSize: 20, fontWeight: '600' }}
                onPress={() => getSessionId()}
            />
        </ScrollView>
    );
};

export default Home;
