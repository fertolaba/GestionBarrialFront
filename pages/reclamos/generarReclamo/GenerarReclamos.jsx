import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Alert, Pressable } from 'react-native';
import { StyledButton, StyledText, StyledTextInput } from '../../../components/ui';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../../context/UserContext';
import { useDevice } from '../../../context/DeviceContext';

import { RECLAMOS } from '../../../constants/constants';
import reclamosServices from '../../../services/reclamos.services'
import sitiosServices from '../../../services/sitios.services';

//import { firebaseApp } from '../../../firebase.config';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as VideoThumbnails from 'expo-video-thumbnails';

import theme from '../../../styles/theme';
import { exists, isNullish } from '../../../utils/misc';

const FilePreview = ({ item, index, onPress, ...props }) => {
  return (
    <Pressable {...props} onPress={onPress}>
      {
        item.type.startsWith('image')
          ? <Image source={{ uri: item.uri }} style={styles.previewImage} />
          : item.type.startsWith('video')
            ? <Image source={{ uri: item.thumbnailUri }} style={styles.previewImage} />
            : <View style={styles.previewImage} ><Icon name="file" size={60} /></View>
      }
    </Pressable >
  )
}


const GenerarReclamos = () => {
  const navigation = useNavigation();
  const { user } = useUser();
  const { isUsingWifi, updateNetworkState } = useDevice();

  const [desperfecto, setDesperfecto] = useState('');
  const [descripcionDesperfecto, setDescripcionDesperfecto] = useState('');
  const [rubro, setRubro] = useState(user?.rubro);

  const [mostrarLugares, setMostrarLugares] = useState(false);
  const [sitios, setSitios] = useState([])
  const [sitioSeleccionado, setSitioSeleccionado] = useState({
    idSitio: null,
    descripcion: '',
  });

  const [criterioBusqueda, setCriterioBusqueda] = useState('');
  const sitiosFiltrados = useMemo(() => {
    if (isNullish(criterioBusqueda)) return sitios;

    return sitios.filter(({ idSitio, descripcion }) => {
      const lowerCriterio = criterioBusqueda.toLowerCase();
      return String(idSitio).includes(lowerCriterio) || descripcion?.toLowerCase().includes(lowerCriterio);
    })
  }, [sitios, criterioBusqueda]);

  const handleRubroChange = (text) => {
    if (user?.tipoUsuario === 'inspector') return;
    setRubro(text);
  }

  const handleSelectSitio = (idSitio, descripcion) => {
    setSitioSeleccionado({
      idSitio,
      descripcion: "SITIO SELECCIONADO: " + descripcion
    })

    setMostrarLugares(false);
  }

  const [files, setFiles] = useState([]);

  const MAX_FILES = RECLAMOS.MAXFILES[user?.tipoUsuario] ?? RECLAMOS.MAXFILES.default;

  async function handleGenerarReclamo() {
    if (isNullish(user?.documento)) navigation.navigate('Login'); // random guard

    let continueGenerate = isUsingWifi;

    if (!isUsingWifi) {
      Alert.alert('Atención', 'Estás usando datos móviles, ¿quieres continuar?', [
        { text: 'Continuar', onPress: () => { continueGenerate = true } },
        { text: 'Cancelar', style: 'cancel' },
      ]);
    }

    if (continueGenerate) {
      const nuevoReclamo = {
        descripcion: descripcionDesperfecto,
        iddesperfecto: {
          descripcion: desperfecto
        },
        files,
        documento: user.documento,
        idsitio: sitioSeleccionado.idSitio,
        legajo: user?.legajo || null,
      }

      const { message, reclamo } = await reclamosServices.saveReclamo(nuevoReclamo);

      if (exists(reclamo)) {
        Alert.alert(message.title, message.description, [
          // Aca intente que cuando se le da ok se vaya a la pantalla de detalle del reclamo
          // PERO que al hacer goBack() desde esa ventana no redirija al formulario de creacion de reclamo
          {
            text: 'OK', onPress: () => {
              navigation.reset({
                index: 1,
                routes: [{ name: 'Reclamos' }],
              })

              setTimeout(() => { // wtf, no me salio con el reset, wtf asi solucione
                navigation.navigate('Reclamos', {
                  screen: 'DetalleReclamo',
                  params: { reclamo }
                });
              }, 0);
            }
          },
          { text: 'Volver a reclamos', onPress: () => navigation.navigate('Reclamos') },
        ]);

        return;
      }

      Alert.alert(message.title, message.description);
    }
  }


  const pickImage = async () => {
    if (files.length >= MAX_FILES) {
      Alert.alert('Límite de archivos alcanzado', `No puedes subir más de ${MAX_FILES} archivos.`);
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      let { uri, mimeType: type } = result.assets[0];

      if (type.startsWith('video')) {
        const { uri: thumbnailUri } = await VideoThumbnails.getThumbnailAsync(uri, {
          time: 15000,
        });

        setFiles([...files, { uri, thumbnailUri, type }]);
        return;
      }

      setFiles([...files, { uri, type }]);
    }
  };

  const pickDocument = async () => {
    if (files.length >= MAX_FILES) {
      Alert.alert('Límite de archivos alcanzado', `No puedes subir más de ${MAX_FILES} archivos.`);
      return;
    }

    let result = await DocumentPicker.getDocumentAsync();

    if (!result.canceled) {
      let { uri, mimeType: type } = result.assets[0];

      if (type.startsWith('video')) {
        const { uri: thumbnailUri } = await VideoThumbnails.getThumbnailAsync(uri, {
          time: 15000,
        });

        setFiles([...files, { uri, thumbnailUri, type }]);
        return;
      }

      setFiles([...files, { uri, type }]);
    }
  };


  const removeFile = (index) => {
    Alert.alert('¿Estás seguro?', `¿Quieres eliminar el archivo numero ${index + 1}?`, [
      { text: 'Eliminar', onPress: () => setFiles(files => files.filter((_, i) => i !== index)) },
      { text: 'Cancelar', style: 'cancel' },
    ])
  }

  const removeAllFiles = () => {
    Alert.alert('¿Estás seguro?', '¿Quieres quitar todos los archivos?', [
      { text: 'Quitar todos', onPress: () => setFiles([]) },
      { text: 'Cancelar', style: 'cancel' },
    ])
  }

  // falta logica para subir y bajar archivos/multimedia

  useEffect(() => {
    sitiosServices.getSitios()
      .then(setSitios)
      .catch(console.error)
  }, [])

    
  return (
    <ScrollView>
      <View style={styles.container}>

        <StyledTextInput
          style={styles.input}
          placeholder="Tipo de desperfecto"
          value={desperfecto}
          onChangeText={setDesperfecto}
        />
        <StyledTextInput
          style={styles.input}
          placeholder="Desperfecto"
          value={descripcionDesperfecto}
          onChangeText={setDescripcionDesperfecto}
        />

        <StyledTextInput
          disabled={user?.tipoUsuario === 'inspector'}
          style={styles.input}
          placeholder="Rubro"
          value={rubro}
          onChangeText={handleRubroChange}
        />

        <StyledText
          style={styles.textSitioSeleccionado}
          placeholder="Sitio seleccionado"
          bold={isNullish(sitioSeleccionado.descripcion)}
        >
          {sitioSeleccionado.descripcion || 'Seleccione un lugar'}
        </StyledText>

        <View style={styles.row}>
          <StyledButton variant={'secondary'} style={{ flex: 1 }} title="Abrir camara" onPress={pickImage} />
          <StyledButton variant={'secondary'} style={{ flex: 1 }} title="Adjuntar archivo" onPress={pickDocument} />
        </View>

        <View>
          {
            sitios.length > 0 && (
              <View style={styles.toggleContainer}>
                <StyledButton
                  title={mostrarLugares ? 'Ocultar lugares' : 'Mostrar lugares'}
                  variant='warning'
                  onPress={() => setMostrarLugares(!mostrarLugares)}
                />
              </View>
            )
          }
        </View>

        {
          mostrarLugares && (
            <View>
              <StyledText center>Escribe un nombre o id</StyledText>
              <StyledTextInput style={styles.input} placeholder="Nombre o ID sitio" onChangeText={setCriterioBusqueda} />

              <StyledText center style={styles.label}>Lista de sitios</StyledText>
              <View style={styles.seleccionSitioContainer}>
                {
                  sitiosFiltrados.map(({ idSitio, descripcion }) => (
                    <StyledButton
                      key={`sitio:${idSitio}`}
                      title={`${idSitio}: ${descripcion}`}
                      variant='secondary'
                      onPress={() => handleSelectSitio(idSitio, descripcion)}
                      style={styles.selectSitio}
                    />
                  ))
                }
              </View>
            </View>
          )
        }

        {files.length > 0 &&
          <View>
            <StyledText center>Toca en un archivo adjunto para quitarlo individualmente</StyledText>
            <View style={styles.fileContainer} >
              {
                files.map((item, index) => (
                  <FilePreview
                    key={`filePreview:${index}`}
                    item={item}
                    onPress={() => removeFile(index)}
                  />)
                )
              }
            </View>
          </View>
        }


        <View style={styles.accionesContainer}>
          {
            files.length > 0 && (
              <StyledButton
                title="Quitar todos los adjuntos"
                variant='warning'
                fontSize='subheading'
                onPress={removeAllFiles}
              />
            )
          }

          <StyledButton
            title="Generar reclamo"
            variant='primary'
            fontSize='subheading'
            onPress={handleGenerarReclamo}
          />
          <StyledButton
            title="Volver"
            variant='secondary'
            fontSize='subheading'
            onPress={() => navigation.goBack()}
          />
        </View>
      </View >
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  row: { flexDirection: "row" },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  toggleButtonActive: {
    backgroundColor: '#4F46E5',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  toggleButtonInactive: {
    backgroundColor: '#E5E5E5',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  toggleButtonTextActive: {
    color: '#fff',
  },
  toggleButtonTextInactive: {
    color: '#000',
  },
  input: {
    width: '100%',
  },

  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 10,
  },

  fileContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 10,
  },

  previewImage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 75,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.global.borderRadius * 2,
    margin: 5,
  },

  icon: {
    width: 50,
    height: 50,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  checkboxText: {
    marginLeft: 10,
    flex: 1,
  },

  seleccionSitioContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  selectSitio: {
    width: "100%"
  },

  textSitioSeleccionado: {
    marginTop: 5,
    marginBottom: 15,
    padding: 10,
  },

  label: {
    marginTop: 10,
    marginBottom: 0,
  },

  accionesContainer: {
    marginTop: 20,
  },

});

export default GenerarReclamos;
