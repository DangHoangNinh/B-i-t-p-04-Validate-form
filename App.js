import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validatePhoneNumber = (number) => {
    if (number === '') return '';
    // Kiểm tra số có bắt đầu bằng số 0 hay không
    if (!number.startsWith('0')) return 'Số điện thoại phải bắt đầu bằng số 0.';
    // Kiểm tra chỉ nhập số
    if (!/^[0-9]+$/.test(number)) return 'Chỉ được nhập số.';
    // Kiểm tra độ dài của số điện thoại
    if (number.length < 10) return 'Số điện thoại phải đủ 10 chữ số.';
    if (number.length > 10) return 'Số điện thoại không hợp lệ.';
    return '';
  };

  const handleChange = (text) => {
    setPhoneNumber(text);
    setErrorMessage(validatePhoneNumber(text));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 20}
    >
      {/* Phần tiêu đề */}
      <View style={styles.header}>
        <Text style={styles.title}>Đăng nhập</Text>
      </View>

      {/* Phần nội dung */}
      <View style={styles.content}>
        <Text style={styles.subtitle}>Nhập số điện thoại</Text>
        <Text style={styles.description}>
          Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại của bạn"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={handleChange}
        />
        {/* Container thông báo lỗi có chiều cao cố định để tránh form nhảy */}
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: phoneNumber && !errorMessage ? '#007AFF' : '#E0E0E0' },
          ]}
          disabled={errorMessage !== '' || phoneNumber === ''}
          onPress={() => alert(`Số điện thoại của bạn là: ${phoneNumber}`)}
        >
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorContainer: {
    height: 20, // Duy trì chiều cao cố định để tránh nhảy layout
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  button: {
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
