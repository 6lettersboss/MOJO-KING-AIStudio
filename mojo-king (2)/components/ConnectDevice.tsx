import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { WatchIcon } from './icons/WatchIcon';
import { HrvData } from '../types';

interface ConnectDeviceProps {
  onSyncComplete: (data: HrvData) => void;
  onAnalyze: () => void;
  syncedData: HrvData | null;
  error: string | null;
}

const ConnectDevice: React.FC<ConnectDeviceProps> = ({ onSyncComplete, onAnalyze, syncedData, error }) => {
  const [syncState, setSyncState] = useState<'idle' | 'permission' | 'syncing'>('idle');

  const handleSync = () => {
    setSyncState('permission');
    // 1. Simulate asking for permission
    setTimeout(() => {
      setSyncState('syncing');
      // 2. Simulate fetching data from the watch
      setTimeout(() => {
        const sdnn = parseFloat((Math.random() * (90 - 40) + 40).toFixed(1));
        const avgRmssd = parseFloat((Math.random() * (70 - 25) + 25).toFixed(1));
        onSyncComplete({
          sdnn,
          avgRmssd,
          timestamp: new Date().toISOString(),
        });
        setSyncState('idle');
      }, 2000);
    }, 1500);
  };
  
  const renderSyncState = () => {
    switch (syncState) {
      case 'permission':
        return (
          <div className="flex items-center justify-center space-x-3 bg-gray-100 p-4 rounded-lg">
            <span className="text-gray-700 font-medium">Requesting Health permission...</span>
          </div>
        );
      case 'syncing':
        return (
          <div className="flex items-center justify-center space-x-3 bg-gray-100 p-4 rounded-lg">
            <svg className="animate-spin h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-gray-700 font-medium">Syncing latest HRV data...</span>
          </div>
        );
      case 'idle':
      default:
        return (
           <Button onClick={handleSync} fullWidth disabled={!!syncedData}>
              Connect & Sync Data
            </Button>
        );
    }
  };

  return (
    <Card>
      <div className="text-center p-4">
        <div className="flex justify-center items-center mb-6">
          <WatchIcon className="w-16 h-16 text-orange-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Connect Your Wearable</h2>
        <p className="mt-2 text-gray-600">
          Sync your latest HRV (Heart Rate Variability) data for an accurate analysis.
        </p>

        {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded-lg text-sm">
                {error}
            </div>
        )}

        <div className="mt-8 space-y-4">
            {syncedData ? (
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="bg-green-100 border border-green-200 p-4 rounded-lg w-full text-left">
                        <div className="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                               <p className="font-bold text-green-800">HRV (SDNN): {syncedData.sdnn} ms</p>
                               <p className="text-sm text-green-700">Last synced: {new Date(syncedData.timestamp).toLocaleTimeString()}</p>
                            </div>
                        </div>
                    </div>
                    <Button onClick={onAnalyze} fullWidth>
                        Analyze My Mojo
                    </Button>
                    <Button onClick={handleSync} variant="ghost" className="text-sm">
                        Sync Again
                    </Button>
                </div>
            ) : (
                renderSyncState()
            )}
        </div>
      </div>
    </Card>
  );
};

export default ConnectDevice;
