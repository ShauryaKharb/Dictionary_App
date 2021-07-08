import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Header } from 'react-native-elements'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      text: '',
      displayText: 'Loading...',
      isSearchPressed: false,
      category: '',
      definition: '',
      examples: [],
    }
  }

  getWord = (word) => {
    var searchWord = word.toLowerCase()
    var url =
      'https://rupinwhitehatjr.github.io/dictionary/' + searchWord + '.json'
    console.log(url)

    return fetch(url)
      .then((data) => {
        if (data.status === 200) {
          return data.json()
        } else {
          return null
        }
      })

      .then((response) => {
        console.log(response)
        var responseObj = response

        if (responseObj) {
          var wordData = responseObj.definitions[0]

          var definition = wordData.description
          var category = wordData.wordtype

          this.setState({
            displayText: this.state.text,
            definition: definition,
            category: category,
          })
        } else {
          this.setState({
            displayText: this.state.text,
            definition: 'not found',
            category: 'not found',
          })
        }
      })
  }

  render() {
    return (
      <SafeAreaProvider>
        <View style={styles.view}>
          <LinearGradient
            colors={['#5af542', '#42eff5']}
            style={[styles.gradient]}
          >
            <View>
              <Header
                backgroundColor={'red'}
                centerComponent={{
                  text: 'Oxfrod Dictionary',
                  style: {
                    color: '#ffffff',
                    fontSize: 22,
                    fontFamily: 'Candara',
                  },
                }}
              />

              <TextInput
                style={[styles.input]}
                onChangeText={(text) => {
                  this.setState({
                    text: text,
                    displayText: 'Loading...',
                    isSearchPressed: false,
                    category: '',
                    examples: [],
                    definition: '',
                  })
                }}
                value={this.state.text}
              />
            </View>

            <View>
              <LinearGradient
                colors={['#ed9242', '#ed5c42']}
                style={[
                  styles.button,
                  { width: 120 },
                  { height: 50 },
                  { alignSelf: 'center' },
                  { marginTop: 30 },
                  { borderRadius: 10 },
                  { alignSelf: 'center' },
                  { justifyContent: 'center' },
                ]}
              >
                <View>
                  <TouchableOpacity
                    style={[styles.button]}
                    onPress={() => {
                      this.getWord(this.state.text)
                    }}
                  >
                    <Text
                      style={[
                        styles.text,
                        { color: '#fff' },
                        { fontSize: '150%' },
                      ]}
                    >
                      Search
                    </Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
            {this.state.displayText !== 'Loading...' ? (
              <View>
                <View>
                  <Text
                    style={[
                      styles.text,
                      { marginTop: 20 },
                      { textAlign: 'left' },
                      { marginLeft: '5%' },
                    ]}
                  >
                    <Text style={[styles.topics]}>Word : </Text>
                    {this.state.displayText}
                  </Text>
                </View>

                <View>
                  <Text
                    style={[
                      styles.text,
                      { marginTop: 20 },
                      { textAlign: 'left' },
                      { marginLeft: '5%' },
                    ]}
                  >
                    <Text style={[styles.topics]}>Category : </Text>
                    {this.state.category}
                  </Text>
                </View>

                <View>
                  <Text
                    style={[
                      styles.text,
                      { marginTop: 20 },
                      { textAlign: 'left' },
                      { marginLeft: '5%' },
                    ]}
                  >
                    <Text style={[styles.topics]}>Definition : </Text>
                    {this.state.definition}
                  </Text>
                </View>
              </View>
            ) : null}
          </LinearGradient>
        </View>
      </SafeAreaProvider>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gradient: {
    height: 600,
  },
  button: {
    backgroundColor: 'transparent',
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'Berlin Sans FB',
  },
  input: {
    borderWidth: 3,
    borderRadius: 30,

    width: '70%',
    height: '7%',
    marginTop: '12%',

    justifyContent: 'center',
    alignSelf: 'center',

    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Berlin Sans FB',
  },
  topics: {
    textAlign: 'left',
    fontSize: 30,
    fontFamily: 'Calibri',
    color: '#406cff',
    fontWeight: '500',
  },
})
