import * as ImagePicker from 'expo-image-picker';

export const useImagePicker = () => {
  const pickImage = async (): Promise<string | undefined> => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      return result.assets[0].uri;
    }
  };

  const takePhoto = async (): Promise<string | undefined> => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (permission.granted) {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [2, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        return result.assets[0].uri;
      }
    }
  };

  return { pickImage, takePhoto };
};