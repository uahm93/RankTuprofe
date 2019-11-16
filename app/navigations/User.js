import React from 'react';
import { Icon } from 'react-native-elements';

import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';

//Pantallas

import TopFiveScreen from '../screens/TopFive';
import SearchScreen from '../screens/Search';

//Pantalla mi cuenta
import MyaccountScreen from '../screens/MyAccount/MyAccount';
import RegisterScreen from '../screens/MyAccount/Register';
import LoginScreen from '../screens/MyAccount/Login';

//Screns nuevo
import HomeScreen from '../screens/Maestros/Home';
import AddNuevoScreen from '../screens/Maestros/Addnuevo';

import DocenteScreen from '../screens/Maestros/Docente';

import AddReviewScreen from '../screens/Maestros/AddReview';

const homeScreenStack = createStackNavigator({
	Home: {
		screen: HomeScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Home'
		})
	},
	AddNuevo: {
		screen: AddNuevoScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Nuevo Docente'
		})
	},
	Docente: {
		screen: DocenteScreen,
		navigationOptions: ({ navigation }) => ({
			title: navigation.state.params.docente.item.docente.name
		})
	},
	AddReview: {
		screen: AddReviewScreen,
		navigationOptions: ({ navigation }) => ({
			title: navigation.state.params.name
		})
	}
});

const TopFiveScreenStack = createStackNavigator({
	TopFive: {
		screen: TopFiveScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Top 5 Profesores'
		})
	}
});

const SearchScreenStack = createStackNavigator({
	Search: {
		screen: SearchScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Buscar'
		})
	}
});

const MyaccountScreenStack = createStackNavigator({
	Myaccount: {
		screen: MyaccountScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Mi cuenta'
		})
	},
	Register: {
		screen: RegisterScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Registro'
		})
	},
	Login: {
		screen: LoginScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Login'
		})
	}
});

const RootStack = createBottomTabNavigator(
	{
		Home: {
			screen: homeScreenStack,
			navigationOptions: ({ navigation }) => ({
				tabBar: 'Agregados Recientemente',
				tabBarIcon: ({ tintColor }) => (
					<Icon name="compass-outline" type="material-community" zize={30} color={tintColor} />
				)
			})
		},
		/*TopFive: {
			screen: TopFiveScreenStack,
			navigationOptions: ({ navigation }) => ({
				tabBarLabel: 'Top 5',
				tabBarIcon: ({ tintColor }) => (
					<Icon name="star-outline" type="material-community" zize={30} color={tintColor} />
				)
			})
		},*/
		Search: {
			screen: SearchScreenStack,
			navigationOptions: ({ navigation }) => ({
				tabBarLabel: 'Buscar Profesor',
				tabBarIcon: ({ tintColor }) => (
					<Icon name="account-search-outline" type="material-community" zize={30} color={tintColor} />
				)
			})
		},
		Myaccount: {
			screen: MyaccountScreenStack,
			navigationOptions: ({ navigation }) => ({
				tabBarLabel: 'Mi cuenta',
				tabBarIcon: ({ tintColor }) => (
					<Icon name="account-circle-outline" type="material-community" zize={30} color={tintColor} />
				)
			})
		}
	},
	{
		initialRouteName: 'Home',
		tabBarOptions: {
			inactiveTintColor: '#412f55',
			activeTintColor: '#BB0000'
		}
	}
);

export default createAppContainer(RootStack);
