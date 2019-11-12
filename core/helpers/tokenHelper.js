import jwt from "expo-jwt";
import { AsyncStorage } from "react-native";
const JWT_SECRET = "E4DD99AE701";
const TOKEN_KEY = "token-moni";

export async function storeToken(token) {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    return true;
  } catch {
    return false;
  }
}

export async function deleteToken() {
  await AsyncStorage.removeItem(TOKEN_KEY);
}

export async function getToken() {
  return await AsyncStorage.getItem(TOKEN_KEY);
}

export async function getTokenInfo() {
  const data = jwt.decode(await getToken(), JWT_SECRET);
  return data;
}

export function verifyLoginStatus() {
  return new Promise(async (resolve, reject) => {
    const token = await getToken();
    if (!token) resolve(false);

    try {
      const data = jwt.decode(token, JWT_SECRET);
      console.log(data);
      resolve(data.exp > Number.parseInt(Date.now() / 1000))
    }
    catch (error) {
      reject(new Error("Unable to decode JWT, it seem's to have expired"));
    }
  })
}
