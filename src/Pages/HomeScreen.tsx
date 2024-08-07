import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image, StyleSheet,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import axios from 'axios';

interface Employment {
  title: string;
  key_skill: string;
}
interface Address {
    city: string;
    state: string;
    country: string;
  }

interface User {
  id: string;
  uid: string;
  password: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  avatar: string;
  gender: string;
  phone_number: string;
  social_insurance_number: string;
  date_of_birth: string;
  employment: Employment;
  address: Address;
}

const HomeScreen = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        'https://random-data-api.com/api/users/random_user?size=80',
      );
      setUsers(response.data);
    //   console.log("Response: " + JSON.stringify(response))
      console.log("Data: " + JSON.stringify(response.data));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentUser = users[currentIndex];

  return loading ? (
    <ActivityIndicator size="large" color="blue" style={styles.loading} />
  ) : (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={{uri: currentUser.avatar}} style={styles.avatar} />
        <View style={styles.infoContainer}>
          <View style={styles.idContainer}>
            <Text style={styles.idLabel}>
              ID: <Text style={styles.idValue}>{currentUser.id}</Text>
            </Text>
          </View>

          <Text style={styles.label}>UID:</Text>
          <View style={styles.smallContainers}>
            <Text style={styles.value}>{currentUser.uid}</Text>
          </View>
          <Text style={styles.label}>Username:</Text>
          <View style={styles.smallContainers}>
            <Text style={styles.value}>{currentUser.username}</Text>
          </View>
          <Text style={styles.label}>Password:</Text>
          <View style={styles.smallContainers}>
            <Text style={styles.value}>{currentUser.password}</Text>
          </View>
          <View style={styles.row}>
            <View style={{width:'40%'}}>
              <Text style={styles.label}>First Name: </Text>
              <View style={styles.smallContainers}>
                <Text style={styles.value}>{currentUser.first_name}</Text>
              </View>
            </View>

            <View style={{width:'40%'}}>
              <Text style={styles.label}>Last Name: </Text>
              <View style={styles.smallContainers}>
                <Text style={styles.value}>{currentUser.last_name}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.label}>Email:</Text>
          <View style={styles.smallContainers}>
            <Text style={styles.value}>{currentUser.email}</Text>
          </View>

          <View style={styles.row}>
          <View style={{width:'40%'}}>
              <Text style={styles.label}>Date of Birth: </Text>
              <View style={styles.smallContainers}>
                <Text style={styles.value}>{currentUser.date_of_birth}</Text>
              </View>
            </View>

            <View style={{width:'40%'}}>
              <Text style={styles.label}>Gender:</Text>
              <View style={styles.smallContainers}>
                <Text style={styles.value}>{currentUser.gender}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.label}>Phone Number: </Text>
          <View style={styles.smallContainers}>
            <Text style={styles.value}>{currentUser.phone_number}</Text>
          </View>

          <Text style={styles.label}>Address: </Text>

          <View style={styles.smallContainers}>
            <Text style={styles.value}>{currentUser.address.city + ", " + currentUser.address.state + ", " + currentUser.address.country}</Text>
          </View>

          <Text style={styles.label}>Social Insurance Number: </Text>
          <View style={styles.smallContainers}>
            <Text style={styles.value}>
              {currentUser.social_insurance_number}
            </Text>
          </View>

          <Text style={styles.label}>Employment Title: </Text>
          <View style={styles.smallContainers}>
            <Text style={styles.value}>{currentUser.employment.title}</Text>
          </View>
          <Text style={styles.label}>Key Skill: </Text>

          <View style={styles.smallContainers}>
            <Text style={styles.value}>{currentUser.employment.key_skill}</Text>
          </View>

          

          
        </View>
        <View style={styles.buttonContainer}>
          {/* <Button
            title="Previous"
            onPress={handlePrevious}
            disabled={currentIndex === 0}
          />
          <Button
            title="Next"
            onPress={handleNext}
            disabled={currentIndex === users.length - 1}
          /> */}

          <TouchableOpacity onPress={handlePrevious} disabled={currentIndex==0} style={[styles.buttons, currentIndex==0?{backgroundColor:'gray'}:{backgroundColor:'#BEFDB6'}]}><Text style={[currentIndex==0?{color:'white'}:{color:'black'}, styles.btnText]}>Previous</Text></TouchableOpacity>
          <TouchableOpacity onPress={handleNext} disabled={currentIndex === users.length - 1} style={[styles.buttons, currentIndex==users.length-1?{backgroundColor:'gray'}:{backgroundColor:'#BEFDB6'}]}><Text style={[currentIndex==users.length - 1?{color:'white'}:{color:'black'}, styles.btnText]}>Next</Text></TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  infoContainer: {
    width: '100%',
    marginTop: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
    color: '#333',
    marginLeft: 2,
    marginTop:-2,
  },
  value: {
    fontWeight: 'normal',
    color: '#666',
    fontSize: 16,
  },
  idContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  idLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  idValue: {
    fontSize: 18,
    color: '#666',
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallContainers: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#D8D8D8',
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 6,
    marginBottom:8,
  },

  buttons:{
    height:40,
    width:100,
    borderRadius:8,
    alignItems:'center',
    justifyContent: 'center',
  },
  btnText:{
    fontWeight:'500',
    fontSize:16,
  }
});

export default HomeScreen;
