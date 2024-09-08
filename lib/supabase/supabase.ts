import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import * as aesjs from "aes-js";
import "react-native-get-random-values";
import { effect } from "zod";

// As Expo's SecureStore does not support values larger than 2048
// bytes, an AES-256 key is generated and stored in SecureStore, while
// it is used to encrypt/decrypt values stored in AsyncStorage.
class LargeSecureStore {
  private async _encrypt(key: string, value: string) {
    const encryptionKey = crypto.getRandomValues(new Uint8Array(256 / 8));

    const cipher = new aesjs.ModeOfOperation.ctr(
      encryptionKey,
      new aesjs.Counter(1)
    );
    const encryptedBytes = cipher.encrypt(aesjs.utils.utf8.toBytes(value));

    await SecureStore.setItemAsync(
      key,
      aesjs.utils.hex.fromBytes(encryptionKey)
    );

    return aesjs.utils.hex.fromBytes(encryptedBytes);
  }

  private async _decrypt(key: string, value: string) {
    const encryptionKeyHex = await SecureStore.getItemAsync(key);
    if (!encryptionKeyHex) {
      return encryptionKeyHex;
    }

    const cipher = new aesjs.ModeOfOperation.ctr(
      aesjs.utils.hex.toBytes(encryptionKeyHex),
      new aesjs.Counter(1)
    );
    const decryptedBytes = cipher.decrypt(aesjs.utils.hex.toBytes(value));

    return aesjs.utils.utf8.fromBytes(decryptedBytes);
  }

  async getItem(key: string) {
    const encrypted = await AsyncStorage.getItem(key);
    if (!encrypted) {
      return encrypted;
    }

    return await this._decrypt(key, encrypted);
  }

  async removeItem(key: string) {
    await AsyncStorage.removeItem(key);
    await SecureStore.deleteItemAsync(key);
  }

  async setItem(key: string, value: string) {
    const encrypted = await this._encrypt(key, value);

    await AsyncStorage.setItem(key, encrypted);
  }
}

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: new LargeSecureStore(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

const signUpWithPassword = async ({
  username,
  email,
  password,
}: UserParams): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.signUp({
    email: email!,
    password: password!,
  });
  if (error) return { error };

  const { error: userError } = await supabase.from("user").insert({
    id: data.user?.id,
    username: username,
    avatar: null,
    email: email,
  });
  if (userError) return { error };

  if (error) return { error };
  return {
    username: username!,
    id: data.user?.id!,
    avatar: null,
    email: email,
  };
};

const signInWithPassword = async ({
  email,
  password,
}: UserParams): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email!,
    password: password!,
  });

  if (error) return { error };

  const { data: userData, error: userError } = await supabase
    .from("user")
    .select("username, avatar")
    .eq("id", data.user?.id)
    .single();

  if (userError) {
    return { error: userError };
  }
  return {
    username: userData.username,
    id: data.user.id,
    avatar: userData.avatar,
    email: email,
  };
};

const addHistory = async ({
  author,
  chapter,
  chapter_id,
  cover,
  current_page,
  pages,
  user_id,
  volume,
  title,
}: HistoryParams) => {
  try {
    const { data } = await supabase
      .from("history")
      .select()
      .eq("user_id", user_id)
      .eq("chapter_id", chapter_id);
    if (data?.length === 0) {
      await supabase.from("history").insert({
        author,
        chapter,
        chapter_id,
        cover,
        current_page,
        pages,
        user_id,
        volume,
        title,
      });
    } else {
      const { error } = await supabase
        .from("history")
        .update({
          author,
          chapter,
          chapter_id,
          cover,
          current_page,
          pages,
          user_id,
          volume,
          title,
        })
        .eq("user_id", user_id)
        .eq("chapter_id", chapter_id);
      console.log(error);
    }
  } catch (error) {
    return error;
  }
};

const addArchive = async ({
  title,
  created_at,
  manga_id,
  user_id,
  cover,
  author,
  rating,
  synopsis,
}: ArchiveParams) => {
  try {
    const { data } = await supabase
      .from("list")
      .select()
      .eq("user_id", user_id)
      .eq("manga_id", manga_id);
    if(data?.length === 0) {
      await supabase.from("list").insert({
        title,
        created_at,
        manga_id,
        user_id,
        cover,
        author,
        rating,
        synopsis,
      });
      return data;
    } else {
      throw new Error("already exists")
    }
  } catch (error) {
    throw error;
  }
};

const getArchive = async (id: string) => {
  const { data, error } = await supabase
   .from("list")
   .select()
   .eq("user_id", id);
  return { error, data };
}

const removeArchive = async (userId: string, mangaId: string) => {
  const { data, error } = await supabase
   .from("list")
   .delete()
   .eq("user_id", userId).eq("manga_id", mangaId);
  return { error, data };
}

const getHistory = async (id: string) => {
  const { error, data } = await supabase
    .from("history")
    .select()
    .eq("user_id", id)
    .order("readed_at");
  return { error, data };
};

const getCurrentUser = async (): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.getUser();

  if (error) return { error };

  const { data: userData, error: userError } = await supabase
    .from("user")
    .select("username, avatar")
    .eq("id", data.user?.id)
    .single();
  if (userError) return { error: userError };

  console.log({
    id: data.user?.id,
    avatar: userData?.avatar,
    email: data.user?.email,
    username: userData?.username,
  });

  return {
    id: data.user?.id,
    avatar: userData?.avatar,
    email: data.user?.email!,
    username: userData?.username,
  };
};

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export {
  signUpWithPassword,
  signInWithPassword,
  getCurrentUser,
  signOut,
  addHistory,
  getHistory,
  addArchive,
  getArchive,
  removeArchive,
};
