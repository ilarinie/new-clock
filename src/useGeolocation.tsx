import { useEffect, useState } from "react";

export const useGeolocation = () => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const updateLocation = () => {
    if (navigator.geolocation) {
      if (!location.latitude && !location.longitude) {
        navigator.geolocation.getCurrentPosition((position) => {
          if (!location.latitude && !location.longitude) {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          }
        });
      }
    }
  };

  useEffect(() => {
    updateLocation();
  }, []);

  return location;
};
