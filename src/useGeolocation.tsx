import { useEffect, useState } from "react";
import ReverseGeocode from "bigdatacloud-reverse-geocoding";
const geocode = new ReverseGeocode();

const getPosition = async (
  options?: PositionOptions
): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  );
};

export const useGeolocation = () => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    locality: undefined as string | undefined,
  });

  const updateLocation = async () => {
    if (navigator.geolocation) {
      const position = await getPosition();
      const locationMeta = await geocode.locate({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        locality: locationMeta.locality,
      });
    }
  };

  useEffect(() => {
    updateLocation();
  }, []);

  return { location, refreshLocation: updateLocation };
};
