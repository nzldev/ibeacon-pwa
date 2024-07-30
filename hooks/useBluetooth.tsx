// hooks/useBluetooth.ts

import { useState, useEffect } from 'react';

// Define the structure for beacon data
interface Beacon {
  uuid: string;
  major: number;
  minor: number;
  txPower: number;
}

const useBluetooth = () => {
  const [beacons, setBeacons] = useState<Beacon[]>([]);
  const [isBluetoothSupported, setIsBluetoothSupported] = useState(true);
  const [bluetoothPermissionStatus, setBluetoothPermissionStatus] = useState<'granted' | 'denied' | 'unknown'>('unknown');

  useEffect(() => {
    // Check if Bluetooth is supported
    if (!navigator.bluetooth) {
      setIsBluetoothSupported(false);
      return;
    }

    // Attempt to request Bluetooth access
    navigator.bluetooth.requestDevice({
      filters: [{ services: ['battery_service'] }] // Example filter, adjust based on your needs
    })
    .then(device => {
      // Device successfully requested
      setBluetoothPermissionStatus('granted');
    })
    .catch(error => {
      // Error or user denied access
      setBluetoothPermissionStatus('denied');
      console.error('Bluetooth permission error:', error);
    });
  }, []);

  const scanForBeacons = async () => {
    if (!isBluetoothSupported) return;

    try {
      // Request a Bluetooth device
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['battery_service'] // Example service, adjust based on your needs
      });

      // Connect to the device and retrieve services
      const server = await device.gatt?.connect();
      const services = await server?.getPrimaryServices();
      if (services) {
        for (const service of services) {
          // Retrieve characteristics and handle data (this is an example, adjust based on your needs)
          const characteristics = await service.getCharacteristics();
          for (const characteristic of characteristics) {
            const value = await characteristic.readValue();
            // Process beacon data from the characteristic's value
            // This is highly dependent on the beacon's data format and your specific use case
          }
        }
      }

    } catch (error) {
      console.error('Failed to scan for beacons', error);
    }
  };

  return {
    isBluetoothSupported,
    beacons,
    bluetoothPermissionStatus,
    scanForBeacons,
  };
};

export default useBluetooth;
