import React from 'react';
import CreateCrewTab from './CreateCrewTab';
import './CreateCrewTabDemo.css';

export default function CreateCrewTabDemo() {
    return (
        <div className="demo-container">
            <div className="demo-header">
                <h1>CreateCrewTab Component Demo</h1>
                <p>This demonstrates the interactive functionality of the CreateCrewTab component</p>
            </div>
            
            <CreateCrewTab />
            
            <div className="demo-footer">
                <h3>Features Demonstrated:</h3>
                <ul>
                    <li>✅ State management with useState hooks</li>
                    <li>✅ Interactive form handling</li>
                    <li>✅ Dynamic filtering system</li>
                    <li>✅ Agent selection and removal</li>
                    <li>✅ Responsive UI with modern styling</li>
                    <li>✅ Form validation and disabled states</li>
                </ul>
            </div>
        </div>
    );
}