import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {Input} from 'react-native-elements';

const GooglePlaceInput = ({notifyChange}) => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Ville, code postale'
      minLength={2}
      autoFocus={true}
      returnKeyType={'search'}
      fetchDetails={true}
      keyboardShouldPersistTaps={'handled'}
      onPress={(data, details = null) => {
        
        notifyChange(details)
      }}
      textInputProps={{
        InputComp: Input,
        leftIcon: { type: 'font-awesome', name: 'search' },
        errorStyle: { color: 'red' },
      }}

      query={{
        key: 'AIzaSyBBS_keoOA8cwsuS3C-qlcFFwtyR1uNcvU',
        language: 'fr',
        components:'country:fr'
      }}
      nearbyPlacesAPI='GooglePlacesSearch'
      debounce={200}

    />
  );
};
export {GooglePlaceInput};