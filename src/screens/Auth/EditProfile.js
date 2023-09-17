import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import heading from '../../utillis/fonts'
import Color from '../../utillis/fonts'
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import lightTheme from '../../utillis/theme/lightTheme';
import darkTheme from '../../utillis/theme/darkTheme';
import { backErrow } from '../../assets';
import { useTheme } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { setUser } from '../../redux/reducers/userReducers';
import { store } from '../../redux/store';
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
});

const EditProfile = ({ navigation }) => {
    const { myTheme, user, isGuest } = useSelector(state => state.root.user);
    const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
    const [selectimage, setSelectimage] = useState(user.profilePicture)

    const ImagePicker = () => {
        let options = {
            storageOptions: {
                path: 'image'
            },
        };

        launchImageLibrary(options, response => {
            if (response?.assets && response.assets.length > 0) {
                const selectedImageUri = response.assets[0].uri;
                console.log('Selected Image URI:', selectedImageUri); // Add this line
                setSelectimage(selectedImageUri);
            } else {
                console.error("Image selection canceled or failed.");
            }
        });
    }


    const Intigration = async (values) => {
        try {
            // Create a new FormData object and append the profilePicture
            let data = new FormData();
            data.append('profilePicture', {
                uri: selectimage,
                name: 'profilePicture.jpg', // Set the desired file name
                type: 'image/jpg', // Set the file type
            });

            // Append other fields
            data.append('name', values.name);
            data.append('email', values.email);

            // Define the Axios request configuration
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `https://giant-eel-panama-hat.cyclic.app/moveminia/editProfile/${user._id}`,
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type for form data
                },
                data: data,
            };

            // Send the Axios request
            const response = await axios(config);

            if (response.status === 200) {
                console.log('Profile updated successfully1:', response.data.data);
                store.dispatch(setUser(response.data, data));
                // Handle success here
            } else {
                console.error('Error updating profile2:', response.data);
                // Handle error here
            }
        } catch (error) {
            console.error('Error updating profile3:', error);
        }
    };
    return (
        <SafeAreaView
            style={[styles.V1, { backgroundColor: theme.colors.topbar }]}>
            <View
                style={styles.V2}>
                <View style={{ flexDirection: 'row' }}>

                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            style={[styles.img1, { tintColor: theme.colors.icon }]}
                            resizeMode='contain'
                            source={backErrow}></Image>

                    </TouchableOpacity>
                    <Text
                        style={[heading.h4, { marginLeft: '5%', color: theme.colors.text }]}>EditProfile

                    </Text>

                </View>
            </View>
            <View
                style={styles.V3}>
                <Image
                    style={styles.img3}
                    resizeMode='cover'
                    source={{ uri: selectimage }}>

                </Image>

            </View>
            <View
                style={[styles.V5, { backgroundColor: theme.colors.background }]}>
                <TouchableOpacity onPress={() => ImagePicker()}>
                    <Image
                        style={{ height: 17, width: 17, tintColor: theme.colors.icon }}
                        resizeMode='contain'
                        source={require('../../assets/cam.png')}>

                    </Image>
                </TouchableOpacity>

            </View>

            <View
                style={{ flex: 1, backgroundColor: theme.colors.background, paddingTop: 20 }}>
                <Formik
                    initialValues={{
                        name: user?.name,
                        email: user?.email,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        Intigration(values);
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={[styles.V4, { backgroundColor: theme.colors.background }]}>
                            <View style={[styles.V7, { backgroundColor: theme.colors.tabs, elevation: 5 }]}>
                                <TextInput
                                    style={[heading.h6, { marginLeft: '5%', color: theme.colors.text }]}
                                    placeholderTextColor={'gray'}
                                    placeholder='First Name'
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                />

                            </View>
                            {touched.name && errors.name && (
                                <Text style={styles.error}>{errors.name}</Text>
                            )}

                            <View style={[styles.V7, { backgroundColor: theme.colors.tabs, elevation: 5 }]}>
                                <TextInput
                                    style={[heading.h6, { marginLeft: '5%', color: theme.colors.text }]}
                                    placeholderTextColor={'gray'}
                                    placeholder='Email'
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                />

                            </View>
                            {touched.email && errors.email && (
                                <Text style={styles.error}>{errors.email}</Text>
                            )}
                            <TouchableOpacity onPress={handleSubmit} style={styles.V8}>
                                <Text style={[heading.h5, { fontWeight: '700', color: 'white' }]}>
                                    Save Changes!
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>




            </View>

            {/* <TouchableOpacity onPress={() => Intigration()}
                style={styles.V8}>
                <Text
                    style={[heading.h5, { fontWeight: '700', color: 'white' }]}>Save Changes!</Text>

            </TouchableOpacity> */}





        </SafeAreaView>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    V8: {
        height: 50,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: '#720808',
        marginTop: '10%',
        position: 'absolute',
        bottom: 30,
        justifyContent: 'center',
        alignItems: 'center'

    },
    V7: {
        height: 50,
        width: '90%',
        alignSelf: 'center',
        // backgroundColor: 'red',
        // marginTop: '5%',
        borderRadius: 20,
        justifyContent: 'center'
    },
    V6: {
        height: 45,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: '10%',
        borderRadius: 20,
        justifyContent: 'center'
    },
    V4: {
        height: '100%',
        width: '100%',
        gap: 16
        // backgroundColor: Color.prime,
        // marginTop: '7%'



    },
    V3: {
        height: 106,
        width: 106,
        borderRadius: 90,
        marginTop: '6%', alignSelf: 'center', overflow: 'hidden'

    },
    V1: {
        flex: 1,
        backgroundColor: '#f5e9cd'
    },
    V2: {
        flexDirection: 'row',
        marginTop: '5%',
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'space-between'
    },
    img1: {
        height: 25,
        width: 20,
        alignSelf: 'center'
    },
    img2: {
        height: 25,
        width: 25,
        alignSelf: 'center'
    },
    img3: {
        height: '100%',
        width: '100%',
        overflow: 'hidden'
    },
    V5: {
        height: 35,
        width: 35,
        borderRadius: 90,
        backgroundColor: '#DBF2FB',
        alignSelf: 'center',
        left: '9%',
        bottom: '4%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    error: {
        fontSize: 14, marginLeft: "10%", color: 'red', fontWeight: '400'
    }

})