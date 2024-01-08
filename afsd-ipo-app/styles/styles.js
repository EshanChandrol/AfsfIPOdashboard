// styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#3D5AF1',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    marginTop: 16,
    width: '100%',
  },
  buttonTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  footerLink: {
    color: '#3D5AF1',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  footerText: {
    color: '#A9A9A9',
  },
  input: {
    borderColor: '#BDBDBD',
    borderRadius: 8,
    borderWidth: 1,
    height: 48,
    marginTop: 8,
    paddingHorizontal: 16,
    width: '100%',
  },
  label: {
    color: '#3D5AF1',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 20,
    width: 80,
  },
  title: {
    color: '#3D5AF1',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
  },
});
