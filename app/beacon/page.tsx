// pages/beacon.tsx

"use client";

import React, { useEffect } from "react";
import useBluetooth from "@/hooks/useBluetooth";
import { Button } from "@/components/ui/button";

const Beacon: React.FC = () => {
  const { isBluetoothSupported, beacons, bluetoothPermissionStatus, scanForBeacons } = useBluetooth();

  useEffect(() => {
    if (beacons.length > 0) {
      console.log('Detected beacons:', beacons);
    }
  }, [beacons]);

  return (
    <main className="p-10">
      <h1 className="text-4xl mb-4 font-bold">Bluetooth Beacon Scanning</h1>

      {!isBluetoothSupported && <p>Your browser does not support Bluetooth.</p>}

      {bluetoothPermissionStatus === 'denied' && (
        <p>
          You have denied Bluetooth permissions. Please enable them in your browser settings.
          <br />
          <a href="chrome://settings/content/bluetooth" target="_blank" rel="noopener noreferrer">
            Click here to enable Bluetooth in Chrome settings
          </a>
        </p>
      )}

      {bluetoothPermissionStatus === 'unknown' && (
        <p>
          Bluetooth permissions status is unknown. Please check if Bluetooth is enabled and grant permissions if prompted.
        </p>
      )}

      {bluetoothPermissionStatus === 'granted' && (
        <Button className="mt-5" onClick={scanForBeacons}>
          Scan for Beacons
        </Button>
      )}

      {beacons.length > 0 && (
        <div className="mt-5">
          <h2 className="text-2xl mb-2">Detected Beacons</h2>
          <ul>
            {beacons.map((beacon, index) => (
              <li key={index} className="mb-2">
                <p><strong>UUID:</strong> {beacon.uuid}</p>
                <p><strong>Major:</strong> {beacon.major}</p>
                <p><strong>Minor:</strong> {beacon.minor}</p>
                <p><strong>Tx Power:</strong> {beacon.txPower}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
};

export default Beacon;
