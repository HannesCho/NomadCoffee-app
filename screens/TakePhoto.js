import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Camera } from "expo-camera";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import { Alert, Image, TouchableOpacity, View } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useIsFocused } from "@react-navigation/native";

const CameraContainer = styled.View`
  flex: 1;
  background-color: black;
`;
const PermissionContainer = styled.TouchableOpacity`
  flex: 1;
  background-color: ${(props) => props.theme.bgColor};
  justify-content: center;
  align-items: center;
`;
const PermissionText = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 30px;
`;

const Actions = styled.View`
  flex: 0.35;
  padding: 0px 50px;
  align-items: center;
  justify-content: space-around;
`;

const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TakeBtnContainer = styled.View`
  width: 60px;
  height: 60px;
  background-color: white;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`;
const TakePhotoBtn = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid black;
  border-radius: 25px;
`;

const SliderContainer = styled.View``;
const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  left: 10px;
`;

const PhotoActions = styled(Actions)`
  flex-direction: row;
`;

const PhotoAction = styled.TouchableOpacity`
  background-color: white;
  padding: 5px 10px;
  border-radius: 4px;
`;
const PhotoActionText = styled.Text`
  font-weight: 600;
`;

export default function TakePhoto({ navigation }) {
  const camera = useRef();
  const [takenPhoto, setTakenPhoto] = useState("");
  const [cameraReady, setCameraReady] = useState(false);
  const [ok, setOk] = useState(false);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [zoom, setZoom] = useState(0);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const getPermissions = async () => {
    const { granted } = await Camera.requestCameraPermissionsAsync();
    setOk(granted);
  };
  useEffect(() => {
    getPermissions();
  }, []);
  const onCameraSwitch = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };
  const onZoomValueChange = (e) => {
    setZoom(e);
  };
  const onFlashChange = () => {
    if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.on);
    } else if (flashMode === Camera.Constants.FlashMode.on) {
      setFlashMode(Camera.Constants.FlashMode.auto);
    } else if (flashMode === Camera.Constants.FlashMode.auto) {
      setFlashMode(Camera.Constants.FlashMode.off);
    }
  };

  const goToUpload = async (save) => {
    if (save) {
      await MediaLibrary.saveToLibraryAsync(takenPhoto);
    }
    navigation.navigate("UploadForm", {
      file: takenPhoto,
    });
  };
  const onUpload = () => {
    Alert.alert("Save Photo?", "Save Photo & Upload or Just Upload", [
      {
        text: "Save & Upload",
        onPress: () => goToUpload(true),
      },
      {
        text: "Just Upload",
        onPress: () => goToUpload(false),
      },
      {
        text: "Cancel",
        style: "destructive",
      },
    ]);
  };

  const onCameraReady = () => setCameraReady(true);

  const takePhoto = async () => {
    if (camera.current && cameraReady) {
      const { uri } = await camera.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
      setTakenPhoto(uri);
    }
  };

  const onDismiss = () => setTakenPhoto("");
  const isFocused = useIsFocused();
  return (
    <CameraContainer>
      {ok === false ? (
        <PermissionContainer onPress={getPermissions}>
          <PermissionText>Ask Permission again</PermissionText>
        </PermissionContainer>
      ) : takenPhoto === "" ? (
        <>
          {isFocused ? (
            <Camera
              type={cameraType}
              style={{ flex: 1 }}
              zoom={zoom}
              flashMode={flashMode}
              ref={camera}
              onCameraReady={onCameraReady}
            >
              <CloseButton onPress={() => navigation.navigate("Tabs")}>
                <Ionicons name="close" color="white" size={40} />
              </CloseButton>
            </Camera>
          ) : (
            <View style={{ flex: 1 }}></View>
          )}
          <Actions>
            <SliderContainer>
              <Slider
                style={{ width: 200, height: 20 }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
                onValueChange={onZoomValueChange}
              />
            </SliderContainer>
            <ButtonsContainer>
              <TouchableOpacity onPress={onFlashChange}>
                <Ionicons
                  name={
                    flashMode === Camera.Constants.FlashMode.off
                      ? "flash-off-outline"
                      : flashMode === Camera.Constants.FlashMode.on
                      ? "flash-outline"
                      : flashMode === Camera.Constants.FlashMode.auto
                      ? "eye-outline"
                      : ""
                  }
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
              <TakeBtnContainer>
                <TakePhotoBtn onPress={takePhoto} />
              </TakeBtnContainer>
              <TouchableOpacity onPress={onCameraSwitch}>
                <Ionicons
                  name="ios-camera-reverse-outline"
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
            </ButtonsContainer>
          </Actions>
        </>
      ) : (
        <>
          <Image source={{ uri: takenPhoto }} style={{ flex: 1 }} />
          <PhotoActions>
            <PhotoAction onPress={onDismiss}>
              <PhotoActionText>Dissmiss</PhotoActionText>
            </PhotoAction>
            <PhotoAction onPress={onUpload}>
              <PhotoActionText>Upload</PhotoActionText>
            </PhotoAction>
          </PhotoActions>
        </>
      )}
    </CameraContainer>
  );
}
